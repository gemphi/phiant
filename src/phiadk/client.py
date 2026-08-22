"""Phient / PhiADK Client — Unified Master SDK Entrypoint.

Structured consistently after Palantir Foundry SDK (`FoundryClient` / `AsyncFoundryClient`),
exposing all 15 canonical domain agents, Palantir 20 namespaces, POntologyEngine,
PhiBus event stream, and PhiOraDB Spatial Store.
"""

from __future__ import annotations

import typing
from pathlib import Path

from phiadk._core.auth import Auth
from phiadk._core.config import Config


def _default_data_dir() -> Path:
    """Resolve the default data directory (phient/data)."""
    return Path(__file__).resolve().parents[2] / "data"


class PhiClient:
    """The master Phient SDK client (Palantir Foundry-symmetrical).

    :param auth: Required. Authentication provider (e.g. EnvAuth, TokenAuth, ApiKeyAuth).
    :param hostname: Target API hostname.
    :param config: Optionally configure HTTP session behaviour.
    :param data_dir: Path to data directory for dataset resolution.
    """

    def __init__(
        self,
        auth: typing.Optional[Auth] = None,
        hostname: typing.Optional[str] = None,
        config: typing.Optional[Config] = None,
        data_dir: typing.Optional[typing.Union[str, Path]] = None,
    ) -> None:
        if auth is None:
            from phiadk._core.auth import EnvAuth
            auth = EnvAuth()

        self._auth = auth
        self._hostname = hostname or ""
        self._config = config
        self._data_dir = Path(data_dir) if data_dir else _default_data_dir()

        # Shared Git engine and structured logger
        from phiadk.agents.phigit.engine import GitEngine
        from phiadk.agents.philog.logger import StructuredLogger

        self._git_engine = GitEngine()
        self._logger = StructuredLogger()

        # Storage & Telemetry Subclients
        from phiadk.agents.phiora._client import PhiOraClient
        from phiadk.agents.phigit._client import PhiGitClient
        from phiadk.agents.philog._client import PhiLogClient

        self.phigit = PhiGitClient(auth=auth, hostname=self._hostname, config=config, engine=self._git_engine)
        self.philog = PhiLogClient(auth=auth, hostname=self._hostname, config=config, logger=self._logger)
        self.phiora = PhiOraClient(auth=auth, hostname=self._hostname, config=config, data_dir=self._data_dir)
        self._resolver = self.phiora.Resolver

        # Domain Agent Subclients (15 Canonical Agents)
        from phiadk.agents.phione._client import PhiOneClient
        from phiadk.agents.phical._client import PhiCalClient
        from phiadk.agents.phirag._client import PhiRAGClient
        from phiadk.agents.phidoc._client import PhiDocClient
        from phiadk.agents.phibot._client import PhiBotClient
        from phiadk.agents.phibrd._client import PhiBrdClient
        from phiadk.agents.phillm._client import PhiLLMClient
        from phiadk.agents.phimen._client import PhiMenClient
        from phiadk.agents.phisec._client import PhiSecClient
        from phiadk.agents.phigov._client import PhiGovClient
        from phiadk.agents.phibus._client import PhiBusClient
        from phiadk.agents.phigen._client import PhiGenClient
        from phiadk.ontologies._client import OntologyClient

        self.phione = PhiOneClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phical = PhiCalClient(auth=auth, hostname=self._hostname, config=config)
        self.phirag = PhiRAGClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phidoc = PhiDocClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phibot = PhiBotClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phibrd = PhiBrdClient(auth=auth, hostname=self._hostname, config=config)
        self.phillm = PhiLLMClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phisec = PhiSecClient(auth=auth, hostname=self._hostname, config=config)
        self.phigov = PhiGovClient(auth=auth, hostname=self._hostname, config=config)
        self.phibus = PhiBusClient(auth=auth, hostname=self._hostname, config=config)
        self.phigen = PhiGenClient(auth=auth, hostname=self._hostname, config=config)
        self.ontology = OntologyClient(auth=auth, hostname=self._hostname, config=config)
        self.ontologies = self.ontology

        self.phimen = PhiMenClient(
            auth=auth,
            hostname=self._hostname,
            config=config,
            domain_clients={
                "phione": self.phione, "phical": self.phical,
                "phirag": self.phirag, "phidoc": self.phidoc,
                "phibot": self.phibot, "phibrd": self.phibrd,
                "phiora": self.phiora, "phigit": self.phigit,
                "philog": self.philog, "phillm": self.phillm,
                "phisec": self.phisec, "phigov": self.phigov,
                "phibus": self.phibus, "phigen": self.phigen,
            },
            data_resolver=self._resolver,
        )

        # Domain Agent Executable Instances (15 Domain Agents)
        from phiadk.agents.phione.agent import PhiOneAgent
        from phiadk.agents.phical.agent import PhiCalAgent
        from phiadk.agents.phirag.agent import PhiRAGAgent
        from phiadk.agents.phidoc.agent import PhiDocAgent
        from phiadk.agents.phibot.agent import PhiBotAgent
        from phiadk.agents.phibrd.agent import PhiBrdAgent
        from phiadk.agents.phiora.agent import PhiOraAgent
        from phiadk.agents.phigit.agent import PhiGitAgent
        from phiadk.agents.philog.agent import PhiLogAgent
        from phiadk.agents.phillm.agent import PhiLLMAgent
        from phiadk.agents.phisec.agent import PhiSecAgent
        from phiadk.agents.phigov.agent import PhiGovAgent
        from phiadk.agents.phibus.agent import PhiBusAgent
        from phiadk.agents.phimen.executive import PhiMenAgent
        from phiadk.agents.phigen.agent import PhiGenAgent

        self.agents = {
            "phione": PhiOneAgent(data_resolver=self._resolver),
            "phical": PhiCalAgent(data_resolver=self._resolver),
            "phirag": PhiRAGAgent(data_resolver=self._resolver),
            "phidoc": PhiDocAgent(data_resolver=self._resolver),
            "phibot": PhiBotAgent(data_resolver=self._resolver),
            "phibrd": PhiBrdAgent(data_resolver=self._resolver),
            "phiora": PhiOraAgent(data_dir=self._data_dir, data_resolver=self._resolver),
            "phigit": PhiGitAgent(engine=self._git_engine),
            "philog": PhiLogAgent(logger=self._logger),
            "phillm": PhiLLMAgent(data_resolver=self._resolver),
            "phisec": PhiSecAgent(),
            "phigov": PhiGovAgent(),
            "phibus": PhiBusAgent(),
            "phimen": PhiMenAgent(domain_clients=self.phimen._domain_clients, data_resolver=self._resolver),
            "phigen": PhiGenAgent(),
        }

        # Palantir 20 Namespace Routing (1:1 Symmetrical)
        self.admin = self.phione
        self.aip_agents = self.phimen
        self.audit = self.philog
        self.checkpoints = self.phigov
        self.connectivity = self.phibus
        self.core = self.ontology
        self.data_health = self.phisec
        self.datasets = self.phiora
        self.filesystem = self.phigit
        self.functions = self.phical
        self.geo = self.phical
        self.language_models = self.phillm
        self.media_sets = self.phirag
        self.models = self.phigen
        self.orchestration = self.phibot
        self.sql_queries = self.rql
        self.streams = self.phibus
        self.third_party_applications = self.phibrd
        self.widgets = self.ontology

        # API Version Namespaces
        self.v1 = V1Namespace(self)
        self.v2 = V2Namespace(self)

    # ── Query Engine Accessors ───────────────────────────────────────

    def vql(self, space: str = "default"):
        """Spawn a Vector Query Language builder."""
        from phiadk.query.vql import VQL
        return VQL.from_space(space, vector_client=self.phiora.Vector)

    def rql(self, table: str):
        """Spawn a Relational Query Language builder."""
        from phiadk.query.rql import RQL
        return RQL.from_table(table, store_client=self.phiora.Store)

    def oql(self, node_id: str):
        """Spawn an Ontological Graph Query Language builder."""
        from phiadk.query.oql import OQL
        return OQL.from_node(node_id)

    def qml(self, space_name: str = "quantum_space"):
        """Spawn a Quantum Model Language builder."""
        from phiadk.query.qml import QML
        return QML.from_space(space_name)


