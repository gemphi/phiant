"""HiBob Connector - HiBob HRIS API integration."""

from __future__ import annotations

import base64
import logging
from typing import Any

import httpx

from ..config import settings

logger = logging.getLogger(__name__)


class HiBobConnector:
    """HiBob HRIS connector for employee data operations.

    Provides access to employee profiles, leave management,
    organisational structure, and headcount data.
    """

    BASE_URL = "https://api.hibob.com/v1"

    def __init__(self) -> None:
        self._client = httpx.AsyncClient(timeout=30.0)

    @property
    def _headers(self) -> dict[str, str]:
        credentials = f"{settings.hibob_service_user}:{settings.hibob_api_key}"
        encoded = base64.b64encode(credentials.encode()).decode()
        return {
            "Authorization": f"Basic {encoded}",
            "Content-Type": "application/json",
        }

    async def get_employee(self, employee_id: str) -> dict[str, Any]:
        """Get employee profile by ID."""
        url = f"{self.BASE_URL}/people/{employee_id}"
        response = await self._client.get(url, headers=self._headers)
        response.raise_for_status()
        return response.json()

    async def search_employees(self, filters: dict[str, Any] | None = None) -> list[dict[str, Any]]:
        """Search employees with filters."""
        url = f"{self.BASE_URL}/people/search"
        payload = {"filters": filters or []}
        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()
        return response.json().get("employees", [])

    async def get_leave_balance(self, employee_id: str) -> list[dict[str, Any]]:
        """Get leave balance for an employee."""
        url = f"{self.BASE_URL}/timeoff/employees/{employee_id}/balance"
        response = await self._client.get(url, headers=self._headers)
        response.raise_for_status()
        return response.json().get("balances", [])

    async def health_check(self) -> bool:
        """Check if HiBob API is reachable."""
        try:
            url = f"{self.BASE_URL}/company/named-lists"
            response = await self._client.get(url, headers=self._headers)
            return response.status_code == 200
        except Exception:
            return False

    async def close(self) -> None:
        """Close the HTTP client."""
        await self._client.aclose()
