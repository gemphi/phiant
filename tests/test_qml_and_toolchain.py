"""Tests for QML (Quantum Model Language) and Palantir-Style CLI Toolchain."""

import pytest
from fastapi.testclient import TestClient

from src.phiegg.client import PhiEggClient
from src.phiegg.phiapi.app import create_app
from src.phiegg.phicli.cli import main as cli_main
from src.phiegg.query.qml import QML


class TestQMLQueryLanguage:
    def test_qml_superposition_and_born_measurement(self):
        result = (
            QML.from_circuit("test_superposition")
            .superposition(["|0⟩", "|1⟩", "|2⟩", "|3⟩"])
            .born_measurement(threshold=0.2)
            .execute()
        )
        assert result.num_qubits == 2
        assert len(result.state_nodes) == 4
        for p in result.born_distribution.values():
            assert round(p, 2) == 0.25

    def test_qml_hadamard_gate_and_cnot_entanglement(self):
        # Generate Bell State |Φ+⟩ = (|00⟩ + |11⟩) / √2
        result = (
            QML.from_circuit("bell_circuit")
            .apply_gate("H", qubit=0)
            .entangle(0, 1)
            .born_measurement(threshold=0.1)
            .execute()
        )
        assert "|00⟩" in result.born_distribution
        assert "|11⟩" in result.born_distribution
        assert round(result.born_distribution["|00⟩"], 2) == 0.50
        assert round(result.born_distribution["|11⟩"], 2) == 0.50

    def test_qml_decoherence_filtering(self):
        result = (
            QML.from_space("decoherence_space")
            .superposition(["|0⟩", "|1⟩"], amplitudes=[complex(0.95, 0), complex(0.05, 0)])
            .born_measurement(threshold=0.10)
            .execute()
        )
        # 0.05^2 = 0.0025 < 0.10, so |1⟩ is pruned by decoherence filter
        assert "|0⟩" in result.born_distribution
        assert "|1⟩" not in result.born_distribution
        assert result.collapsed_state == "|0⟩"

    def test_client_qml_fluent_interface(self):
        client = PhiEggClient()
        res = client.qml("fluent_circuit").superposition(["|0⟩", "|1⟩"]).execute()
        assert res.state_space == "fluent_circuit"
        assert res.fidelity == 1.0


class TestPalantirToolchainCLI:
    def test_cli_generate_spec(self, capsys):
        code = cli_main(["generate-spec"])
        assert code == 0
        captured = capsys.readouterr()
        assert "Successfully generated" in captured.out

    def test_cli_generate_docs(self, capsys):
        code = cli_main(["generate-docs"])
        assert code == 0
        captured = capsys.readouterr()
        assert "Successfully compiled" in captured.out

    def test_cli_version_set(self, capsys):
        code = cli_main(["version", "set", "1.1.0"])
        assert code == 0
        captured = capsys.readouterr()
        assert "Updated all 11 agents and cards to v1.1.0" in captured.out

    def test_cli_topo_inspect(self, capsys):
        code = cli_main(["topo", "inspect", "phione"])
        assert code == 0
        captured = capsys.readouterr()
        assert "Ontologylogical Architecture for 'PHIONE'" in captured.out

    def test_cli_qml_run(self, capsys):
        code = cli_main(["qml", "run", "--circuit", "bell", "--gates", "H:0,CNOT:0:1"])
        assert code == 0
        captured = capsys.readouterr()
        assert "Born-Rule Distribution" in captured.out


    def test_cli_generate_agent(self, tmp_path, capsys):
        from src.phiegg.phicli.scaffold import scaffold_agent
        res = scaffold_agent("phitest", domain="testing", layer="application", version="2.0.0", target_dir=tmp_path / "phitest")
        assert res["agent_id"] == "phitest"
        assert res["version"] == "2.0.0"
        assert res["files_created"] >= 10
        assert (tmp_path / "phitest" / "schema.json").exists()
        assert (tmp_path / "phitest" / "ontology" / "ontology.mdx").exists() or (tmp_path / "phitest" / "topo" / "topology.mdx").exists()
        assert (tmp_path / "phitest" / "uses.md").exists()



class TestQMLApiEndpoint:
    def test_api_query_qml_endpoint(self):
        app = create_app()
        client = TestClient(app)
        res = client.get("/v2/query/qml?circuit=bell_state&gates=H:0,CNOT:0:1&threshold=0.1")
        assert res.status_code == 200
        data = res.json()
        assert "|00⟩" in data["born_distribution"]
        assert "|11⟩" in data["born_distribution"]

    def test_api_generate_agent_endpoint(self, tmp_path, monkeypatch):
        app = create_app()
        client = TestClient(app)
        res = client.post("/v2/agents/generate", json={
            "agent_id": "phidemo",
            "version": "1.5.0",
            "domain": "demo",
            "layer": "application",
            "verbs": ["demo_action", "demo_status"]
        })
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "created"
        assert data["agent"]["version"] == "1.5.0"
