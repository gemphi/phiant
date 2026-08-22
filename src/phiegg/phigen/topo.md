# PhiGen Ontologylogical Architecture

PhiGen operates at the **Engine Layer**, functioning as a functor from the Category of POntology Simplicial Complexes ($\mathbf{POntology}$) to the Category of Strongly-Typed Programming Objects ($\mathbf{Types}$).

```mermaid
graph LR
  POntology["POntology Complex (0-Simplices)"] -->|Functor T| PhiGen["PhiGen Synthesis"]
  PhiGen -->|Generates| TypedPython["Typed Python Dataclasses"]
```
