# Connecting mcp-blog to OpenClaw

## 1. Build the server

```bash
cd packages/mcp-blog
bun run build
```

## 2. Set environment variables

Create `packages/mcp-blog/.env` (or export in your shell):

```env
# Absolute path to apps/web/data/posts.json
POSTS_JSON_PATH=/absolute/path/to/technest/apps/web/data/posts.json

# Your Next.js dev server (for auto-revalidation after publish)
BLOG_API_URL=http://localhost:3000

# Must match BLOG_API_KEY in apps/web/.env.local
BLOG_API_KEY=your-secret-key-here

# Optional — enables real Unsplash image search (free API key at unsplash.com/developers)
UNSPLASH_ACCESS_KEY=
```

## 3. Add to OpenClaw MCP config

In your OpenClaw `mcp_servers.json` (or equivalent):

```json
{
  "mcpServers": {
    "technest-blog": {
      "command": "node",
      "args": ["/absolute/path/to/technest/packages/mcp-blog/dist/index.js"],
      "env": {
        "POSTS_JSON_PATH": "/absolute/path/to/technest/apps/web/data/posts.json",
        "BLOG_API_URL": "http://localhost:3000",
        "BLOG_API_KEY": "your-secret-key-here",
        "UNSPLASH_ACCESS_KEY": ""
      }
    }
  }
}
```

## 4. Available tools

| Tool | What it does |
|------|-------------|
| `list_posts` | List all posts (filter by status: all/draft/published) |
| `get_post` | Get full post including HTML content |
| `create_post` | Write and save a new post (draft or published) |
| `update_post` | Edit any field on an existing post |
| `publish_post` | Promote a draft to live |
| `delete_post` | Permanently remove a post |
| `search_images` | Get free Unsplash image URLs for a topic |
| `get_publishing_schedule` | Get a 4-week content calendar with topic ideas |

## 5. Twice-weekly publishing workflow

Tell OpenClaw:

> "Use the technest-blog MCP. Get the publishing schedule, then for each post this week:
> 1. Search for a relevant featured image using search_images
> 2. Write the full HTML content following the outline
> 3. Create the post as a draft
> 4. Publish it"

The agent will call the tools in sequence and both posts will appear live on the site.

## 6. Content format

Pass `content` as HTML. Example structure:

```html
<p>Opening hook — one strong paragraph.</p>

<h2>First Section</h2>
<p>Body text...</p>
<ul>
  <li><strong>Point 1</strong> — explanation</li>
</ul>

<h2>Second Section</h2>
<p>...</p>

<pre><code>// Code example if relevant
const example = "value"</code></pre>

<h2>Conclusion</h2>
<p>Summary + CTA linking to <a href="/services/...">relevant service</a>.</p>
```

Valid tags: `tag` in `"AI Automation" | "N8n" | "SaaS" | "Web Development" | "Automation" | "AI Strategy"`
