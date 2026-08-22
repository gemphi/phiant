# PhiGen Specification

## Claims
1. **PHIGEN_CODEGEN_SPEC**:
   - MUST inspect 0-simplex schemas registered in `GLOBAL_TOPOS` or custom `POntologyEngine`.
   - MUST map primitive data types (`string`, `integer`, `float`, `boolean`, `timestamp`, `vector`) into native Python typing annotations.
   - MUST provide `.to_dict()` and `.from_topos_object()` helper methods on generated dataclasses.

2. **PHIGEN_PARITY_SPEC**:
   - MUST inspect documentation files in `docs/v2/POntology/` against `REFS/palantir/foundry-platform-python/docs/v2/Ontologies/`.
   - MUST verify that all domain agents contain valid `schema.json` with `spec_idx`, `tasks`, and `verbs`.
