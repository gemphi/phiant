"""Tests for POntology (Enterprise Ontology Engine) & Workspace/Flow Capture endpoints."""

import pytest
from fastapi.testclient import TestClient
from src.phiegg.phiapi.app import create_app
from src.phiegg.ontologies.engine import GLOBAL_ONTOLOGY, POntologyEngine
from src.phiegg.ontologies.object import ObjectType, PropertyType, PObjectType, PPropertyType
from src.phiegg.ontologies.link import LinkType, PLinkType
from src.phiegg.ontologies.action import ActionType, ActionParameter, PActionType, PActionParameter


class TestPOntologyEngine:
    def test_ontology_default_initialization(self):
        engine = POntologyEngine("test_ontology")
        assert "Employee" in engine.object_types
        assert "UserIdentity" in engine.object_types
        assert "DocumentPage" in engine.object_types
        assert "GitCommit" in engine.object_types
        assert "employee_identity" in engine.link_types
        assert "onboard_employee" in engine.action_types

    def test_custom_object_type_registration(self):
        engine = POntologyEngine("custom_ontology")
        ot = (
            PObjectType("Ticket", "Support Ticket", "IT support ticket")
            .add_property(PPropertyType("ticket_id", "Ticket ID", "string", is_primary_key=True))
            .add_property(PPropertyType("severity", "Severity", "integer"))
        )
        engine.register_object_type(ot)
        assert engine.get_object_type("Ticket") is not None
        assert engine.get_object_type("Ticket").properties["severity"].data_type == "integer"

    def test_ontology_mermaid_generation(self):
        engine = POntologyEngine("mermaid_ontology")
        mermaid = engine.to_mermaid()
        assert "graph TD" in mermaid
        assert "Employee" in mermaid
        assert "UserIdentity" in mermaid

    def test_ontology_singular_subclients(self):
        from src.phiegg.client import PClient
        client = PClient()

        # Object & ObjectSet (singular)
        emp = client.ontologies.Object.get("Employee", "alice@phient.com")
        assert emp.primary_key == "alice@phient.com"
        assert emp.object_type == "Employee"

        emp_set = client.ontologies.ObjectSet.of_type("Employee")
        assert emp_set.count() == 3
        assert len(emp_set.to_list()) == 3

        # Action (singular)
        receipt = client.ontologies.Action.apply("onboard_employee", {"email": "alice@phient.com"})
        assert receipt["status"] == "APPLIED"

        # LinkedObject (singular)
        linked = client.ontologies.LinkedObject.list_linked("Employee", "alice@phient.com", "employee_identity")
        assert len(linked) == 2

        # Interface, Transaction, Scenario, Query (singular)
        iface = client.ontologies.Interface.get("Searchable")
        assert iface.api_name == "Searchable"

        tx = client.ontologies.Transaction.create()
        assert tx.status == "COMMITTED"

        sc = client.ontologies.Scenario.create("Branch_Test")
        assert sc.name == "Branch_Test"

        qres = client.ontologies.Query.execute("find_employees", {"dept": "Eng"})
        assert qres["status"] == "SUCCESS"


class TestPOntologyApiEndpoints:
    @pytest.fixture
    def api_client(self):
        app = create_app()
        return TestClient(app)

    def test_get_ontologies_schema_endpoint(self, api_client):
        res = api_client.get("/v2/ontologies")
        assert res.status_code == 200
        data = res.json()
        assert "object_types" in data
        assert "link_types" in data
        assert "mermaid" in data
        assert "Employee" in data["object_types"]

    def test_get_ontology_object_endpoint(self, api_client):
        res = api_client.get("/v2/ontologies/objects/Employee")
        assert res.status_code == 200
        data = res.json()
        assert data["api_name"] == "Employee"
        assert "email" in data["properties"]

    def test_flow_capture_generate_endpoint(self, api_client):
        res = api_client.post("/v2/docs/capture/generate", json={
            "flow_title": "Pipeline Builder Capture",
            "prompt": "Document data import flow",
            "model": "GPT-5",
            "snapshots_count": 7,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "generated"
        assert data["snapshots_count"] == 7
        assert "Pipeline Specification" in data["markdown_content"]

    def test_workspace_sql_endpoint(self, api_client):
        res = api_client.post("/v2/workspace/sql", json={
            "query": "SELECT * FROM restricted_view LIMIT 10",
            "branch": "master",
            "limit": 5,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["branch"] == "master"
        assert len(data["rows"]) == 5
        assert "constant_column" in data["columns"]

    def test_v1_and_v2_versioned_ontologies_and_models(self, api_client):
        # Test v1 ontologies endpoint (default)
        res_v1 = api_client.get("/v1/ontologies")
        assert res_v1.status_code == 200
        assert "Employee" in res_v1.json()["object_types"]

        # Test v1/v2 model prediction endpoint
        res_pred = api_client.post("/v1/models/predict", json={
            "model_name": "flight_risk_model",
            "inputs": {"email": "alice@phient.com"},
        })
        assert res_pred.status_code == 200
        assert res_pred.json()["status"] == "SUCCESS"

        # Test v2 quantum model endpoint
        res_qml = api_client.post("/v2/models/quantum", json={
            "circuit_name": "bell_classifier",
            "gates": ["H:0", "CNOT:0:1"],
        })
        assert res_qml.status_code == 200
        assert "|00⟩" in res_qml.json()["probabilities"]

    def test_client_v1_and_v2_namespaces(self):
        from src.phiegg.client import PClient
        client = PClient()

        # v1 namespace
        assert client.v1.phione is not None
        assert client.v1.ontologies is not None
        emp = client.v1.ontologies.Object.get("Employee", "jane@phient.com")
        assert emp.primary_key == "jane@phient.com"

        # v2 namespace
        assert client.v2.ontologies is not None
        qres = client.v2.qml("test_circuit").superposition(["|00⟩", "|11⟩"]).born_measurement().execute()
        assert "|00⟩" in qres.probabilities

    def test_ontologies_endpoints_and_import(self, api_client):
        from phiegg.ontologies import Ontology, OntologyClient, OntologyObject
        assert Ontology is OntologyClient


        res_ont = api_client.get("/v2/ontologies")
        assert res_ont.status_code == 200
        assert "Employee" in res_ont.json()["object_types"]

        res_obj = api_client.get("/v2/ontologies/objects/Employee")
        assert res_obj.status_code == 200
        assert res_obj.json()["api_name"] == "Employee"
