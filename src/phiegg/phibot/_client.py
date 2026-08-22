"""PhiBot domain client."""

from __future__ import annotations

import typing
from functools import cached_property

from phiegg._core import auth as _auth
from phiegg._core.config import Config


class PhiBotClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Playbook(self):
        from phiegg.phibot.playbook import PlaybookClient
        return PlaybookClient(data_resolver=self._data_resolver)


class AsyncPhiBotClient:
    def __init__(self, auth: _auth.Auth, hostname="", config=None, data_resolver=None) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def Playbook(self):
        from phiegg.phibot.playbook import PlaybookClient
        return PlaybookClient(data_resolver=self._data_resolver)
