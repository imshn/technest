---
name: Explore Codebase
description: Navigate and understand codebase structure using Graphify
---

## Explore Codebase

Use Graphify to explore and understand the codebase structure.

### Common Graphify Commands

1. `graphify query "your question here"` - Natural language search of the knowledge graph
2. `graphify explain "filename.ts"` - Get a plain-language explanation of a file/function
3. `graphify path "file1.ts" "file2.ts"` - Find the shortest path between two nodes
4. `graphify watch .` - Watch for changes and auto-update the graph

### Workflow

1. Start with `graphify query` for high-level questions about the codebase
2. Use `graphify explain` to understand specific components
3. Use `graphify path` to trace relationships between modules
4. Check `GRAPH_REPORT.md` for communities and architecture overview

### Output Files

- `graphify-out/graph.json` - The semantic knowledge graph
- `graphify-out/GRAPH_REPORT.md` - Community detection and analysis

## Tips

- Use natural language queries - Graphify understands conversational questions
- Check the GRAPH_REPORT.md for high-level architecture and communities
- Run `graphify watch .` in development to keep the graph current
