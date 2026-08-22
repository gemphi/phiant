"""Agent Generator & Scaffolding Engine using File Templates with Replaceables.

Allows generating complete, fully typed, schema-driven domain agents
from template directory structures with custom versioning, verbs, tasks,
specs (spec_idx + version), and MDX topology cards.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional


def scaffold_agent(
    agent_id: str,
    agent_name: Optional[str] = None,
    domain: str = "custom",
    layer: str = "application",
    version: str = "1.0.0",
    description: str = "Custom generated domain agent.",
    verbs: Optional[List[str]] = None,
    tasks: Optional[List[str]] = None,
    specs: Optional[List[str]] = None,
    target_dir: Optional[Path] = None,
    templates_dir: Optional[Path] = None,
) -> Dict[str, Any]:
    """Scaffold a new domain agent package from template directory with replaceables."""
    agent_id = agent_id.lower().strip()
    if not agent_id.startswith("phi"):
        agent_id = f"phi{agent_id}"

    agent_name = agent_name or agent_id.capitalize()
    verbs = verbs or ["execute_action", "get_status"]
    tasks = tasks or ["main_operations"]
    specs = specs or [f"{agent_id.upper()}_STANDARD_SPEC"]

    if target_dir is None:
        target_dir = Path(__file__).resolve().parents[1] / agent_id

    if templates_dir is None:
        templates_dir = Path(__file__).resolve().parent / "templates" / "agent"

    target_dir.mkdir(parents=True, exist_ok=True)

    class_name = f"{agent_name}Agent"
    client_name = f"{agent_name}Client"
    async_client_name = f"Async{agent_name}Client"
    card_name = f"{agent_id.upper()}_CARD"

    # Compute formatted structures
    verb_enums = "\n    ".join(f"{v.upper()} = \"{v.lower()}\"" for v in verbs)
    task_enums = "\n    ".join(f"{t.upper()} = \"{t.lower()}\"" for t in tasks)
    
    spec_items = []
    spec_enum_lines = []
    for s in specs:
        spec_idx = s.rsplit("_V", 1)[0] if ("_V1" in s or "_V2" in s) else s
        spec_items.append({
            "spec_idx": spec_idx,
            "spec_id": spec_idx,
            "version": version,
            "description": f"Specification claim {spec_idx}",
        })
        spec_enum_lines.append(f"{spec_idx.upper()} = \"{spec_idx}\"")
    spec_enums = "\n    ".join(spec_enum_lines)

    task_items = [{"task_id": t, "name": t.replace("_", " ").title(), "description": f"Task chapter {t}"} for t in tasks]
    verb_items = [{"verb_id": v, "name": v.replace("_", " ").title(), "description": f"Verb action {v}"} for v in verbs]

    verbs_list_md = "\n".join(f"- `{v}`" for v in verbs)
    tasks_table_md = "| Task ID | Verbs |\n| :--- | :--- |\n" + "\n".join(
        f"| `{t}` | `{', '.join(verbs)}` |" for t in tasks
    )

    primary_spec_idx = spec_items[0]["spec_idx"] if spec_items else f"{agent_id.upper()}_STANDARD_SPEC"

    # Replaceables mapping dictionary
    replacements: Dict[str, str] = {
        "{{agent_id}}": agent_id,
        "{{agent_name}}": agent_name,
        "{{class_name}}": class_name,
        "{{client_name}}": client_name,
        "{{async_client_name}}": async_client_name,
        "{{card_name}}": card_name,
        "{{domain}}": domain,
        "{{layer}}": layer.lower(),
        "{{layer_upper}}": layer.upper(),
        "{{version}}": version,
        "{{description}}": description,
        "{{first_verb}}": verbs[0],
        "{{spec_idx}}": primary_spec_idx,
        "{{verb_enums}}": verb_enums,
        "{{task_enums}}": task_enums,
        "{{spec_enums}}": spec_enums,
        "{{specs_json}}": json.dumps(spec_items, indent=4),
        "{{tasks_json}}": json.dumps(task_items, indent=4),
        "{{verbs_json}}": json.dumps(verb_items, indent=4),
        "{{verbs_list_md}}": verbs_list_md,
        "{{tasks_table_md}}": tasks_table_md,
    }

    files_created = 0

    # Walk template directory and render each template file
    if templates_dir.exists():
        for tpl_path in templates_dir.rglob("*"):
            if tpl_path.is_file():
                rel_path = tpl_path.relative_to(templates_dir)
                rel_path_str = str(rel_path)
                
                # Apply replacements to path name
                for key, val in replacements.items():
                    rel_path_str = rel_path_str.replace(key, val)
                
                # Strip .tpl suffix
                if rel_path_str.endswith(".tpl"):
                    rel_path_str = rel_path_str[:-4]
                
                dest_file = target_dir / rel_path_str
                dest_file.parent.mkdir(parents=True, exist_ok=True)

                with open(tpl_path, "r", encoding="utf-8") as f:
                    content = f.read()

                for key, val in replacements.items():
                    content = content.replace(key, val)

                with open(dest_file, "w", encoding="utf-8") as f:
                    f.write(content)

                files_created += 1

    return {
        "agent_id": agent_id,
        "agent_name": agent_name,
        "version": version,
        "directory": str(target_dir),
        "files_created": files_created,
        "template_dir": str(templates_dir),
    }
