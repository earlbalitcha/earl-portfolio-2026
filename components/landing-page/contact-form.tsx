"use client";

import {useState, type FormEvent} from "react";
import {toast} from "sonner";
import {ArrowRight} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

const fieldClass =
  "h-11 rounded-md border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary";

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({className}: ContactFormProps) {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    setSubmitting(true);
    try {
      // Honeypot — silently succeed for bots
      if (company.trim()) {
        resetForm();
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || undefined,
          message: trimmedMessage,
          company,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        toast.success("Message sent", {
          description:
            "Thanks — I received your note and will reply as soon as I can.",
        });
        resetForm();
        return;
      }

      toast.error("Unable to send", {
        description:
          data.error ||
          "Something went wrong. Try again or email me directly.",
      });
    } catch {
      toast.error("Unable to send", {
        description: "Network error. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-muted-foreground">
            Your name
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-muted-foreground">
            Email address
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className="text-muted-foreground">
          Subject
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Role, project, or question"
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-muted-foreground">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about the work or opportunity…"
          className="min-h-[140px] resize-y rounded-md border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:opacity-60 sm:w-auto">
        {submitting ? "Sending…" : "Send message"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted-foreground sm:text-left">
        I read every message and usually reply within a day or two.
      </p>
    </form>
  );
}
