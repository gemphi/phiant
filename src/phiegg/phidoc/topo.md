# PhiDoc: Documentation & Workspace Knowledge Ontologylogy

PhiDoc maintains the hierarchical documentation topology connecting Notion workspaces, Markdown repositories, and agent `.mdx` architecture cards for automated web documentation rendering.

## 1. Documentation Space Ontologylogy

```mermaid
graph TD
    subgraph DocSpace["Documentation Space (Tree Simplex)"]
        Root["Root Workspace"]
        Handbooks["Engineering Handbook"]
        Runbooks["Operations Runbooks"]
        AgentDocs["Agent Ontologylogy (.mdx)"]
    end

    Root --> Handbooks
    Root --> Runbooks
    Root --> AgentDocs

    AgentDocs -->|Morphism: sync_knowledge_base| KnowledgeSpace["Knowledge Space (PhiRAG/PhiOra)"]
    DocSpace -->|Browser Render Morphism| DocSite["PhiDoc Browser Documentation Explorer"]
```

### Document Tree
```
[ Workspace Root ]
       │
       ├─► [ Engineering Handbook ]
       ├─► [ Operations Runbooks ]
       └─► [ Agent Ontologylogy Hub ]
                 ├─► phione/topo.md
                 ├─► phical/topo.md
                 ├─► phigit/topo.md
                 └─► phimen/topo.md
```

## 2. Dynamic MDX Auto-Presentation Flow

```mermaid
sequenceDiagram
    autonumber
    actor Browser
    participant PhiDoc as PhiDocAgent / Browser Server
    participant AgentPackages as Agent `topo.md` / `topology.mdx` Files
    participant Knowledge as Knowledge Base

    Browser->>PhiDoc: GET /docs/agents/phical
    PhiDoc->>AgentPackages: Read phical/topo.md
    PhiDoc->>PhiDoc: Parse frontmatter, Mermaid, and JSX badges
    PhiDoc-->>Browser: Render Interactive Palantir-Style Ontologylogy Card
```

## 3. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: `phiora` (Document datasets), `phigit` (Doc history)
- **Feeds into**: `phirag` (Knowledge chunking), `topos` (Auto-documentation presentation)
