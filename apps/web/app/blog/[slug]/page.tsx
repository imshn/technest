import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { BlogShareButtons } from "@/components/blog-share-buttons"
import { blogPosts } from "@/components/blog-preview"
import { RelatedContent, getRelatedServices, getRelatedContent } from "@/components/related-content"
import { RiArrowLeftLine, RiArrowRightLine, RiCalendarLine, RiTimeLine } from "@remixicon/react"

// ---------------------------------------------------------------------------
// ADD YOUR POST CONTENT HERE
// Each key matches the `slug` field in blog-preview.tsx blogPosts array.
// ---------------------------------------------------------------------------
const postContent: Record<string, { content: React.ReactNode }> = {
  "post-1": {
    content: (
      <>
        <p>
          Multi-agent AI systems are having a moment. Every vendor demo shows agents collaborating seamlessly, calling tools, and producing results while a human watches in awe. Then you try to deploy one and discover the demo was hiding two weeks of duct tape.
        </p>
        <p>
          We&apos;ve built multi-agent systems for fintech, e-commerce, and SaaS companies — systems that run 24/7 with no babysitting. Here&apos;s what the production architecture actually looks like.
        </p>

        <h2>Why Most Multi-Agent Demos Fail in Production</h2>
        <p>
          The demo problem is simple: demos are deterministic. The demonstrator controls the inputs, skips the edge cases, and hits replay if something breaks. Production is the opposite. Your agents will encounter malformed inputs, API timeouts, ambiguous instructions, and user requests that fall outside the training distribution.
        </p>
        <p>
          The three failure modes we see most often:
        </p>
        <ul>
          <li><strong>Runaway loops</strong> — Agent A triggers Agent B which re-triggers Agent A. Without a cycle-detection layer, you&apos;re burning tokens and getting nothing.</li>
          <li><strong>Silent failures</strong> — An agent returns a plausible-looking result that&apos;s wrong. Downstream agents trust it and the error propagates. By the time a human sees the output, the root cause is buried.</li>
          <li><strong>Context collapse</strong> — Agents share a context window. As the conversation grows, early instructions get truncated. The agent that was supposed to follow a specific format has forgotten the format by step 12.</li>
        </ul>

        <h2>The Architecture That Works</h2>
        <h3>1. Orchestrator–Worker Split</h3>
        <p>
          Every production system we build has a clear orchestrator–worker hierarchy. The orchestrator never executes tasks — it decomposes goals, assigns subtasks, and validates outputs before passing them downstream. Workers are stateless and focused: one worker for web search, one for data transformation, one for output formatting.
        </p>
        <p>
          This separation makes debugging tractable. When something goes wrong, you know whether it&apos;s a planning problem (orchestrator) or an execution problem (worker), not a "somewhere in the pipeline" problem.
        </p>

        <h3>2. Explicit State Management</h3>
        <p>
          Don&apos;t rely on the context window for state. We use a shared state object — typically a typed Python dict or a Redis hash — that every agent reads from and writes to. Each write is logged with a timestamp and agent ID. This gives you a full audit trail and makes it trivial to replay the pipeline from any checkpoint.
        </p>

        <h3>3. Tool Registry with Timeouts</h3>
        <p>
          Every tool in the system is registered with a maximum execution time and a retry policy. If a tool doesn&apos;t return within the timeout, the agent gets a structured error — not a hanging context. We use LangChain&apos;s tool abstraction with a custom wrapper that enforces these policies:
        </p>
        <pre><code>{`class SafeTool(BaseTool):
    timeout: int = 10  # seconds
    max_retries: int = 2

    def _run(self, *args, **kwargs):
        for attempt in range(self.max_retries + 1):
            try:
                return self._execute(*args, **kwargs)
            except TimeoutError:
                if attempt == self.max_retries:
                    return {"error": "Tool timed out", "tool": self.name}
                time.sleep(2 ** attempt)`}</code></pre>

        <h3>4. Memory That Scales</h3>
        <p>
          Agents need two types of memory: short-term (within a single run) and long-term (across runs). For short-term, we use a rolling summary — the orchestrator compresses the context every N steps to prevent collapse. For long-term, we use a vector store (Pinecone or Qdrant) with namespace isolation per user or workflow.
        </p>
        <p>
          The key insight: don&apos;t let agents retrieve their own memories. The orchestrator retrieves relevant context before assigning a task and injects it into the worker&apos;s prompt. Workers stay stateless; state is managed by the orchestrator.
        </p>

        <h3>5. Human-in-the-Loop Checkpoints</h3>
        <p>
          Every system we build has at least one hard checkpoint where a human can review before the pipeline continues. For high-stakes operations — sending emails, making API calls that cost money, deleting records — the agent queues the action and waits. The human approves or rejects via a simple UI or Slack message.
        </p>
        <p>
          This sounds like it defeats the purpose of automation. It doesn&apos;t. The agents handle 90% of the decisions autonomously; humans only see the edge cases and high-risk actions. Over time, as you gain confidence in the system, you can automate more checkpoints.
        </p>

        <h2>The Stack We Use</h2>
        <ul>
          <li><strong>Orchestration:</strong> LangGraph (for complex graphs) or LangChain LCEL (for simpler pipelines)</li>
          <li><strong>LLMs:</strong> Claude 3.5 Sonnet for reasoning tasks, GPT-4o for structured output, Haiku/Flash for high-volume classification</li>
          <li><strong>Memory:</strong> Redis for short-term state, Qdrant for vector retrieval</li>
          <li><strong>Tool execution:</strong> Custom Python wrappers with timeout enforcement</li>
          <li><strong>Observability:</strong> LangSmith for trace logging, Grafana for operational metrics</li>
          <li><strong>Deployment:</strong> Docker on your infrastructure — no vendor lock-in</li>
        </ul>

        <h2>What to Validate Before Going Live</h2>
        <p>
          Before any multi-agent system goes to production, we run it through a validation checklist:
        </p>
        <ul>
          <li>Does the orchestrator handle a malformed tool response without crashing?</li>
          <li>What happens when two agents try to write to the same state key simultaneously?</li>
          <li>Can the system recover from a mid-run LLM API outage?</li>
          <li>Does the audit log capture enough information to replay any failed run?</li>
          <li>Are all external API calls rate-limited to stay within quotas?</li>
        </ul>
        <p>
          If you can answer yes to all five, you have a system worth deploying.
        </p>

        <h2>The Bottom Line</h2>
        <p>
          Multi-agent systems are genuinely powerful. But the gap between a demo and a production deployment is larger than most people expect. The architecture — orchestrator–worker separation, explicit state, safe tools, scalable memory, and human checkpoints — is the difference between a system that runs once and one that runs forever.
        </p>
        <p>
          If you&apos;re building one and want a second opinion on your architecture, <a href="/services/multi-agent-ai-systems">we build these for a living</a>. Book a free call — we&apos;ll review your design and tell you exactly where it&apos;ll break.
        </p>
      </>
    ),
  },
  "post-2": {
    content: (
      <>
        <p>
          We use all three. Zapier for quick client demos, Make for moderately complex flows, and N8n for everything that actually needs to scale. After running each tool across multiple production environments, here&apos;s the honest breakdown.
        </p>

        <h2>The Short Answer</h2>
        <p>
          If you&apos;re running fewer than 1,000 tasks per month and need something set up in an afternoon: use Zapier. If you need complex multi-branch logic but don&apos;t want to manage infrastructure: use Make. If you care about cost at scale, data privacy, or need custom code execution: use N8n.
        </p>
        <p>
          Everything below explains why.
        </p>

        <h2>Pricing: Where Zapier Breaks Down</h2>
        <p>
          Zapier charges per task. At low volume, it&apos;s invisible. At high volume, it&apos;s a line item on your P&amp;L. A business running 50,000 tasks per month pays around $800/month on Zapier&apos;s Professional plan. That same volume on N8n self-hosted costs roughly $40–80/month in server costs.
        </p>
        <p>
          The math:
        </p>
        <ul>
          <li><strong>Zapier Professional (50K tasks/mo):</strong> ~$800/month</li>
          <li><strong>Make Pro (50K operations/mo):</strong> ~$180/month</li>
          <li><strong>N8n self-hosted (50K executions/mo):</strong> ~$40–80/month VPS + $0 per execution</li>
          <li><strong>N8n Cloud (50K executions/mo):</strong> ~$50/month</li>
        </ul>
        <p>
          One of our clients switched from Zapier to N8n and cut their automation bill from $2,400/month to under $200. The migration took two weeks. The savings paid for our work in the first month.
        </p>

        <h2>Logic Complexity: Where Zapier Hits a Wall</h2>
        <p>
          Zapier is optimized for linear flows: trigger → action → action. Anything more complex — conditional branching, loops, error handling, waiting for user input — requires workarounds that get brittle fast.
        </p>
        <p>
          Make handles branching and conditional logic natively with a visual router. It&apos;s genuinely good at moderately complex workflows and its error handling is better than Zapier&apos;s out of the box.
        </p>
        <p>
          N8n goes further. It supports:
        </p>
        <ul>
          <li>Arbitrary JavaScript and Python execution via Code nodes</li>
          <li>HTTP Request nodes with full header, auth, and body control</li>
          <li>Loop nodes with break conditions</li>
          <li>Merge nodes for fan-out/fan-in patterns</li>
          <li>Wait nodes for async human-in-the-loop approval flows</li>
          <li>Sub-workflows you can call like functions</li>
        </ul>
        <p>
          If your automation requires logic you&apos;d normally write code for, only N8n handles it cleanly without custom integrations.
        </p>

        <h2>Integrations: Where Zapier Still Leads</h2>
        <p>
          Zapier has 6,000+ integrations. Make has ~2,000. N8n has ~400 native integrations plus an HTTP Request node that connects to anything with an API.
        </p>
        <p>
          In practice, the N8n gap matters less than it sounds. If your target app has an API (and almost all modern SaaS tools do), N8n&apos;s HTTP Request node covers it. The tradeoff is configuration time: Zapier&apos;s pre-built integrations are faster to set up, but N8n&apos;s HTTP node is more flexible once configured.
        </p>
        <p>
          Where Zapier&apos;s integration breadth matters: legacy tools, niche vertical SaaS, and anything with OAuth that you don&apos;t want to implement yourself.
        </p>

        <h2>Data Privacy: N8n&apos;s Decisive Advantage</h2>
        <p>
          Zapier and Make are SaaS platforms. Your data passes through their servers. For most businesses, that&apos;s fine. For healthcare, fintech, or any company handling PII under GDPR or SOC 2 requirements, it&apos;s a problem.
        </p>
        <p>
          N8n self-hosted runs entirely on your infrastructure. No third-party servers touch your data. We&apos;ve deployed N8n inside AWS VPCs, on-premise, and in air-gapped environments. It&apos;s the only choice when data residency is a hard requirement.
        </p>

        <h2>Self-Hosting N8n: What It Actually Costs</h2>
        <p>
          The concern we hear most: "Self-hosting sounds complicated." It&apos;s not if you use Docker. Here&apos;s the minimal production setup:
        </p>
        <pre><code>{`# docker-compose.yml (simplified)
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
  postgres:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}`}</code></pre>
        <p>
          A $20/month DigitalOcean droplet handles ~50,000 executions/month without breaking a sweat. Add Nginx for SSL termination and you have a production-grade setup in under two hours.
        </p>

        <h2>When to Use Each Tool</h2>
        <ul>
          <li><strong>Zapier:</strong> Quick automation for non-technical teams; &lt;1,000 tasks/month; maximum integration breadth needed; no engineering resources to manage infrastructure</li>
          <li><strong>Make:</strong> Visual-first complex logic; mid-range volume (1,000–20,000 operations/month); no desire to manage servers; better value than Zapier at scale</li>
          <li><strong>N8n:</strong> High-volume automations; strict data privacy requirements; need for custom code execution; budget-sensitive at scale; want full control over your automation infrastructure</li>
        </ul>

        <h2>Our Recommendation</h2>
        <p>
          Start with the tool that gets your first automation live fastest. For most teams, that&apos;s Zapier or Make. When you hit a limit — cost, complexity, or data privacy — migrate to N8n.
        </p>
        <p>
          If you already know you&apos;re going to run high-volume or complex automations, skip the migration cost and <a href="/services/n8n-workflow-automation">start with N8n</a>. We&apos;ll set it up, build your first workflows, and hand over a system you fully own.
        </p>
      </>
    ),
  },
  "post-3": {
    content: (
      <>
        <p>
          We&apos;ve launched SaaS MVPs with 4-week timelines that shipped nothing useful and 12-week timelines that shipped products people actually paid for. The difference isn&apos;t the timeline — it&apos;s the decisions made in week one.
        </p>
        <p>
          Here&apos;s the exact stack and week-by-week process we use for every SaaS build. Not the idealized version. The actual one.
        </p>

        <h2>The Stack</h2>
        <p>
          We made a deliberate decision three years ago to standardize on one stack and get very good at it, rather than picking the "best" technology for each project and rebuilding tribal knowledge every time.
        </p>
        <ul>
          <li><strong>Framework:</strong> Next.js 14+ with App Router — SSR for SEO, RSC for performance, API routes for backend logic</li>
          <li><strong>Database + Auth:</strong> Supabase — Postgres with row-level security, built-in auth (email, OAuth, magic link), real-time subscriptions, and edge functions</li>
          <li><strong>Payments:</strong> Stripe — subscriptions, usage-based billing, customer portal, and webhooks. We use Stripe&apos;s hosted billing portal so clients don&apos;t have to build a payments UI</li>
          <li><strong>Styling:</strong> Tailwind CSS + shadcn/ui — consistent component system, dark mode out of the box, no CSS maintenance</li>
          <li><strong>Deployment:</strong> Vercel (frontend) + Supabase Cloud (database) — zero-config CI/CD, preview deployments, edge network</li>
          <li><strong>Email:</strong> Resend with React Email templates — transactional email that doesn&apos;t land in spam</li>
          <li><strong>Analytics:</strong> PostHog — product analytics, feature flags, session recording, and A/B testing in one tool</li>
        </ul>
        <p>
          This stack ships fast because every piece is battle-tested, the documentation is excellent, and we&apos;ve solved every common problem before.
        </p>

        <h2>The 6-Week Process</h2>
        <h3>Week 1: Architecture and Data Model</h3>
        <p>
          The single most important week. We spend it answering five questions:
        </p>
        <ul>
          <li>What is the core entity in this product? (user, organization, project, etc.)</li>
          <li>What does multi-tenancy look like? (shared database with RLS vs. separate schemas)</li>
          <li>What is the billing model and how does it map to database rows?</li>
          <li>What third-party integrations are on the critical path?</li>
          <li>What does the onboarding flow look like from first login to first value?</li>
        </ul>
        <p>
          We produce a data model, an auth/permissions matrix, and a flow diagram for the core user journey. Development doesn&apos;t start until these are signed off. Changing a data model in week 4 is expensive. Changing it in week 1 is free.
        </p>

        <h3>Week 2: Core Infrastructure</h3>
        <p>
          This week is all plumbing — necessary, unglamorous, and critical to get right:
        </p>
        <ul>
          <li>Supabase project setup with RLS policies for multi-tenancy</li>
          <li>Auth flows: sign up, sign in, password reset, OAuth</li>
          <li>Stripe customer + subscription creation on sign-up</li>
          <li>Webhook handling for subscription lifecycle events (created, updated, canceled)</li>
          <li>Email setup: welcome email, password reset, billing receipts</li>
          <li>CI/CD pipeline with Vercel preview deployments</li>
        </ul>
        <p>
          By end of week 2, a test user can create an account, see a dashboard, and be billed. Nothing else — but this is the foundation everything else builds on.
        </p>

        <h3>Weeks 3–4: Core Features</h3>
        <p>
          The product takes shape. We build the minimum feature set that delivers the core value proposition — the thing users actually sign up to do. We ruthlessly cut anything that&apos;s "nice to have" and document it for a future sprint.
        </p>
        <p>
          Daily standups (async Slack, not video calls). We share a working preview URL every day so the client can click around and flag issues early. Weekly video call to review progress and adjust priorities.
        </p>

        <h3>Week 5: Polish and Edge Cases</h3>
        <p>
          Feature-complete doesn&apos;t mean shippable. Week 5 is for:
        </p>
        <ul>
          <li>Empty states (what does a new user see before they have any data?)</li>
          <li>Error states (what happens when an API call fails?)</li>
          <li>Loading states (optimistic UI vs. spinners)</li>
          <li>Mobile responsiveness audit</li>
          <li>Performance profiling (Lighthouse score, Core Web Vitals)</li>
          <li>Accessibility basics (keyboard navigation, focus management, ARIA labels)</li>
        </ul>

        <h3>Week 6: Deployment and Handoff</h3>
        <p>
          Production launch week:
        </p>
        <ul>
          <li>Custom domain setup and SSL</li>
          <li>Environment variable audit (nothing hardcoded, everything in Vercel env vars)</li>
          <li>Database backup configuration</li>
          <li>Error monitoring setup (Sentry or equivalent)</li>
          <li>Full code walkthrough with the client team</li>
          <li>Documentation: architecture overview, deployment guide, common operations runbook</li>
          <li>100% IP and repository transfer</li>
        </ul>

        <h2>What Gets Cut in an MVP</h2>
        <p>
          This is the uncomfortable part of the conversation. Six weeks is real, but it requires discipline about scope. Things we consistently cut from MVPs:
        </p>
        <ul>
          <li>Admin dashboard (use Supabase Studio instead)</li>
          <li>Advanced reporting (PostHog covers the basics)</li>
          <li>Team invitations and roles (do this after you have paying users)</li>
          <li>Mobile app (build web-first, validate, then mobile)</li>
          <li>Integrations beyond the critical path (add in sprint 2)</li>
        </ul>
        <p>
          The hardest part of an MVP is not building the features — it&apos;s having the discipline not to build the features that don&apos;t matter yet.
        </p>

        <h2>The Handoff</h2>
        <p>
          Every SaaS we build is handed off with full source code, all credentials, a deployment guide, and a 30-day support window. You can maintain it yourself, hand it to your own team, or keep us on retainer for the next sprint.
        </p>
        <p>
          If you&apos;re building a SaaS and want to talk through your scope, <a href="/services/saas-platform-development">book a free 30-minute call</a>. We&apos;ll tell you exactly what we can ship in 6 weeks and what we&apos;d recommend cutting.
        </p>
      </>
    ),
  },
}
// ---------------------------------------------------------------------------

