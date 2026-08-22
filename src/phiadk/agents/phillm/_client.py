"""PhiLLM Language Models domain client.

Follows Palantir's ``foundry_sdk.v2.language_models._client`` pattern.
"""

from __future__ import annotations

import typing
from functools import cached_property

from phiadk._core import auth as _auth
from phiadk._core.config import Config


class PhiLLMClient:
    """The PhiLLM Language Models domain client.

    :param auth: Authentication provider.
    :param hostname: Target API hostname.
    :param config: Optional SDK configuration.
    """

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def OpenAi(self):
        """OpenAI-compatible language models endpoint."""
        from phiadk.agents.phillm.open_ai_model import OpenAiModelClient
        return OpenAiModelClient(auth=self._auth, hostname=str(self._hostname), config=self._config)


class AsyncPhiLLMClient:
    """Async variant of ``PhiLLMClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver

    @cached_property
    def OpenAi(self):
        from phiadk.agents.phillm.open_ai_model import AsyncOpenAiModelClient
        return AsyncOpenAiModelClient(auth=self._auth, hostname=str(self._hostname), config=self._config)


PhiLlmClient = PhiLLMClient
AsyncPhiLlmClient = AsyncPhiLLMClient

