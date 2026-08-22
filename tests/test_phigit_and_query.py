"""Comprehensive tests for PhiGit, Git-backed Key/Value, ORM & Query Engines (VQL, RQL, OQL), PhiLog, PhiCLI, and MDX Ontologylogies."""

import pytest
from src.phiegg import (
    Blob,
    Commit,
    DiffResult,
    Field,
    GitEngine,
    LogLevel,
    Node,
    OQL,
    PhiAgent,
    PhiBotAgent,
    PhiBrdAgent,
    PhiCalAgent,
    PhiDocAgent,
    PhiEggClient,
    PhiGitAgent,
    PhiLLMAgent,
    PhiLogAgent,
    PhiMenAgent,
    PhiOneAgent,
    PhiOraAgent,
    PhiRAGAgent,
    RQL,
    Ref,
    Repository,
    SimplexType,
    StringField,
    StructuredLogger,
    TokenAuth,
    Tree,
    TreeEntry,
    VQL,
)
from src.phiegg.phicli.cli import run_cli


# ── Agent Versioning Tests ────────────────────────────────────────────

class TestAgentVersioning:
    def test_all_agents_have_version_field(self):
        agents = [
            PhiOneAgent(), PhiCalAgent(), PhiRAGAgent(), PhiDocAgent(),
            PhiBotAgent(), PhiBrdAgent(), PhiOraAgent(), PhiGitAgent(),
            PhiLogAgent(), PhiLLMAgent(), PhiMenAgent()
        ]
        for a in agents:
            assert hasattr(a, "version")
            assert a.version == "1.0.0"
            assert a.card.version == "1.0.0"


# ── PhiGit Engine Tests ──────────────────────────────────────────────

class TestPhiGitEngine:
    def test_blob_storage_and_sha1_content_addressing(self):
        engine = GitEngine()
        blob1 = engine.store_blob("Hello Antigravity")
        blob2 = engine.store_blob("Hello Antigravity")
        assert blob1.sha1 == blob2.sha1
        assert len(blob1.sha1) == 40  # Valid SHA-1 hex

        retrieved = engine.get_blob(blob1.sha1)
        assert retrieved is not None
        assert retrieved.content == "Hello Antigravity"

    def test_tree_creation_and_commit_lineage(self):
        engine = GitEngine()
        blob = engine.store_blob({"key": "val1"})
        entry = TreeEntry(name="config.json", sha1=blob.sha1)
        tree = engine.store_tree([entry])

        commit1 = engine.commit(tree.sha1, message="Initial commit", version="1.0.0")
        assert commit1.sha1 != ""
        assert engine.get_ref("refs/heads/main") == commit1.sha1

        # Second commit
        blob2 = engine.store_blob({"key": "val2"})
        entry2 = TreeEntry(name="config.json", sha1=blob2.sha1)
        tree2 = engine.store_tree([entry2])
        commit2 = engine.commit(tree2.sha1, message="Second commit", version="1.0.1")

        assert commit2.parent_sha1s == [commit1.sha1]
        log = engine.log("refs/heads/main")
        assert len(log) == 2
        assert log[0].sha1 == commit2.sha1
        assert log[1].sha1 == commit1.sha1

    def test_tree_diff(self):
        engine = GitEngine()
        b1 = engine.store_blob("file1")
        b2 = engine.store_blob("file2")
        t1 = engine.store_tree([TreeEntry(name="f1", sha1=b1.sha1)])
        t2 = engine.store_tree([TreeEntry(name="f1", sha1=b2.sha1), TreeEntry(name="f2", sha1=b2.sha1)])

        c1 = engine.commit(t1.sha1, message="c1")
        c2 = engine.commit(t2.sha1, message="c2")

        diff = engine.diff(c1.sha1, c2.sha1)
        assert "f2" in diff.added
        assert "f1" in diff.modified


# ── Git-Backed Key/Value & Tree Tests (PhiOra) ────────────────────────

class TestGitBackedKV:
    def test_kv_put_get_and_tree_lineage(self):
        client = PhiEggClient()
        rec1 = client.phiora.Store.put("settings", "theme", "dark", message="Set theme")
        assert rec1.sha1 != ""
        assert rec1._commit_sha1 != ""

        fetched = client.phiora.Store.get("settings", "theme")
        assert fetched.value == "dark"

        keys = client.phiora.Store.keys("settings")
        assert "theme" in keys

        items = client.phiora.Store.items("settings")
        assert ("theme", "dark") in items

        tree_info = client.phiora.Store.tree("settings")
        assert tree_info["collection"] == "settings"
        assert len(tree_info["entries"]) >= 1

        history = client.phiora.Store.log("settings")
        assert len(history) >= 1


# ── ORM & Multi-Model Query Engine Tests ─────────────────────────────

