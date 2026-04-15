# RelatedContent Component Reference Guide

## Quick Overview
The `RelatedContent` component is a reusable UI element that displays related resources (services, blog posts, case studies) with smart linking and contextual discovery.

**Location:** `components/related-content.tsx`
**Status:** ✅ Production-ready
**Implemented in:**
- Blog detail pages (`blog/[slug]/page.tsx`)
- Case study detail pages (`case-studies/[slug]/page.tsx`)
- Service detail pages (`services/[slug]/page.tsx`)

---

## Component API

### RelatedContent Props

```typescript
interface RelatedContentProps {
  items: RelatedItem[]      // Array of related items to display
  title?: string            // Section heading (default: "Related Resources")
}

type RelatedItem = {
  title: string             // Display title of the related item
  href: string              // URLs path to the item (/blog/slug, /services/slug, etc)
  type: "service" | "blog" | "case-study"  // Item classification
  description?: string      // Optional short description/excerpt
}
```

### Basic Usage

```tsx
import { RelatedContent } from '@/components/related-content'

// Simple usage with hard-coded items
<RelatedContent
  items={[
    {
      title: "Multi-Agent AI Systems",
      href: "/services/multi-agent-ai-systems",
      type: "service"
    },
    {
      title: "How We Built a Scalable N8n Platform",
      href: "/blog/n8n-architecture",
      type: "blog",
      description: "Detailed breakdown of our self-hosted automation approach"
    }
  ]}
  title="Related Topics"
/>
```

---

## Helper Functions

### `getRelatedServices(tags: string[])`
Automatically discovers services based on blog post/case study tags.

**Parameters:**
- `tags: string[]` - Array of tag names from blog post or case study

**Returns:** `RelatedItem[]` - Array of matching services with href paths

**Example:**
```tsx
import { getRelatedServices } from '@/components/related-content'

const tags = ["AI Automation", "N8n"]
const relatedServices = getRelatedServices(tags)
// Returns: [
//   {
//     title: "Multi-Agent AI Systems",
//     href: "/services/multi-agent-ai-systems",
//     type: "service"
//   },
//   {
//     title: "N8n Workflow Automation",
//     href: "/services/n8n-workflow-automation",
//     type: "service"
//   }
// ]
```

**Tag→Service Mapping** (defined in related-content.tsx):
| Tag | Service |
|-----|---------|
| AI Automation | Multi-Agent AI Systems |
| Automation | Agentic Workflows |
| N8n | N8n Workflow Automation |
| SaaS | SaaS Platform Development |
| Web Development | Web App Development |
| Mobile | Mobile App Development |
| Desktop | Desktop App Development |
| Design | Graphic Designing |
| Marketing, SEO, CRO | Digital Marketing |

### `getRelatedContent(slug: string, items: array, type: "blog" | "case-study")`
Discovers related blog posts or case studies, excluding the current item.

**Parameters:**
- `slug: string` - Current item's slug (to exclude it from results)
- `items: array` - Array of all blog posts or case studies
- `type: "blog" | "case-study"` - Content type

**Returns:** `RelatedItem[]` - Array of related items (max 3)

**Example:**
```tsx
import { getRelatedContent } from '@/components/related-content'
import { blogPosts } from '@/components/blog-preview'

const relatedBlogs = getRelatedContent("post-1", blogPosts, "blog")
// Returns: [
//   { title: "...", href: "/blog/post-2", type: "blog" },
//   { title: "...", href: "/blog/post-3", type: "blog" }
// ]
```

---

## Usage Patterns

### Pattern 1: Blog Post → Related Services & Posts
```tsx
// In blog/[slug]/page.tsx
<RelatedContent
  items={[
    ...getRelatedServices([meta.tag]),  // Services tagged with post's topic
    ...getRelatedContent(slug, blogPosts, "blog").slice(0, 1)  // One related post
  ]}
  title="Related Resources"
/>
```

### Pattern 2: Case Study → Related Case Studies
```tsx
// In case-studies/[slug]/page.tsx
<RelatedContent
  items={getRelatedContent(slug, caseStudies, "case-study").slice(0, 2)}
  title="Explore More Case Studies"
/>
```

