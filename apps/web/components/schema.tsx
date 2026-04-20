const siteUrl = "https://technestsolutions.in"

// Canonical social URLs — used in sameAs everywhere
const SOCIAL = [
  "https://github.com/technestdev",
  "https://linkedin.com/company/technestdev",
  "https://twitter.com/technestdev",
  "https://x.com/technestdev",
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
    "TechNest is an AI-native digital agency specializing in multi-agent systems, agentic workflows, N8n automation, SaaS development, and AI-powered marketing for startups and enterprises in USA, UK, UAE, Kuwait, Saudi Arabia, Turkey, and Europe.",
  email: "hello@technestsolutions.in",
  foundingDate: "2023",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 15 },
  knowsAbout: [
    "Artificial Intelligence", "Multi-Agent Systems", "Agentic Workflows",
    "N8n Automation", "SaaS Development", "Web Application Development",
    "Mobile App Development", "Digital Marketing", "LangChain", "LangGraph",
    "AutoGen", "CrewAI", "OpenAI API", "Claude API",
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "France" },
    { "@type": "AdministrativeArea", name: "Bangalore, India" },
    { "@type": "AdministrativeArea", name: "Chennai, India" },
    { "@type": "Text", value: "Worldwide" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@technestsolutions.in",
      areaServed: ["US", "GB", "AE", "SA", "KW", "QA", "TR", "DE", "NL", "FR"],
      availableLanguage: ["English"],
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
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".speakable"],
  },
  sameAs: SOCIAL,
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${siteUrl}/#localbusiness`,
  name: "TechNest",
  url: siteUrl,
  email: "hello@technestsolutions.in",
  description:
    "AI automation agency building multi-agent systems, N8n workflows, and SaaS platforms for startups and enterprises. Serving clients in USA, UK, UAE, Saudi Arabia, Kuwait, Turkey, and Europe.",
  foundingDate: "2023",
  priceRange: "$$$",
  currenciesAccepted: "USD, GBP, AED, SAR, KWD, TRY, EUR",
  paymentAccepted: "Bank Transfer, Credit Card, Wire Transfer",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "France" },
    { "@type": "AdministrativeArea", name: "Bangalore, India" },
    { "@type": "AdministrativeArea", name: "Chennai, India" },
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
  description: "AI automation agency for ambitious businesses — USA, UK, Gulf, Europe, and Bangalore/Chennai",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en",
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Build a Multi-Agent AI System for Your Business",
  description:
    "Step-by-step process for designing, building, and deploying a production-ready multi-agent AI system that automates complex business workflows.",
  totalTime: "P6W",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "5000" },
  author: { "@id": `${siteUrl}/#shaan` },
  step: [
    { "@type": "HowToStep", position: 1, name: "Discovery & Workflow Mapping", text: "Map the target workflow, identify decision points, define agent boundaries, and set measurable success criteria." },
    { "@type": "HowToStep", position: 2, name: "Agent Architecture Design", text: "Design the orchestrator-worker topology, define tool registry, plan memory strategy, and choose the LLM stack." },
    { "@type": "HowToStep", position: 3, name: "Iterative Build", text: "Build and test each agent in isolation, integrate the orchestration layer, and validate with real data." },
    { "@type": "HowToStep", position: 4, name: "Production Deployment", text: "Deploy on your infrastructure, configure monitoring and observability, and complete team handoff with documentation." },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does custom AI agent development cost?",
      acceptedAnswer: { "@type": "Answer", text: "AI agent development at TechNest starts from $1,000 for a focused single-agent automation to $50,000+ for enterprise multi-agent systems. We serve clients in USA, UK, UAE, Kuwait, Saudi Arabia, Turkey, and Europe. Book a free 30-minute call for an accurate estimate." },
    },
    {
      "@type": "Question",
      name: "What is an agentic workflow?",
      acceptedAnswer: { "@type": "Answer", text: "An agentic workflow is an autonomous AI pipeline where one or more AI agents perceive data, reason about it, take actions, and refine their behavior without constant human input. TechNest builds these on LangChain, LangGraph, AutoGen, and CrewAI." },
    },
    {
      "@type": "Question",
      name: "What is N8n and why use it over Zapier or Make?",
      acceptedAnswer: { "@type": "Answer", text: "N8n is an open-source workflow automation platform you can self-host. Unlike Zapier or Make, N8n has no per-task pricing — you pay only for hosting. TechNest migrates businesses from Zapier to self-hosted N8n, cutting automation costs by 80-90%." },
    },
    {
      "@type": "Question",
      name: "Does TechNest work with clients in Bangalore or Chennai?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — TechNest works with tech startups and product companies in Bangalore and Chennai. Engagements run fully remote with flexible payment in USD or INR. We primarily serve clients in USA, UK, Gulf, and Europe." },
    },
    {
      "@type": "Question",
      name: "Does TechNest work with clients in UAE, Saudi Arabia, Kuwait, or Turkey?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — TechNest has active client relationships across the Gulf region and Turkey including UAE, Saudi Arabia, Kuwait, Qatar, and Istanbul. All engagements run fully remote with NDA signed before start. We accept USD, AED, SAR, KWD, and TRY." },
    },
    {
      "@type": "Question",
      name: "How long does a SaaS platform take to build?",
      acceptedAnswer: { "@type": "Answer", text: "A focused SaaS MVP takes 6-8 weeks. A full-featured v1.0 takes 12-16 weeks. TechNest uses a standardized Next.js + Supabase + Stripe stack to ship fast without cutting corners." },
    },
    {
      "@type": "Question",
      name: "Who owns the source code after the project?",
      acceptedAnswer: { "@type": "Answer", text: "You own it 100%. TechNest transfers all intellectual property and source code rights on project completion. IP assignment agreements are signed as standard before any work begins." },
    },
    {
      "@type": "Question",
      name: "How is TechNest different from hiring a freelancer on Upwork or Fiverr?",
      acceptedAnswer: { "@type": "Answer", text: "A freelancer gives you one person. TechNest gives you a coordinated team — an AI architect, full-stack engineers, UI/UX designers, and QA — working under a single engagement with accountable milestones and a 30-day post-launch support window." },
    },
  ],
}

export function SchemaMarkup() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shaanPersonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
