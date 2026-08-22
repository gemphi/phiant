"""PhiGit domain client.

Provides access to Objects, Refs, and Commits sub-clients.
"""

from __future__ import annotations

import typing
from functools import cached_property
from typing import Any, Dict, List, Optional

from phiadk._core import auth as _auth
from phiadk._core.config import Config
from phiadk.agents.phigit.engine import GitEngine


class ObjectsClient:
    """Operations over content-addressed blobs and trees."""

    def __init__(self, engine: GitEngine) -> None:
        self._engine = engine

    def store_blob(self, content: Any):
        return self._engine.store_blob(content)

    def get_blob(self, sha1: str):
        return self._engine.get_blob(sha1)

    def store_tree(self, entries):
        return self._engine.store_tree(entries)

    def get_tree(self, sha1: str):
        return self._engine.get_tree(sha1)


class RefsClient:
    """Operations over named branch and tag references."""

    def __init__(self, engine: GitEngine) -> None:
        self._engine = engine

    def set_ref(self, name: str, commit_sha1: str) -> None:
        self._engine.set_ref(name, commit_sha1)

    def get_ref(self, name: str) -> Optional[str]:
        return self._engine.get_ref(name)

    def list_refs(self) -> List[Any]:
        return self._engine.list_refs()

    list = list_refs


class CommitsClient:
    """Operations over snapshots, history log, and diffs."""

    def __init__(self, engine: GitEngine) -> None:
        self._engine = engine

    def commit(self, tree_sha1: str, **kwargs):
        return self._engine.commit(tree_sha1, **kwargs)

    def get_commit(self, sha1: str):
        return self._engine.get_commit(sha1)

    def log(self, ref: str = "refs/heads/main", max_count: int = 50):
        return self._engine.log(ref, max_count=max_count)

    def diff(self, ref_a: str, ref_b: str):
        return self._engine.diff(ref_a, ref_b)


class PhiGitClient:
    """The PhiGit Git-core storage domain client."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
        engine: typing.Optional[GitEngine] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver
        self._engine = engine or GitEngine()

    @cached_property
    def Objects(self) -> ObjectsClient:
        return ObjectsClient(self._engine)

    @cached_property
    def Refs(self) -> RefsClient:
        return RefsClient(self._engine)

    @cached_property
    def Commits(self) -> CommitsClient:
        return CommitsClient(self._engine)


class AsyncPhiGitClient:
    """Async variant of ``PhiGitClient``."""

    def __init__(
        self,
        auth: _auth.Auth,
        hostname: typing.Union[str, typing.Callable[[], str]] = "",
        config: typing.Optional[Config] = None,
        data_resolver=None,
        engine: typing.Optional[GitEngine] = None,
    ) -> None:
        self._auth = auth
        self._hostname = hostname
        self._config = config
        self._data_resolver = data_resolver
        self._engine = engine or GitEngine()

    @cached_property
    def Objects(self) -> ObjectsClient:
        return ObjectsClient(self._engine)

    @cached_property
    def Refs(self) -> RefsClient:
        return RefsClient(self._engine)

    @cached_property
    def Commits(self) -> CommitsClient:
        return CommitsClient(self._engine)
