export interface PortfolioItem {
  slug: string;
  title: string;
  logo: string;
  mainImage: string;
  shortDescription: string;
  projectUrl: string;
  content: string;
  sortOrder: string;
  categories?: string[];
}

const CACHE_KEY = "__portfolioCacheV8";
const USE_FALLBACK_ONLY = false;

export function resetPortfolioCache() {
  if (typeof window !== "undefined") {
    delete (window as any).__portfolioCache;
    delete (window as any).__portfolioCacheV2;
    delete (window as any).__portfolioCacheV3;
    delete (window as any).__portfolioCacheV5;
    delete (window as any).__portfolioCacheV6;
    delete (window as any).__portfolioCacheV7;
    delete (window as any).__portfolioCacheV8;
  }
}

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  if (USE_FALLBACK_ONLY) {
    const fallback = getFallbackPortfolioData();
    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
    return fallback;
  }

  if (typeof window !== "undefined" && (window as any)[CACHE_KEY]) {
    return (window as any)[CACHE_KEY];
  }

  try {
    const response = await fetch("/data/portfolio-sample.csv", {
      cache: typeof window === "undefined" ? "no-store" : "default",
    });

    if (!response.ok)
      throw new Error(`Failed to fetch portfolio CSV: ${response.status}`);

    const csvText = await response.text();
    const parsedData = parseCSV(csvText);

    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      const fallback = getFallbackPortfolioData();
      if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
      return fallback;
    }

    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = parsedData;
    return parsedData;
  } catch (err) {
    console.error("Error fetching portfolio data:", err);
    const fallback = getFallbackPortfolioData();
    if (typeof window !== "undefined") (window as any)[CACHE_KEY] = fallback;
    return fallback;
  }
}

