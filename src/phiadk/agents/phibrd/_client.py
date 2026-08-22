"""PhiBrd domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiBrdClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def Onboarding(self):
        from phiadk.agents.phibrd.onboarding import OnboardingClient
        return OnboardingClient()


class AsyncPhiBrdClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def Onboarding(self):
        from phiadk.agents.phibrd.onboarding import OnboardingClient
        return OnboardingClient()
