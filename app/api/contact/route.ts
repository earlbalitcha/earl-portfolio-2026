import {NextResponse} from "next/server";
import {z} from "zod";
import {
  buildContactHtml,
  buildContactSubject,
  buildContactText,
} from "@/lib/contact-email";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Message is required.").max(8000),
  /** Honeypot: hidden field; bots often fill this. */
  company: z.string().optional(),
});

const DEFAULT_TO = "earlbalitcha@gmail.com";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({error: "Invalid request body."}, {status: 400});
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.name?.[0] ||
      first.email?.[0] ||
      first.message?.[0] ||
      "Please check the form and try again.";
    return NextResponse.json({error: msg}, {status: 400});
  }

  const {name, email, subject, message, company} = parsed.data;
  if (company?.trim()) {
    return NextResponse.json({ok: true});
  }

  const payload = {name, email, subject, message};
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const subjectLine = buildContactSubject(payload);
  const textBody = buildContactText(payload);
  const htmlBody = buildContactHtml(payload);

  // Prefer Resend for fully branded HTML emails
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Earl Balitcha <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: subjectLine,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend error:", res.status, errText);
      return NextResponse.json(
        {error: "The message could not be sent. Please try again later."},
        {status: 502},
      );
    }
    return NextResponse.json({ok: true});
  }

  // Web3Forms fallback — cleaner payload (no duplicate name/email in message)
  const web3Key =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (web3Key) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        access_key: web3Key,
        from_name: "Earl Balitcha",
        subject: subjectLine,
        email,
        replyto: email,
        // Labeled fields only — avoid stuffing name/email into message again
        name,
        ...(subject?.trim() ? {Topic: subject.trim()} : {}),
        message: message.trim(),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };
    if (!res.ok || !data.success) {
      console.error("Web3Forms error:", data.message || res.status);
      return NextResponse.json(
        {error: "The message could not be sent. Please try again later."},
        {status: 502},
      );
    }
    return NextResponse.json({ok: true});
  }

  return NextResponse.json(
    {
      error:
        "Contact email is not configured. Add WEB3FORMS_ACCESS_KEY (or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) to .env.local, or set RESEND_API_KEY for branded HTML emails. Then restart the dev server. For production, add the same variables in Vercel.",
    },
    {status: 503},
  );
}