### Pattern 3: Service → Related Case Studies
```tsx
// In services/[slug]/page.tsx
<RelatedContent
  items={
    caseStudies
      .filter((cs) => cs.services.includes(svc.title))
      .slice(0, 1)
      .map((cs) => ({
        title: cs.title,
        href: `/case-studies/${cs.slug}`,
        type: "case-study",
        description: cs.result
      }))
  }
  title="Proven Case Studies"
/>
```

---

## Styling & Appearance

### Component Features
- **Grid Layout**: 1 column on mobile, 2 columns on md+ breakpoints
- **Card Style**: Border, hover effects, icon indicators
- **Type Badges**: Color-coded badges show content type (Service, Blog Post, Case Study)
- **Responsive**: Mobile-optimized with touch-friendly spacing
- **a11y**: Proper semantic HTML and ARIA attributes

### Customization
- Passing `title` prop changes the section heading
- Currently no exposed theming props (uses Tailwind design tokens)
- Card color/styling ties to content `type` classification

---

## Performance Considerations

### Data Fetching
- Helper functions are **synchronous** - no async/await needed
- Array filtering happens at render time (OK for <50 items)
- No network requests made by the component

### Rendering
- Typically renders 1-3 items per context page
- Total DOM nodes: ~15-20 per RelatedContent component
- No lazy-loading (content above the fold recommendation)

### Optimization Tips
For large sites with 100+ blog posts:
1. Pre-filter items before passing to component
2. Consider pagination on hub pages
3. Use `.slice(0, N)` to limit displayed items

---

## Adding New Content Type Links

**To add a new content type** (e.g., Templates, Tutorials):

1. **Update TypeScript definition:**
```tsx
type RelatedItem = {
  title: string
  href: string
  type: "service" | "blog" | "case-study" | "template"  // ← Add new type
  description?: string
}
```

2. **Add badge styling:**
```tsx
const typeLabel = {
  "service": "Service",
  "blog": "Blog Post",
  "case-study": "Case Study",
  "template": "Template"  // ← Add label
}
// In component rendering:
<p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-1.5">
  {typeLabel[item.type]}
</p>
```

3. **Create helper function:**
```tsx
export function getRelatedTemplates(slug: string): RelatedItem[] {
  return templates
    .filter((t) => t.slug !== slug)
    .map((t) => ({
      title: t.name,
      href: `/templates/${t.slug}`,
      type: "template"
    }))
}
```

---

## SEO Impact

### Schema Markup Integration
The RelatedContent component works in tandem with schema.org markup:

- **relatedLink** schema: Manually added to page schema (not generated by component)
- **mentions** schema: Service tags in case studies create mentions relationships
- **BreadcrumbList**: Component doesn't affect but benefits from breadcrumb schema

### For AI Search Engines
The internal links created via RelatedContent help:
1. **ChatGPT** - Discover related content for citations
2. **Perplexity** - Understand content relationships and topic clusters
3. **Claude** - Extract semantic connections between pages

---

## Testing Checklist

When adding RelatedContent to a new page:

- [ ] Component renders without errors
- [ ] Related items display in responsive grid (test mobile/desktop)
- [ ] Links navigate to correct URLs
- [ ] Type badges show correct content classification
- [ ] Description text (if present) displays properly
- [ ] No console warnings/errors
- [ ] Hover states work on links
- [ ] Component spacing matches page design

---

## Troubleshooting

### Items Not Appearing
1. Check that items array is not empty
2. Verify items have required fields: `title`, `href`, `type`
3. Ensure `href` paths are correct (no trailing slashes)
4. Check browser console for errors

### Styling Issues
1. Verify Tailwind CSS is loaded and working
2. Check for CSS specificity conflicts
3. Inspect element to see computed styles
4. Rebuild CSS if using Tailwind JIT

### Service Links Not Working
1. Verify service slug in href matches actual service slug
2. Check `getRelatedServices()` tags → service mapping
3. Confirm service pages exist at `/services/[slug]`
4. Test with a hardcoded RelatedItem first

---

## Future Enhancements

Potential improvements:
- [ ] Add `imageUrl` field for thumbnail previews
- [ ] Support sorting by relevance/date/popularity
- [ ] Add "View all" link to show more than 2-3 items
- [ ] Implement analytics tracking for related link clicks
- [ ] Add success/error states for dynamic content loading
- [ ] Support category badges alongside type badges

---

**Last Updated:** Phase 6 - Internal Linking Optimization  
**Maintained By:** TechNest Development Team  
**Status:** ✅ Production Ready
