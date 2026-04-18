# Schema Markup & Structured Data Strategy

## Overview
This document outlines TechNest's schema.org implementation strategy to enhance search visibility, improve AI search presence, and establish semantic relationships between content types.

## Current Implementation Status

### ✅ Implemented
1. **BlogPosting** (blog/[slug]/page.tsx)
   - headline, description, author, publisher
   - url, image, keywords
   - BreadcrumbList integration for path tagging

2. **Article** (case-studies/[slug]/page.tsx)
   - headline, description, author, publisher
   - mentions (services used as linked entities)
   - relatedLink (related case studies)

3. **BreadcrumbList** (all detail pages)
   - Home → Section → Detail structure
   - Helps search engines understand hierarchy

4. **NewsletterSignup** (components/newsletter-cta.tsx)
   - ReceiveAction schema for email capture
   - Agent-friendly for ChatGPT/Claude email signup identification

### ⏳ To Implement

#### Service Detail Pages (`services/[slug]/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Multi-Agent AI Systems",
  "description": "Autonomous AI pipelines...",
  "provider": {
    "@type": "Organization",
    "name": "TechNest",
    "url": "http://technestsolutions.in/"
  },
  "areaServed": "Global",
  "serviceType": "AI Development",
  "relatedService": [
    { "@type": "Service", "url": "/services/saas-platform-development" },
    { "@type": "Service", "url": "/services/web-app-development" }
  ],
  "relatedLink": [
    { "@type": "BlogPosting", "url": "/blog/post-slug", "headline": "..." },
    { "@type": "Article", "url": "/case-studies/slug", "headline": "..." }
  ]
}
```

#### Compare Pages (`compare/[slug]/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "ComparisonChart",
  "headline": "[Service] vs TechNest",
  "description": "Detailed comparison...",
  "url": "http://technestsolutions.incompare/upwork",
  "itemCompared": [
    {
      "@type": "SoftwareApplication",
      "name": "Upwork",
      "url": "https://upwork.com"
    },
    {
      "@type": "Organization",
      "name": "TechNest",
      "url": "http://technestsolutions.in/"
    }
  ],
  "reviewedService": {
    "@type": "Service",
    "name": "Custom Development Services",
    "provider": { "@type": "Organization", "name": "TechNest" }
  }
}
```

#### Homepage (`app/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechNest",
  "description": "AI, automation, and web development agency",
  "url": "http://technestsolutions.in/",
  "telephone": "[phone if available]",
  "email": "hello@technestsolutions.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[if applicable]",
    "addressCity": "[city]",
    "addressRegion": "[state]",
    "postalCode": "[zip]",
    "addressCountry": "US"
  },
  "areaServed": "Global",
  "sameAs": [
    "https://linkedin.com/company/technest",
    "https://twitter.com/technest"
  ],
  "knowsAbout": [
    "Multi-Agent AI Systems",
    "Agentic Workflows",
    "N8n Automation",
    "SaaS Development",
    "Web App Development",
    "Mobile App Development"
  ],
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "price": "Custom pricing",
    "offers": [
      { "@type": "Offer", "name": "Multi-Agent AI Systems" },
      { "@type": "Offer", "name": "SaaS Platform Development" }
    ]
  }
}
```

## Link Relationship Schemas

### Service → Blog/Case Study Links
Use `relatedLink` to signal semantic connections:

```json
{
  "@context": "https://schema.org",
  "@type": "Thing",
  "url": "http://technestsolutions.inblog/methodology-post",
  "name": "Blog Post Title"
}
```

### Service → Service Links
Use `relatedService` for cross-service recommendations:

```json
{
  "@type": "Service",
  "url": "/services/saas-platform-development",
  "name": "SaaS Platform Development"
}
```

### Case Study → Service Mentions
Use `mentions` to link services used:

```json
{
  "mentions": [
    {
      "@type": "Thing",
      "name": "Multi-Agent AI Systems",
      "url": "http://technestsolutions.inservices/multi-agent-ai-systems"
    }
  ]
}
```

## AI Search Engine Considerations

### ChatGPT Citation Optimization
- Schema.org `Article`, `BlogPosting`, and `NewsArticle` types cited in ChatGPT
- Include `url`, `headline`, `description` for better citations
- BreadcrumbList helps understand article hierarchy

### Perplexity Bot Preferences
- Values `relatedLink` relationships
- Cites sources with clear `author` and `datePublished`
- Description fields improve snippet extraction

### Claude (Anthropic) Preferences
- Prefers complete context in schema
- Values `mentions` relationships for entity extraction
- Appreciates detailed service descriptions

## Implementation Priority

### Phase 1 (High Impact)
- [ ] Add Service schema to all `services/[slug]/page.tsx`
- [ ] Add relatedLink to existing BlogPosting schemas
- [ ] Add LocalBusiness schema to homepage

### Phase 2 (Medium Impact)
- [ ] Add ComparisonChart schema to compare pages
- [ ] Enhance Article schema for case studies
- [ ] Add knowsAbout array to LocalBusiness

### Phase 3 (Polish)
- [ ] Add BreadcrumbList to service pages
- [ ] Add FAQPage schema to FAQ section
- [ ] Add VideoObject schema if adding video content

## Validation Tools

```bash
# Google Rich Results Test
https://search.google.com/test/rich-results

# Schema.org validator
https://validator.schema.org/

# Graphify schema exploration
graphify query "what schema types are used in the website?"
```

## Link Directionality & Authority Flow

### Inbound Links (To TechNest)
- External backlinks from case study mentions
- Blog references from industry sites
- Compare page links from vendor reviews

### Outbound Links (From TechNest)
- Blog posts → Services (4-6 contextual links per post)
- Case studies → Services (2-3 linked service mentions)
- Services → Case studies (via RelatedContent)
- Services → Blog posts (via RelatedContent)

### Authority Benefit
- **Hubs** (Services Index, Blog Index) collect inbound authority
- **Spokes** (Detail pages) distribute authority outward
- **Cross-links** (Blog → Case Study) create topic clusters for AI interpretation

## Testing & Validation

```bash
# Verify schema structure
curl -s 'http://technestsolutions.inblog/[slug]' | jq '.[] | select(."@context")'

# Test with Google's Rich Results
# 1. Visit https://search.google.com/test/rich-results
# 2. Paste service/blog/case study URL
# 3. Verify Entity, Article, or Service card appears

# Query graphify for schema adoption
graphify query "which pages have schema markup implemented?"
```

## Notes for AI Implementation

When adding new content types:
1. Always include `@context: https://schema.org`
2. Include `url` and `name` minimum
3. Link related items using `relatedLink` or `mentions`
4. Validate with schema.org validator before publishing

---

**Last Updated:** Phase 6 - Backlinks Optimization
**Owner:** TechNest Development Team
**Review Frequency:** Quarterly (with new content)
