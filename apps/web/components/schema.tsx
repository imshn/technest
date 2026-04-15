const siteUrl = "https://technest.dev"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "TechNest",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
    width: 180,
    height: 60,
  },
  description:
    "TechNest is an AI-native digital agency specializing in multi-agent systems, agentic workflows, N8n automation, SaaS development, web & mobile apps, and AI-powered marketing.",
  email: "hello@technest.dev",
  foundingDate: "2023",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 15 },
  knowsAbout: [
    "Artificial Intelligence", "Multi-Agent Systems", "Agentic Workflows",
    "N8n Automation", "SaaS Development", "Web Application Development",
    "Mobile App Development", "Digital Marketing", "LangChain", "AutoGen",
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "City", name: "Dubai", containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
    { "@type": "City", name: "Bengaluru", containedInPlace: { "@type": "Country", name: "India" } },
    { "@type": "Text", value: "Worldwide" },
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".speakable"],
  },
  sameAs: [
    "https://github.com/technestdev",
    "https://linkedin.com/company/technestdev",
    "https://twitter.com/technestdev",
  ],
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Build a Multi-Agent AI System for Your Business",
  description:
    "A step-by-step process for designing, building, and deploying a production-ready multi-agent AI system that automates complex business workflows.",
  totalTime: "P6W",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "5000" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discovery & Workflow Mapping",
      text: "Map the target workflow, identify decision points, define agent boundaries, and set measurable success criteria.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Agent Architecture Design",
      text: "Design the orchestrator–worker topology, define tool registry, plan memory strategy, and choose the LLM stack.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Iterative Build",
      text: "Build and test each agent in isolation, integrate the orchestration layer, and validate with real data.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Production Deployment",
      text: "Deploy on your infrastructure, configure monitoring and observability, and complete team handoff with documentation.",
    },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "TechNest",
  description: "AI-native digital agency for ambitious businesses",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does custom AI agent development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agent development at TechNest ranges from $5,000 for a focused single-agent automation to $50,000+ for enterprise multi-agent systems. Book a free 30-minute call to get an accurate estimate.",
      },
    },
    {
      "@type": "Question",
      name: "What is an agentic workflow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agentic workflow is an autonomous AI pipeline where one or more AI agents perceive data, reason about it, take actions, and refine their behavior — all without constant human input. TechNest builds these on top of LangChain, AutoGen, and CrewAI.",
      },
    },
    {
      "@type": "Question",
      name: "What is N8n and why use it over Zapier or Make?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "N8n is an open-source workflow automation platform you can self-host. Unlike Zapier or Make, N8n has no per-task pricing — you pay for hosting, not volume. TechNest builds and maintains custom N8n workflows for businesses that want automation without vendor lock-in.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients remotely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — TechNest serves clients globally. We have active client relationships across North America, the Gulf Cooperation Council region, and South Asia. All engagements run fully remote with weekly video syncs and async Slack communication.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical SaaS platform take to build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A focused SaaS MVP typically takes 8–14 weeks. A full-featured v1.0 generally takes 16–24 weeks. We provide detailed project breakdowns during our scoping call.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the source code after the project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do — fully. TechNest transfers 100% of intellectual property and source code rights to you upon project completion. We sign IP assignment agreements as standard.",
      },
    },
    {
      "@type": "Question",
      name: "How is TechNest different from hiring a freelancer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A freelancer gives you one person. TechNest gives you a coordinated team — an AI architect, full-stack engineers, UI/UX designers, and QA — working under a single engagement with accountable delivery milestones.",
      },
    },
  ],
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: "TechNest",
  url: siteUrl,
  email: "hello@technest.dev",
  description:
    "TechNest is an AI-native digital agency specializing in multi-agent systems, agentic workflows, N8n automation, SaaS development, and AI-powered marketing for startups and enterprises globally.",
  foundingDate: "2023",
  priceRange: "$$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Bank Transfer, Credit Card",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Text", value: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Agent AI Systems" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic Workflows" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "N8n Workflow Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
    ],
  },
  sameAs: [
    "https://github.com/technestdev",
    "https://linkedin.com/company/technestdev",
    "https://twitter.com/technestdev",
  ],
}

export function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