const siteUrl = "https://technest.dev"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const meta = blogPosts.find((p) => p.slug === slug)
  if (!meta) return {}

  const canonical = `${siteUrl}/blog/${slug}`

  return {
    title: `${meta.title} | TechNest Blog`,
    description: meta.excerpt,
    keywords: [
      meta.tag,
      "AI automation",
      "workflow automation",
      "TechNest",
      "agentic AI",
      "n8n automation",
    ],
    authors: [{ name: "TechNest", url: siteUrl }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: meta.title,
      description: meta.excerpt,
      siteName: "TechNest",
      tags: [meta.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.excerpt,
      site: "@technest",
      creator: "@technest",
    },
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const meta = blogPosts.find((p) => p.slug === slug)
  const post = postContent[slug]
  if (!meta || !post) notFound()

  const canonical = `${siteUrl}/blog/${slug}`
  const allTags = Array.from(new Set(blogPosts.map((p) => p.tag)))
  const recentPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  // BlogPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    keywords: meta.tag,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Organization",
      name: "TechNest",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "TechNest",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: meta.title, item: canonical },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <a href="/blog" className="hover:text-foreground transition-colors duration-150">Blog</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-[32ch]">{meta.title}</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

            {/* Article */}
            <article>
              {/* Cover placeholder */}
              <div className="w-full h-64 md:h-80 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-center mb-8">
                <span className="text-sm font-medium px-4 py-2 rounded-full bg-primary/8 text-primary border border-primary/20">
                  {meta.tag}
                </span>
              </div>

              {/* Article header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-foreground mb-4">
                  {meta.title}
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  {meta.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <RiCalendarLine size={13} />
                      {meta.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1.5">
                      <RiTimeLine size={13} />
                      {meta.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="font-medium text-foreground">TechNest</span>
                  </div>
                  <BlogShareButtons title={meta.title} slug={slug} />
                </div>
              </header>

              {/* Post body — add content in postContent above */}
              <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/60
                prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              ">
                {post.content}
              </div>

              {/* Share again after article */}
              <div className="mt-12 pt-8 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <RiArrowLeftLine size={14} />
                  Back to all articles
                </a>
                <BlogShareButtons title={meta.title} slug={slug} />
              </div>

              {/* Post-article CTA */}
              <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/4 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Building something like this?
                  </p>
                  <p className="text-sm text-muted-foreground max-w-[48ch]">
                    Book a free 30-minute call and we&apos;ll map out your highest-leverage automation opportunities.
                  </p>
                </div>
                <CalendlyButton
                  label="Book Free Call"
                  variant="primary"
                  trackAs={`blog_post_cta_${slug}`}
                  icon={<RiArrowRightLine size={14} />}
                  className="flex-row-reverse shrink-0"
                />
              </div>

              {/* Related content */}
              <RelatedContent
                items={[
                  ...getRelatedServices([meta.tag]),
                  ...getRelatedContent(slug, blogPosts, "blog").slice(0, 1),
                ]}
                title="Related Resources"
              />
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24">

              {/* Browse by topic */}
              <div
                className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <p className="text-xs font-semibold text-foreground tracking-widest uppercase">
                  Browse by Topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                        tag === meta.tag
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              <div
                className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <p className="text-xs font-semibold text-foreground tracking-widest uppercase">
                  Recent Posts
                </p>
                <div className="flex flex-col gap-5">
                  {recentPosts.map((p) => (
                    <a
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col gap-1.5 border-b border-border/40 pb-5 last:border-0 last:pb-0"
                    >
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20 w-fit">
                        {p.tag}
                      </span>
                      <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors duration-150">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{p.date} · {p.readTime}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Sidebar CTA */}
              <div
                className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Free strategy call</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    30 min · No pitch · Just clarity on what to automate first.
                  </p>
                </div>
                <CalendlyButton
                  label="Book Free Call"
                  variant="primary"
                  trackAs={`blog_sidebar_cta_${slug}`}
                  icon={<RiCalendarLine size={14} />}
                  className="w-full justify-center"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