class AsyncPhiClient:
    """Async variant of ``PhiClient``."""

    def __init__(
        self,
        auth: typing.Optional[Auth] = None,
        hostname: typing.Optional[str] = None,
        config: typing.Optional[Config] = None,
        data_dir: typing.Optional[typing.Union[str, Path]] = None,
    ) -> None:
        if auth is None:
            from phiadk._core.auth import EnvAuth
            auth = EnvAuth()

        self._auth = auth
        self._hostname = hostname or ""
        self._config = config
        self._data_dir = Path(data_dir) if data_dir else _default_data_dir()

        from phiadk.agents.phigit.engine import GitEngine
        from phiadk.agents.philog.logger import StructuredLogger

        self._git_engine = GitEngine()
        self._logger = StructuredLogger()

        from phiadk.agents.phiora._client import AsyncPhiOraClient
        from phiadk.agents.phigit._client import AsyncPhiGitClient
        from phiadk.agents.philog._client import AsyncPhiLogClient

        self.phigit = AsyncPhiGitClient(auth=auth, hostname=self._hostname, config=config, engine=self._git_engine)
        self.philog = AsyncPhiLogClient(auth=auth, hostname=self._hostname, config=config, logger=self._logger)
        self.phiora = AsyncPhiOraClient(auth=auth, hostname=self._hostname, config=config, data_dir=self._data_dir)
        self._resolver = self.phiora.Resolver

        from phiadk.agents.phione._client import AsyncPhiOneClient
        from phiadk.agents.phical._client import AsyncPhiCalClient
        from phiadk.agents.phirag._client import AsyncPhiRAGClient
        from phiadk.agents.phidoc._client import AsyncPhiDocClient
        from phiadk.agents.phibot._client import AsyncPhiBotClient
        from phiadk.agents.phibrd._client import AsyncPhiBrdClient
        from phiadk.agents.phillm._client import AsyncPhiLLMClient
        from phiadk.agents.phimen._client import AsyncPhiMenClient

        self.phione = AsyncPhiOneClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phical = AsyncPhiCalClient(auth=auth, hostname=self._hostname, config=config)
        self.phirag = AsyncPhiRAGClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phidoc = AsyncPhiDocClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phibot = AsyncPhiBotClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phibrd = AsyncPhiBrdClient(auth=auth, hostname=self._hostname, config=config)
        self.phillm = AsyncPhiLLMClient(auth=auth, hostname=self._hostname, config=config, data_resolver=self._resolver)
        self.phimen = AsyncPhiMenClient(
            auth=auth, hostname=self._hostname, config=config,
            domain_clients={
                "phione": self.phione, "phical": self.phical,
                "phirag": self.phirag, "phidoc": self.phidoc,
                "phibot": self.phibot, "phibrd": self.phibrd,
                "phiora": self.phiora, "phigit": self.phigit,
                "philog": self.philog, "phillm": self.phillm,
            },
            data_resolver=self._resolver,
        )

    def vql(self, space: str = "default_space"):
        from phiadk.query.vql import VQL
        return VQL.from_space(space, store_client=self.phiora.Store)

    def rql(self, table: str):
        from phiadk.query.rql import RQL
        return RQL.from_table(table, store_client=self.phiora.Store)

    def oql(self, node_id: str):
        from phiadk.query.oql import OQL
        return OQL.from_node(node_id)

    def qml(self, space_name: str = "quantum_space"):
        from phiadk.query.qml import QML
        return QML.from_space(space_name)


