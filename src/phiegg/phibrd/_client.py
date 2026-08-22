"""PhiBrd domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiegg._core import auth as _auth
from phiegg._core.config import Config


class PhiBrdClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def Onboarding(self):
        from phiegg.phibrd.onboarding import OnboardingClient
        return OnboardingClient()


class AsyncPhiBrdClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config

    @cached_property
    def Onboarding(self):
        from phiegg.phibrd.onboarding import OnboardingClient
        return OnboardingClient()
