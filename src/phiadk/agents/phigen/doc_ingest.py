"""PhiGen Doc Ingestion Engine - Direct 1:1 Ingestion matching exact Palantir module names."""

from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional


PALANTIR_MODULES = [
    "Admin",
    "AipAgents",
    "Audit",
    "Checkpoints",
    "Connectivity",
    "Core",
    "DataHealth",
    "Datasets",
    "Filesystem",
    "Functions",
    "Geo",
    "LanguageModels",
    "MediaSets",
    "Models",
    "Ontologies",
    "Orchestration",
    "SqlQueries",
    "Streams",
    "ThirdPartyApplications",
    "Widgets",
]


class DocIngestionEngine:
    """Ingests, translates, and synchronizes Palantir docs into Phient v2 documentation matching 1:1 names."""

    def __init__(self, repo_root: Optional[Path] = None) -> None:
        self._repo_root = repo_root or Path(__file__).resolve().parents[3]
        self._refs_dir = self._repo_root / "REFS" / "palantir" / "foundry-platform-python" / "docs" / "v2"
        self._docs_dir = self._repo_root / "docs" / "v2"

    def transform_markdown(self, text: str, module_name: str) -> str:
        """Transforms SDK client references to PhiADKClient while preserving exact Palantir APIs and names."""
        # 1. Imports and Client Instantiations
        text = re.sub(r"from foundry_sdk import FoundryClient", "from phiadk import PhiADKClient", text)
        text = re.sub(r"import foundry_sdk", "import phiadk", text)
        text = re.sub(
            r"client = FoundryClient\(auth=foundry_sdk\.UserTokenAuth\([^)]*\), hostname=\"[^\"]*\"\)",
            "client = PhiADKClient()",
            text,
        )
        text = re.sub(r"foundry_sdk\.PalantirRPCException", "Exception", text)
        text = re.sub(r"foundry_sdk\.", "phiadk.", text)
        text = re.sub(r"FoundryClient", "PhiADKClient", text)

        # 2. Navigation Links
        text = re.sub(r"\[\[Back to API list\]\]\([^)]+\)", "[[Back to API list]](../README.md)", text)
        text = re.sub(r"\[\[Back to Model list\]\]\([^)]+\)", "[[Back to Model list]](./models/README.md)", text)
        text = re.sub(r"\[\[Back to README\]\]\([^)]+\)", "[[Back to README]](../../README.md)", text)

        return text

    def ingest_all(self) -> Dict[str, Any]:
        """Ingests all 20 modules and their models directly into docs/v2/ matching exact Palantir names."""
        if not self._refs_dir.exists():
            raise FileNotFoundError(f"Reference documentation not found at {self._refs_dir}")

        self._docs_dir.mkdir(parents=True, exist_ok=True)
        stats = {
            "modules_processed": 0,
            "root_docs_written": 0,
            "model_docs_written": 0,
            "modules": {},
        }

        for mod_name in PALANTIR_MODULES:
            ref_module_dir = self._refs_dir / mod_name
            if not ref_module_dir.exists():
                continue

            target_module_dir = self._docs_dir / mod_name
            target_models_dir = target_module_dir / "models"

            target_module_dir.mkdir(parents=True, exist_ok=True)
            target_models_dir.mkdir(parents=True, exist_ok=True)

            mod_stats = {"root_docs": 0, "models": 0}

            # 1. Process root markdown docs
            ref_root_files = list(ref_module_dir.glob("*.md"))
            for ref_file in ref_root_files:
                target_file = target_module_dir / ref_file.name
                with open(ref_file, "r", encoding="utf-8", errors="replace") as f:
                    raw_content = f.read()

                converted = self.transform_markdown(raw_content, mod_name)
                with open(target_file, "w", encoding="utf-8") as f:
                    f.write(converted)

                mod_stats["root_docs"] += 1
                stats["root_docs_written"] += 1

            # If module has no root files in REFS (e.g. Core, Geo), create Overview doc
            if len(ref_root_files) == 0:
                overview_file = target_module_dir / f"{mod_name}.md"
                overview_content = f"""# {mod_name}

Phient platform `{mod_name}` documentation and schemas.

## Models
All schema definitions and data models for `{mod_name}` are available in [`./models/`](./models/README.md).

### Example
```python
from phiadk import PhiADKClient

client = PhiADKClient()
```
"""
                with open(overview_file, "w", encoding="utf-8") as f:
                    f.write(overview_content)
                mod_stats["root_docs"] += 1
                stats["root_docs_written"] += 1

            # 2. Process models/ directory
            ref_models_dir = ref_module_dir / "models"
            if ref_models_dir.exists() and ref_models_dir.is_dir():
                ref_model_files = list(ref_models_dir.glob("*.md"))
                for ref_model_file in ref_model_files:
                    target_model_file = target_models_dir / ref_model_file.name
                    with open(ref_model_file, "r", encoding="utf-8", errors="replace") as f:
                        raw_content = f.read()

                    converted = self.transform_markdown(raw_content, mod_name)
                    with open(target_model_file, "w", encoding="utf-8") as f:
                        f.write(converted)

                    mod_stats["models"] += 1
                    stats["model_docs_written"] += 1

                # Write models/README.md
                models_readme = target_models_dir / "README.md"
                model_names = [f.stem for f in sorted(ref_model_files) if f.name != "README.md"]
                models_readme_content = f"""# {mod_name} Models & Schemas

Total Models: **{len(model_names)}**

| Model | Schema Description |
| :--- | :--- |
"""
                for mname in model_names:
                    models_readme_content += f"| [`{mname}`](./{mname}.md) | Schema definition for `{mname}`. |\n"

                with open(models_readme, "w", encoding="utf-8") as f:
                    f.write(models_readme_content)

            stats["modules_processed"] += 1
            stats["modules"][mod_name] = mod_stats

        return stats
