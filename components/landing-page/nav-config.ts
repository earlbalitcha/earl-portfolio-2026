/** Shared between desktop header and mobile drawer so links stay in sync. */
export const landingScrollNavItems = [
  {href: "/#about", label: "About"},
  {href: "/#shopify", label: "Shopify"},
  {href: "/#experience", label: "Experience"},
  {href: "/#projects", label: "Work"},
  {href: "/#skills", label: "Skills"},
  {href: "/#contact", label: "Contact"},
] as const;

export const landingProjectsNav = {href: "/projects", label: "Projects"} as const;