class V1Namespace:
    """Phient v1 API Namespace (Default stable core)."""

    def __init__(self, client: PhiClient) -> None:
        self._client = client
        self.phione = client.phione
        self.phical = client.phical
        self.phirag = client.phirag
        self.phidoc = client.phidoc
        self.phibot = client.phibot
        self.phibrd = client.phibrd
        self.phiora = client.phiora
        self.phigit = client.phigit
        self.philog = client.philog
        self.phillm = client.phillm
        self.phisec = client.phisec
        self.phigov = client.phigov
        self.phibus = client.phibus
        self.phimen = client.phimen
        self.ontologies = client.ontology

        # Palantir module aliases
        self.admin = client.phione
        self.aip_agents = client.phimen
        self.audit = client.philog
        self.checkpoints = client.phigov
        self.connectivity = client.phibus
        self.core = client.ontology
        self.data_health = client.phisec
        self.datasets = client.phiora
        self.filesystem = client.phigit
        self.functions = client.phical
        self.geo = client.phical
        self.language_models = client.phillm
        self.media_sets = client.phirag
        self.models = client.phigen
        self.orchestration = client.phibot
        self.sql_queries = client.rql
        self.streams = client.phibus
        self.third_party_applications = client.phibrd
        self.widgets = client.ontology


class V2Namespace:
    """Phient v2 API Namespace (Ontologies & Quantum QML)."""

    def __init__(self, client: PhiClient) -> None:
        self._client = client
        self.phione = client.phione
        self.phical = client.phical
        self.phirag = client.phirag
        self.phidoc = client.phidoc
        self.phibot = client.phibot
        self.phibrd = client.phibrd
        self.phiora = client.phiora
        self.phigit = client.phigit
        self.philog = client.philog
        self.phillm = client.phillm
        self.phisec = client.phisec
        self.phigov = client.phigov
        self.phibus = client.phibus
        self.phimen = client.phimen
        self.ontologies = client.ontology

        # Palantir module aliases
        self.admin = client.phione
        self.aip_agents = client.phimen
        self.audit = client.philog
        self.checkpoints = client.phigov
        self.connectivity = client.phibus
        self.core = client.ontology
        self.data_health = client.phisec
        self.datasets = client.phiora
        self.filesystem = client.phigit
        self.functions = client.phical
        self.geo = client.phical
        self.language_models = client.phillm
        self.media_sets = client.phirag
        self.models = client.phigen
        self.orchestration = client.phibot
        self.sql_queries = client.rql
        self.streams = client.phibus
        self.third_party_applications = client.phibrd
        self.widgets = client.ontology

    def qml(self, space_name: str = "quantum_space"):
        return self._client.qml(space_name)

    def vql(self, space: str = "default"):
        return self._client.vql(space)

    def rql(self, table: str):
        return self._client.rql(table)

    def oql(self, node_id: str):
        return self._client.oql(node_id)


# Palantir Symmetrical Master Client Aliases
PClient = PhiClient
PAsyncClient = AsyncPhiClient
PhiADKClient = PhiClient
AsyncPhiADKClient = AsyncPhiClient
