const siteUrl = "https://technestsolutions.in"

// Canonical social URLs — used in sameAs everywhere. Only list profiles that
// actually resolve; a dead sameAs link hurts entity trust more than omitting it.
const SOCIAL = [
  "https://github.com/technestdev",
  "https://linkedin.com/company/technestdev",
]

// Person schema for Shaan — author E-E-A-T signal for blog posts and AI search
export const shaanPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#shaan`,
  name: "Shaan",
  url: siteUrl,
  jobTitle: "Founder & AI Engineer",
  worksFor: { "@id": `${siteUrl}/#organization` },
  knowsAbout: [
    "Multi-Agent AI Systems", "Agentic Workflows", "LangChain", "LangGraph",
    "N8n Automation", "SaaS Development", "Next.js", "AI Automation",
  ],
  sameAs: SOCIAL,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "TechNest",
  alternateName: ["TechNest Solutions", "TechNest Agency"],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
    width: 180,
    height: 60,
  },
  description:
    "TechNest is a remote-first, AI-native digital agency headquartered in Bengaluru, India, specializing in multi-agent systems, agentic workflows, N8n automation, SaaS development, and AI-powered marketing for startups and enterprises across India, the United States, the UK, the Gulf (UAE, Saudi Arabia, Kuwait, Qatar), and Europe.",
  email: "hello@technestsolutions.in",
  telephone: "+91-9602035868",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  foundingDate: "2023",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 15 },
  knowsAbout: [
    "Artificial Intelligence", "Multi-Agent Systems", "Agentic Workflows",
    "N8n Automation", "SaaS Development", "Web Application Development",
    "Mobile App Development", "Digital Marketing", "LangChain", "LangGraph",
    "AutoGen", "CrewAI", "OpenAI API", "Claude API",
  ],
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "AdministrativeArea", name: "Bangalore, India" },
    { "@type": "AdministrativeArea", name: "Chennai, India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "France" },
    { "@type": "Text", value: "Worldwide" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-9602035868",
      email: "hello@technestsolutions.in",
      areaServed: ["IN", "US", "GB", "AE", "SA", "KW", "QA", "TR", "DE", "NL", "FR"],
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      contactOption: "TollFree",
      availableLanguage: ["English", "Arabic"],
      areaServed: ["AE", "SA", "KW", "QA"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  ],
  founder: { "@id": `${siteUrl}/#shaan` },
  sameAs: SOCIAL,
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#localbusiness`,
  name: "TechNest",
  url: siteUrl,
  email: "hello@technestsolutions.in",
  telephone: "+91-9602035868",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  description:
    "Remote-first AI automation agency headquartered in Bengaluru, India, building multi-agent systems, N8n workflows, and SaaS platforms for startups and enterprises. Serving clients across India, the United States, the Gulf (UAE, Saudi Arabia, Kuwait, Qatar), the UK, and Europe.",
  foundingDate: "2023",
  priceRange: "$$$",
  currenciesAccepted: "INR, USD, GBP, AED, SAR, KWD, TRY, EUR",
  paymentAccepted: "Bank Transfer, Credit Card, Wire Transfer",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "AdministrativeArea", name: "Bangalore, India" },
    { "@type": "AdministrativeArea", name: "Chennai, India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "France" },
    { "@type": "Text", value: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Agent AI Systems", description: "Design, build, and deploy autonomous multi-agent pipelines using LangChain, LangGraph, and Claude API." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic Workflows", description: "LLM-powered automation that handles ambiguity, conditional logic, and real-time tool use." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "N8n Workflow Automation", description: "Self-hosted N8n replacing Zapier at 80-90% lower cost with full data privacy." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development", description: "Full-stack SaaS with Next.js, Supabase, and Stripe. Production-ready in 6 weeks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web App Development", description: "Custom web applications — TypeScript-first, scalable, Next.js." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", description: "iOS and Android apps from a single React Native + Expo codebase." } },
    ],
  },
  sameAs: SOCIAL,
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "TechNest",
  description: "AI automation agency headquartered in Bengaluru, India — serving businesses across India, USA, the Gulf, UK, and Europe",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en",
}

export function SchemaMarkup() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shaanPersonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  )
}