class DemoEmployee(Node):
    name = StringField(required=True)
    department = StringField(default="Engineering")

    def __init__(self, name: str = "", department: str = "Engineering", **kwargs):
        super().__init__(node_type="demo_employee", simplex=SimplexType.POINT, **kwargs)
        self.name = name
        self.department = department


class TestORMAndQueries:
    def test_orm_repository_save_and_filter(self):
        client = PhiEggClient()
        repo = Repository(DemoEmployee, store_client=client.phiora.Store, collection="demo_emp")

        emp1 = DemoEmployee(name="Alice", department="Engineering")
        emp2 = DemoEmployee(name="Bob", department="Sales")
        repo.save(emp1)
        repo.save(emp2)

        all_emps = repo.find_all()
        assert len(all_emps) == 2

        eng_emps = repo.filter(lambda e: e.department == "Engineering")
        assert len(eng_emps) == 1
        assert eng_emps[0].name == "Alice"

    def test_rql_query_builder(self):
        client = PhiEggClient()
        client.phiora.Store.put("employees_tab", "e1", {"display_name": "Alice", "dept": "Eng", "salary": 120})
        client.phiora.Store.put("employees_tab", "e2", {"display_name": "Bob", "dept": "Eng", "salary": 110})
        client.phiora.Store.put("employees_tab", "e3", {"display_name": "Charlie", "dept": "HR", "salary": 90})

        results = client.rql("employees_tab").select(["display_name", "salary"]).where(dept="Eng").order_by("salary", descending=True).execute()
        assert len(results) == 2
        assert results[0]["display_name"] == "Alice"

    def test_vql_query_builder(self):
        client = PhiEggClient()
        client.phiora.Vector.index("k1", "Quantum computing notes", [1.0, 0.0, 0.0, 0.0], topic="quantum")
        client.phiora.Vector.index("k2", "HR policy handbook", [0.0, 1.0, 0.0, 0.0], topic="hr")

        results = client.vql().similar_to([1.0, 0.0, 0.0, 0.0], top_k=1).where(topic="quantum").execute()
        assert len(results) == 1
        assert results[0].key == "k1"

    def test_oql_query_builder(self):
        client = PhiEggClient()
        traversal = client.oql("alice@phient.com").traverse("manages").depth(2).collect_manifold().execute()
        assert traversal.origin == "alice@phient.com"
        assert traversal.filters.get("depth") == 2


# ── PhiLog Telemetry Tests ───────────────────────────────────────────

class TestPhiLogTelemetry:
    def test_structured_logging_and_auditing(self):
        client = PhiEggClient()
        client.philog.Telemetry.info("System boot complete", node="core-1")
        client.philog.Telemetry.warn("High memory alert", usage_percent=85)
        audit = client.philog.Telemetry.record_audit("USER_PROVISION", agent_id="phione", target="alice@phient.com")

        assert audit.audit_id != ""
        assert audit.action == "USER_PROVISION"

        tail_records = client.philog.Telemetry.tail(5)
        assert len(tail_records) >= 2

        warn_records = client.philog.Telemetry.query(level=LogLevel.WARN)
        assert len(warn_records) >= 1
        assert "High memory alert" in warn_records[0].message


# ── MDX Ontologylogy Documents & Auto-Presentation Tests ─────────────────

class TestMDXOntologylogies:
    def test_all_11_agents_have_mdx_topologies(self):
        client = PhiEggClient()
        topos = client.phidoc.Ontologylogy.list_agent_topologies()
        expected = [
            "phibot", "phibrd", "phical", "phidoc", "phigit",
            "phillm", "philog", "phimen", "phione", "phiora", "phirag"
        ]
        for exp in expected:
            assert exp in topos

        # Check MDX / MD content and Mermaid diagrams
        phical_card = client.phidoc.Ontologylogy.render_topology_card("phical")
        assert phical_card["found"] is True
        assert phical_card["has_mermaid"] is True
        assert "Born" in phical_card["raw_mdx"]

        # Check all 11 agents have valid topology content
        for exp in expected:
            raw = client.phidoc.Ontologylogy.get_topology_mdx(exp)
            assert raw is not None
            assert len(raw) > 50
            assert "mermaid" in raw.lower()


# ── PhiCLI Command Dispatch Tests ────────────────────────────────────

class TestPhiCLI:
    def test_cli_agents_list(self, capsys):
        code = run_cli(["agents", "list"])
        assert code == 0
        captured = capsys.readouterr().out
        assert "PHIONE" in captured
        assert "PHIGIT" in captured
        assert "PHILOG" in captured

    def test_cli_kv_and_git_commands(self, capsys):
        code_put = run_cli(["kv", "put", "cli_test", "key1", "val1"])
        assert code_put == 0
        code_get = run_cli(["kv", "get", "cli_test", "key1"])
        assert code_get == 0
        code_refs = run_cli(["git", "refs"])
        assert code_refs == 0