// ---------------- Fallback content (matches portfolio-sample.csv) ----------------
function getFallbackPortfolioData(): PortfolioItem[] {
  return [
    {
      slug: "the-hostdesk",
      title: "The HostDesk, Multilingual Platform",
      logo: "/projects/the-hostdesk.png?height=400&width=600",
      mainImage: "/projects/the-hostdesk.png?height=400&width=600",
      shortDescription:
        "Main frontend platform (Next.js, multilingual, AI tools, integrations).",
      projectUrl: "https://thehostdesk.com/en",
      content:
        "<h3>Overview</h3><p>The HostDesk is a multilingual platform built with Next.js, combining AI tooling and third-party integrations for hospitality and operations teams.</p>",
      sortOrder: "2025-12-01",
      categories: ["Next.js", "Multilingual", "AI", "Integrations", "web"],
    },
    {
      slug: "csr-dashboard",
      title: "CSR Dashboard, Enterprise System",
      logo: "/projects/portal-dashboard.png?height=400&width=600",
      mainImage: "/projects/portal-dashboard.png?height=400&width=600",
      shortDescription:
        "Enterprise system with ticketing, chat, and real-time workflows.",
      projectUrl: "https://portal.thehostdesk.com/signin",
      content:
        "<h3>Overview</h3><p>CSR-facing enterprise dashboard with ticketing, internal chat, and real-time workflows for support and operations.</p>",
      sortOrder: "2025-11-15",
      categories: ["Enterprise", "Real-time", "Dashboard", "web"],
    },
    {
      slug: "xmg-real-estate",
      title: "XMG Real Estate, xmgca.com",
      logo: "/projects/xmgcawebsite.png?height=400&width=600",
      mainImage: "/projects/xmgcawebsite.png?height=400&width=600",
      shortDescription:
        "Business website for real estate services and lead generation.",
      projectUrl: "https://xmgca.com/en",
      content:
        "<h3>Overview</h3><p>XMG provides real estate management, financing, and rental services—multilingual corporate site with mission-driven content and a modern presence.</p>",
      sortOrder: "2025-11-01",
      categories: [
        "Real Estate",
        "Next.js",
        "Internationalization",
        "Corporate",
        "Marketing",
        "web",
      ],
    },
    {
      slug: "travelhere",
      title: "TravelHere, travelhere.co",
      logo: "/projects/travelhere.png?height=400&width=600",
      mainImage: "/projects/travelhere.png?height=400&width=600",
      shortDescription:
        "Marketing and product platform (React SPA, animations, CI/CD).",
      projectUrl: "https://travelhere.co/",
      content:
        "<h3>Overview</h3><p>TravelHere is a React SPA with rich animations and a CI/CD-backed release workflow for marketing and product storytelling.</p>",
      sortOrder: "2025-10-20",
      categories: ["React", "SPA", "Animations", "DevOps", "web"],
    },
    {
      slug: "shopify-integration",
      title: "Shopify Integration",
      logo: "/projects/shopifyorder.png?height=400&width=600",
      mainImage: "/projects/shopifyorder.png?height=400&width=600",
      shortDescription:
        "Integrated Shopify e-commerce data into a centralized dashboard.",
      projectUrl: "https://portal.superhostdepot.com/signin",
      content:
        "<h3>Overview</h3><p>A one-stop dashboard for managing Shopify orders and store data. A storefront integration directly connected to the admin dashboard.</p>",
      sortOrder: "2024-02-20",
      categories: ["Shopify", "Liquid", "JavaScript", "E-commerce Dashboard", "web"],
    },
    {
      slug: "hubspot-integration",
      title: "HubSpot Integration",
      logo: "/projects/hubspot-integration.png?height=400&width=600",
      mainImage: "/projects/hubspot-integration.png?height=400&width=600",
      shortDescription:
        "CRM contact form integration to capture leads directly into HubSpot.",
      projectUrl: "https://superhostdepot.com/en/contact-us",
      content:
        "<h3>Overview</h3><p>Custom HubSpot integration where user form submissions sync directly to HubSpot CRM. Enables lead capture and workflow efficiency.</p>",
      sortOrder: "2024-02-10",
      categories: ["HubSpot", "API Integration", "CRM", "Automation", "web"],
    },
    {
      slug: "clickup-integration",
      title: "ClickUp Task Integration",
      logo: "/projects/clickuptabform.png?height=400&width=600",
      mainImage: "/projects/clickuptabform.png?height=400&width=600",
      shortDescription:
        "Seamless ClickUp integration for centralized task and project tracking.",
      projectUrl: "https://portal.superhostdepot.com/signin",
      content:
        "<h3>Overview</h3><p>Integrated ClickUp task management directly into the dashboard. Features include syncing task data, project status updates, and productivity workflows to provide a single hub for property and project management.</p>",
      sortOrder: "2024-01-20",
      categories: [
        "ClickUp",
        "API Integration",
        "Project Management",
        "Productivity",
        "web",
      ],
    },
  ];
}

// ---------------- CSV parser ----------------
function parseCSV(csvText: string): PortfolioItem[] {
  if (!csvText || !csvText.trim()) return [];

  const lines = csvText.split("\n");
  if (lines.length === 0) return [];

  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/^"/, "").replace(/"$/, ""));

  const columnMap: Record<
    string,
    Exclude<keyof PortfolioItem, "categories">
  > = {
    Slug: "slug",
    Title: "title",
    Logo: "logo",
    "Main Image": "mainImage",
    "Short Description": "shortDescription",
    "Project URL": "projectUrl",
    Content: "content",
    "Sort Order": "sortOrder",
  };

  const catHeaderIndex = headers.indexOf("Categories");
  const items: PortfolioItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) continue;

    const values: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') insideQuotes = !insideQuotes;
      else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));
        currentValue = "";
      } else currentValue += char;
    }
    values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""));

    const item: Partial<PortfolioItem> = {};
    headers.forEach((header, idx) => {
      const key = columnMap[header];
      if (key && idx < values.length) {
        (item as any)[key] = values[idx];
      }
    });

    if (catHeaderIndex !== -1 && values[catHeaderIndex]) {
      const raw = values[catHeaderIndex]
        .trim()
        .replace(/^"/, "")
        .replace(/"$/, "");
      (item as PortfolioItem).categories = raw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    items.push(item as PortfolioItem);
  }

  return items.sort(
    (a, b) => new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime()
  );
}
