"use client";

import {useState} from "react";
import type React from "react";
import {toast} from "sonner";
import {cn} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

/** Bundled at build time; use this in .env.local for the simplest setup. */
const WEB3_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

interface ContactFormButtonProps {
  className?: string;
  children?: React.ReactNode;
}

async function postWeb3Forms(accessKey: string, body: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({access_key: accessKey, ...body}),
  });
  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };
  return {ok: res.ok && Boolean(data.success), detail: data.message};
}

export default function ContactFormButton({
  className = "",
  children,
}: ContactFormButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCompany("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    const subjectLine = trimmedSubject.length
      ? `[Portfolio] ${trimmedSubject}`
      : "[Portfolio] Inquiry from your site";
    const textBody = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ].join("\n");

    setSubmitting(true);
    try {
      if (company.trim()) {
        resetForm();
        setOpen(false);
        return;
      }

      // Prefer browser -> Web3Forms when NEXT_PUBLIC key is set (no empty `KEY=` in .env.local).
      if (WEB3_PUBLIC_KEY) {
        const w = await postWeb3Forms(WEB3_PUBLIC_KEY, {
          subject: subjectLine,
          name: trimmedName,
          email: trimmedEmail,
          replyto: trimmedEmail,
          message: textBody,
        });
        if (w.ok) {
          toast.success("Message sent", {
            description:
              "Thank you. I have received your message and will get back to you as soon as I can.",
          });
          resetForm();
          setOpen(false);
          return;
        }
        toast.error("Unable to send", {
          description:
            w.detail ||
            "Check that NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local is correct, then restart npm run dev.",
        });
        return;
      }

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject || undefined,
        message: trimmedMessage,
        company,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        toast.success("Message sent", {
          description:
            "Thank you. I have received your message and will get back to you as soon as I can.",
        });
        resetForm();
        setOpen(false);
        return;
      }

      const err =
        data.error ||
        (res.status === 503
          ? "Paste your Web3Forms access key in .env.local. Use NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key (no quotes, no spaces around =). The line must not be empty. Save the file and restart npm run dev."
          : "Something went wrong. Please try again or use the email link in the contact section.");
      toast.error("Unable to send", {description: err});
    } catch {
      toast.error("Unable to send", {
        description:
          "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={cn(className || "btn-primary")}>
          {children || "Contact Me"}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto rounded-2xl border-border/80 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
          <DialogDescription>
            Use this form for employment inquiries, project discussions, or
            other professional correspondence.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-2">
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            aria-hidden>
            <Label htmlFor="contact-company">Company</Label>
            <Input
              id="contact-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Full name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">Email address</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-subject">Subject</Label>
            <Input
              id="contact-subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder=""
            />
            <p className="text-xs text-muted-foreground">
              Optional. Brief summary of your reason for contacting.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="min-h-[120px] resize-y"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
