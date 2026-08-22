"""Phient AI Ops Agent Platform - Configuration."""

from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # LLM
    anthropic_api_key: str = ""
    anthropic_model: str = "claude-sonnet-4-20250514"

    # Entra ID
    entra_tenant_id: str = ""
    entra_client_id: str = ""
    entra_client_secret: str = ""

    # Notion
    notion_api_key: str = ""

    # HiBob
    hibob_api_key: str = ""
    hibob_service_user: str = ""

    # Infrastructure
    chroma_persist_dir: str = "./data/chroma"
    audit_db_path: str = "./data/audit.db"
    log_level: str = "INFO"

    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_secret_key: str = "dev-secret-key-change-in-production"

    # Azure (optional)
    azure_ai_search_endpoint: str = ""
    azure_ai_search_key: str = ""

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}

    @property
    def data_dir(self) -> Path:
        """Return the data directory path, creating it if needed."""
        path = Path(self.chroma_persist_dir).parent
        path.mkdir(parents=True, exist_ok=True)
        return path


settings = Settings()
