"""Microsoft Entra ID Connector - MS Graph API integration.

Provides authenticated access to Microsoft Entra ID (Azure AD) for user
lifecycle management, group operations, and license assignment.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

import httpx

from ..config import settings

logger = logging.getLogger(__name__)


@dataclass
class EntraUser:
    """User profile from Entra ID."""

    id: str
    display_name: str
    email: str
    user_principal_name: str
    job_title: str = ""
    department: str = ""
    office_location: str = ""
    account_enabled: bool = True


class EntraConnector:
    """Microsoft Entra ID connector via MS Graph API.

    Handles OAuth 2.0 client credentials flow authentication and provides
    methods for user, group, and license management operations.
    """

    GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0"
    TOKEN_URL = "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"

    def __init__(self) -> None:
        self._token: str | None = None
        self._client = httpx.AsyncClient(timeout=30.0)

    async def authenticate(self) -> str:
        """Obtain access token via client credentials flow."""
        if not settings.entra_tenant_id:
            raise ValueError("ENTRA_TENANT_ID not configured")

        url = self.TOKEN_URL.format(tenant=settings.entra_tenant_id)
        data = {
            "client_id": settings.entra_client_id,
            "client_secret": settings.entra_client_secret,
            "scope": "https://graph.microsoft.com/.default",
            "grant_type": "client_credentials",
        }

        response = await self._client.post(url, data=data)
        response.raise_for_status()
        self._token = response.json()["access_token"]
        logger.info("Entra ID authentication successful")
        return self._token

    @property
    def _headers(self) -> dict[str, str]:
        """Build authorization headers."""
        return {
            "Authorization": f"Bearer {self._token}",
            "Content-Type": "application/json",
        }

    async def get_user(self, email_or_upn: str) -> dict[str, Any]:
        """Get user profile from Entra ID.

        Args:
            email_or_upn: User email or UPN.

        Returns:
            User profile dictionary.
        """
        if not self._token:
            await self.authenticate()

        url = f"{self.GRAPH_BASE_URL}/users/{email_or_upn}"
        params = {"$select": "id,displayName,mail,userPrincipalName,jobTitle,department,officeLocation,accountEnabled"}

        response = await self._client.get(url, headers=self._headers, params=params)
        response.raise_for_status()
        data = response.json()

        return {
            "id": data.get("id", ""),
            "display_name": data.get("displayName", ""),
            "email": data.get("mail", ""),
            "user_principal_name": data.get("userPrincipalName", ""),
            "job_title": data.get("jobTitle", ""),
            "department": data.get("department", ""),
            "office_location": data.get("officeLocation", ""),
            "account_enabled": data.get("accountEnabled", True),
        }

    async def list_user_groups(self, user_id: str) -> list[dict[str, Any]]:
        """List groups for a user."""
        if not self._token:
            await self.authenticate()

        url = f"{self.GRAPH_BASE_URL}/users/{user_id}/memberOf"
        response = await self._client.get(url, headers=self._headers)
        response.raise_for_status()

        groups = []
        for item in response.json().get("value", []):
            if item.get("@odata.type") == "#microsoft.graph.group":
                groups.append({
                    "id": item["id"],
                    "display_name": item.get("displayName", ""),
                    "description": item.get("description", ""),
                })
        return groups

    async def create_user(self, user_data: dict[str, Any]) -> dict[str, Any]:
        """Create a new user in Entra ID."""
        if not self._token:
            await self.authenticate()

        url = f"{self.GRAPH_BASE_URL}/users"
        payload = {
            "accountEnabled": True,
            "displayName": user_data["display_name"],
            "mailNickname": user_data.get("mail_nickname", user_data["display_name"].replace(" ", ".")),
            "userPrincipalName": user_data["email"],
            "passwordProfile": {
                "forceChangePasswordNextSignIn": True,
                "password": user_data.get("temp_password", "TempP@ss123!"),
            },
            "jobTitle": user_data.get("job_title", ""),
            "department": user_data.get("department", ""),
            "officeLocation": user_data.get("office_location", ""),
        }

        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()
        return response.json()

    async def add_to_group(self, group_id: str, user_id: str) -> None:
        """Add a user to a group."""
        if not self._token:
            await self.authenticate()

        url = f"{self.GRAPH_BASE_URL}/groups/{group_id}/members/$ref"
        payload = {
            "@odata.id": f"{self.GRAPH_BASE_URL}/directoryObjects/{user_id}"
        }

        response = await self._client.post(url, headers=self._headers, json=payload)
        response.raise_for_status()

    async def health_check(self) -> bool:
        """Check if Entra ID / MS Graph is reachable."""
        try:
            if not self._token:
                await self.authenticate()
            url = f"{self.GRAPH_BASE_URL}/organization"
            response = await self._client.get(url, headers=self._headers)
            return response.status_code == 200
        except Exception:
            return False

    async def close(self) -> None:
        """Close the HTTP client."""
        await self._client.aclose()
