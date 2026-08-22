# POntology: POntologyEngine & Simplicial Complex (v2)

The **POntologyEngine** is the central simplicial registry managing vertices (Object Types), edges (Link Types), and morphisms (Action Types) across all enterprise domains.

## 1. Simplicial Complex Schema

```python
from phiegg.ontologies import POntologyEngine, ObjectType, LinkType, ActionType


engine = POntologyEngine()

# Introspect schema
schema = engine.to_dict()

# Export Mermaid simplicial complex diagram
mermaid_code = engine.to_mermaid()
print(mermaid_code)
```

## 2. Mermaid Diagram Example

```mermaid
graph TD
    Employee["Employee (0-simplex)"] -->|employee_identity| UserIdentity["UserIdentity (0-simplex)"]
    Employee -->|author_documents| DocumentPage["DocumentPage (0-simplex)"]
    Employee -->|commit_author| GitCommit["GitCommit (0-simplex)"]
    
    Action_create_employee["Morphism: create_employee"] -.-> Employee
    Action_link_identity["Morphism: link_identity"] -.-> UserIdentity
```
