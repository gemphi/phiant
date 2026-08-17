"""Phiant Platform Utilities."""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


def load_json_data(file_name: str, default: Any = None) -> Any:
    """Load JSON data from the project data directory.

    Args:
        file_name: Name of the JSON file in data/ directory.
        default: Fallback return value if file does not exist.

    Returns:
        Parsed JSON object or default.
    """
    data_dir = Path(__file__).parent.parent / "data"
    path = data_dir / file_name
    if path.exists():
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as exc:
            logger.warning("Error loading JSON data from %s: %s", path, exc)
    return default if default is not None else []


def format_key_value_lines(header: str, data: dict[str, Any], indent: int = 2) -> str:
    """Format a dictionary into readable key-value display lines.

    Args:
        header: Title header text.
        data: Dictionary of key-value pairs.
        indent: Indentation level.

    Returns:
        Formatted multi-line string.
    """
    prefix = " " * indent
    lines = [header]
    for key, value in data.items():
        label = key.replace("_", " ").title()
        if isinstance(value, list):
            lines.append(f"{prefix}{label}: {', '.join(map(str, value))}")
        else:
            lines.append(f"{prefix}{label}: {value}")
    return "\n".join(lines)
