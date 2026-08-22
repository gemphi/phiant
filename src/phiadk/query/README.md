# Multi-Dialect Query Engine (`src/phiadk/query/`)

> _Multi-Language Unified Query Runtime: RQL, OQL, QML, VQL & ORM._

---

## 1. Supported Query Dialects

The `phiadk.query` runtime provides unified query builders across four distinct computational models:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#334155', 'lineColor': '#94a3b8', 'textColor': '#f1f5f9'}}}%%
graph TD
    subgraph "Query Runtime (QueryEngine)"
        RQL["RQL: Relational SQL Engine (SELECT, JOIN, WHERE)"]
        OQL["OQL: Ontological Graph Traversal Engine (MATCH, LINK)"]
        QML["QML: Quantum Model Language (CIRCUITS, MEASURE)"]
        VQL["VQL: Vector & Spatial Distance Query (k-NN, COSINE)"]
    end

    subgraph "Target Substrates"
        Onto["POntologyEngine (0/1-Simplices)"]
        Spatial["PhiOraDB (Spatial Store)"]
        CAS["PhiGit (Content-Addressed CAS)"]
    end

    RQL & OQL --> Onto
    VQL & QML --> Spatial & CAS
```

---

## 2. Dialect Overview

| Dialect | Class | Target Paradigm | Example Usage |
|:---|:---|:---|:---|
| **RQL** | `RQLQueryBuilder` | Relational SQL queries | `RQL.select("name", "title").from_table("employees").where("dept", "=", "Engineering")` |
| **OQL** | `OQLQueryBuilder` | Category-theoretic ontology graph traversals | `OQL.match("Employee").traverse("employee_identity").where("status", "ACTIVE")` |
| **QML** | `QMLQueryBuilder` | Quantum circuits & state vector transformations | `QML.from_space("quantum_space").hadamard(0).measure()` |
| **VQL** | `VQLQueryBuilder` | Spatial & vector similarity search | `VQL.nearest(coords=[10.0, 20.0, 5.0], k=5)` |

---

## 3. Usage Example

```python
from phiadk.query.rql import RQL
from phiadk.query.oql import OQL

# 1. Build an RQL Relational Query
query = RQL.select("display_name", "title").from_table("Employee").where("department", "=", "Engineering")
sql_str = query.to_sql()
print("Generated SQL:", sql_str)

# 2. Build an OQL Ontological Traversal
traversal = OQL.match("Employee").traverse("employee_identity")
print("OQL AST:", traversal.to_ast())
```
