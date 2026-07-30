import Link from "next/link";
import {MapPin, Phone, Mail, ArrowUpRight} from "lucide-react";

export default function CallToAction() {
  const address = "Bulo, Victoria, Tarlac";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
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
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative grid gap-10 p-8 md:gap-12 md:p-10 lg:grid-cols-12 lg:items-start lg:p-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Let&apos;s talk
            </p>
            <h2 className="font-display mt-3 max-w-md text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-4xl">
              <span className="text-foreground">Ready to </span>
              <span className="gradient-text">connect</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Based in the Philippines. Open to full-stack web roles and
              contract work—React, Next.js, Vue.js, Node.js, TypeScript, APIs,
              and dashboards—plus Shopify, WordPress, and Squarespace when CMS
              or ecommerce is in scope.
            </p>
            <div className="gradient-rule mt-8 opacity-70" />
            <div className="mt-8">
              <Link href="/contact" className="btn-primary">
                Go to contact page
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-7">
            {channels.map(({label, href, external, value, icon: Icon}) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? {target: "_blank", rel: "noopener noreferrer"}
                  : {})}
                className="group flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:border-primary/35 hover:bg-primary/10 md:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
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
    </section>
  );
}
