import {MapPin, Phone, Mail, ArrowUpRight} from "lucide-react";
import ContactFormButton from "./contact-form-button";

export default function CallToAction() {
  const address = "Bulo, Victoria, Tarlac";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  const phoneDisplay = "+63 926 787 6389";
  const phoneHref = "tel:+639267876389";

  const email = "earlbalitcha@gmail.com";
  const emailHref = `mailto:${email}`;

  const channels = [
    {
      label: "Address",
      href: mapsHref,
      external: true,
      value: address,
      icon: MapPin,
    },
    {
      label: "Phone",
      href: phoneHref,
      external: false,
      value: phoneDisplay,
      icon: Phone,
    },
    {
      label: "Email",
      href: emailHref,
      external: false,
      value: email,
      icon: Mail,
    },
  ] as const;

  return (
    <section id="contact" className="my-24 scroll-mt-24">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary/22 via-violet-500/14 to-fuchsia-500/18 p-[1px] shadow-xl shadow-primary/10 dark:shadow-primary/5">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] border border-border/50 bg-background/92 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[hsl(220_10%_10%/0.92)]">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/12 blur-3xl dark:bg-primary/18" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-500/8 blur-3xl" />

          <div className="relative grid gap-10 p-8 md:gap-12 md:p-10 lg:grid-cols-12 lg:items-start lg:p-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">Let&apos;s talk</p>
              <h2 className="mt-3 max-w-md text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
                <span className="text-foreground">Contact </span>
                <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  information
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Based in the Philippines. Open to full-stack web roles and contract work—primarily{" "}
                <span className="font-medium text-foreground">React, Next.js, Node.js, TypeScript,</span> APIs, and
                dashboards—with <span className="font-medium text-foreground">Shopify</span> and ecommerce builds when
                that is part of the roadmap.
              </p>
              <div className="mt-8 h-px max-w-xs bg-gradient-to-r from-primary via-violet-400 to-transparent opacity-70" />
              <div className="mt-8">
                <ContactFormButton />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-7">
              {channels.map(({label, href, external, value, icon: Icon}) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/20 p-4 transition-all hover:border-primary/35 hover:shadow-md hover:shadow-primary/5 dark:to-muted/12 md:p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-foreground group-hover:text-primary md:text-base">
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
