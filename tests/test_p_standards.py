"""Test suite for Phient P* Standard Classes and Ontologies."""

import pytest
from src.phiadk import (
    PClient,
    PAsyncClient,
    POntology,
    POntologyType,
    PObjectType,
    PPropertyType,
    PLinkType,
    PActionType,
    PActionParameter,
    POntologyObject,
    POntologyObjectSet,
    POntologyInterface,
    POntologyTransaction,
    POntologyScenario,
    PValueType,
    PQueryType,
    POntologyEngine,
    POntologyEngine,
    PAgent,
    PNode,
    PSpace,
    PMorphism,
    PFiber,
    PTraversal,
    PManifold,
    PBusEvent,
)


def test_pclient_initialization():
    """Verify PClient can be instantiated and exposes domain clients."""
    client = PClient()
    assert client is not None
    assert client.phione is not None
    assert client.phibot is not None
    assert client.phirag is not None
    assert client.phidoc is not None
    assert client.topos is not None
    assert client.ontologies is not None
    assert hasattr(client, "admin")
    assert hasattr(client, "datasets")


def test_pontology_type_and_pobject_type():
    """Verify POntologyType and PObjectType creation and serialization."""
    prop_id = PPropertyType("emp_id", "Employee ID", "string", is_primary_key=True)
    prop_name = PPropertyType("name", "Full Name", "string")

    obj_type = (
        PObjectType("Employee", "Employee Record", "Staff record in ontology")
        .add_property(prop_id)
        .add_property(prop_name)
    )

    assert obj_type.api_name == "Employee"
    assert "emp_id" in obj_type.properties
    assert obj_type.properties["emp_id"].is_primary_key is True

    ontology_spec = POntologyType(
        api_name="enterprise_core",
        display_name="Enterprise Core Ontology",
        description="Master operational ontology",
        object_types={"Employee": obj_type.to_dict()},
    )
    data = ontology_spec.to_dict()
    assert data["api_name"] == "enterprise_core"
    assert "Employee" in data["object_types"]


def test_plink_type_and_paction_type():
    """Verify PLinkType and PActionType with PActionParameter."""
    link = PLinkType(
        api_name="employee_device",
        display_name="Assigned Device",
        source_object_type="Employee",
        target_object_type="Device",
        cardinality="ONE_TO_MANY",
    )
    assert link.source_object_type == "Employee"
    assert link.target_object_type == "Device"

    param = PActionParameter("new_department", "New Department", "string", required=True)
    action = (
        PActionType("transfer_department", "Transfer Department", "Move employee to another team")
        .add_parameter(param)
    )
    assert "new_department" in action.parameters
    assert action.parameters["new_department"].required is True


def test_pontology_engine_and_global_registry():
    """Verify POntologyEngine registers and holds default enterprise ontology."""
    engine = POntologyEngine()
    assert "Employee" in engine.object_types
    assert "UserIdentity" in engine.object_types
    assert "DocumentPage" in engine.object_types
    assert "GitCommit" in engine.object_types

    mermaid = engine.to_mermaid()
    assert "graph TD" in mermaid
    assert "Employee" in mermaid


def test_pontology_client_via_pclient():
    """Verify ontology queries through PClient.ontologies."""
    client = PClient()
    emp_ot = client.ontologies.Ontology.ObjectType.get("Employee")
    assert emp_ot is not None
    assert emp_ot.api_name == "Employee"

    objs = client.ontologies.Ontology.Object.list("Employee")
    assert len(objs) > 0
    assert isinstance(objs[0], POntologyObject)

    obj_set = client.ontologies.Ontology.ObjectSet.of_type("Employee")
    assert isinstance(obj_set, POntologyObjectSet)
    assert len(obj_set) > 0


def test_pcore_mathematical_abstractions():
    """Verify PAgent, PNode, PSpace, PMorphism topology foundations."""
    node = PNode(node_id="RAG_Space", node_type="rag_node", properties={"dimension": 1536})
    assert node.node_id == "RAG_Space"
    assert node.node_type == "rag_node"
    assert node.properties["dimension"] == 1536

    morphism = PMorphism(morphism_type="vectorize", source_space="DocSpace", target_space="EmbeddingSpace")
    assert morphism.source_space == "DocSpace"
    assert morphism.target_space == "EmbeddingSpace"
    assert morphism.morphism_type == "vectorize"

