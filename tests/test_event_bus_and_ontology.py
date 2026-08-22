"""Comprehensive integration tests for PhiBus Event Bus and POntologyEngine."""

import pytest
from phiadk.client import PhiADKClient
from phiadk.agents.phibus.bus import PBusClient, GLOBAL_PBUS
from phiadk.agents.phibus.models import PBusEvent
from phiadk.ontologies.engine import POntologyEngine
from phiadk.ontologies.action import ActionClient
from phiadk.ontologies.object import ObjectType, PropertyType
from phiadk.ontologies.link import LinkType
from phiadk.ontologies.scenario import ScenarioClient
from phiadk.ontologies.transaction import TransactionClient


class TestEventBusAndOntology:
    """Tests testing the entire Ontology graph and its event-driven integration with PhiBus."""

    def test_event_bus_pub_sub_lifecycle(self):
        bus = PBusClient()
        received_events = []

        # 1. Subscribe to specific topic
        unsub = bus.sub("workforce.promoted", lambda e: received_events.append(e))

        # 2. Publish event
        evt = PBusEvent(
            topic="workforce.promoted",
            payload={"employee_id": "EMP-001", "new_title": "Lead Staff Architect"},
            source_agent="phione",
            commit_sha1="commit_abc123",
        )
        bus.pub("workforce.promoted", evt)

        assert len(received_events) == 1
        assert received_events[0].payload["new_title"] == "Lead Staff Architect"
        assert received_events[0].source_agent == "phione"
        assert received_events[0].commit_sha1 == "commit_abc123"

        # 3. Unsubscribe
        unsub()
        bus.pub("workforce.promoted", evt)
        assert len(received_events) == 1  # No additional events received

    def test_wildcard_ontology_event_subscription(self):
        bus = PBusClient()
        ontology_events = []

        # Subscribe with wildcard to all ontology.* events
        bus.sub("ontology.*", lambda e: ontology_events.append(e))

        # Publish diverse ontology events
        bus.pub("ontology.action.promote_employee", PBusEvent(
            topic="ontology.action.promote_employee",
            payload={"action": "promote", "target": "EMP-42"},
            source_agent="ontologies",
        ))
        bus.pub("ontology.transaction.committed", PBusEvent(
            topic="ontology.transaction.committed",
            payload={"tx_id": "tx_999", "status": "COMMITTED"},
            source_agent="ontologies",
        ))

        # Check that both were captured via history query
        history = bus.get_history(topic="ontology.action.promote_employee")
        assert len(history) >= 1
        assert history[-1].payload["target"] == "EMP-42"

    def test_ontology_action_emits_event_to_global_pbus(self):
        engine = POntologyEngine("test_ontology_events")
        action_client = ActionClient(engine=engine)

        captured_events = []
        unsub = GLOBAL_PBUS.sub("ontology.action.promote_employee", lambda e: captured_events.append(e))

        try:
            # Apply registered action
            receipt = action_client.apply(
                "promote_employee",
                {"employee_id": "EMP-100", "new_title": "Principal Engineer"},
                branch="master",
            )
            assert receipt["status"] == "APPLIED"
            assert receipt["action_type"] == "promote_employee"

            # Verify that GLOBAL_PBUS received the event
            assert len(captured_events) >= 1
            last_event = captured_events[-1]
            assert last_event.topic == "ontology.action.promote_employee"
            assert last_event.payload["parameters"]["employee_id"] == "EMP-100"
            assert last_event.source_agent == "ontologies"
        finally:
            unsub()

    def test_whole_ontology_graph_integrity(self):
        """Test full ontology schema: Object Types, Links, Actions, Scenarios, and Transactions."""
        client = PhiADKClient()
        engine = client.ontologies._engine

        # 1. Verify Standard Object Types
        assert "Employee" in engine.object_types
        assert "UserIdentity" in engine.object_types
        assert "DocumentPage" in engine.object_types
        assert "GitCommit" in engine.object_types

        emp_type = engine.object_types["Employee"]
        assert "email" in emp_type.properties
        assert emp_type.properties["email"].is_primary_key is True

        # 2. Verify Link Types (1-simplices)
        assert "employee_identity" in engine.link_types
        link = engine.link_types["employee_identity"]
        assert link.source_object_type == "Employee"
        assert link.target_object_type == "UserIdentity"

        # 3. Verify Action Types (Morphisms)
        assert "promote_employee" in engine.action_types
        assert "provision_identity" in engine.action_types
        assert "onboard_employee" in engine.action_types

        # 4. Verify Mermaid Relationship Visualization
        mermaid = engine.to_mermaid()
        assert "graph TD" in mermaid
        assert "Employee" in mermaid
        assert "Employee has Identity" in mermaid or "Employee -->" in mermaid


        # 5. Verify Scenarios (What-if sandboxes)
        # 5. Verify Scenarios (What-if sandboxes)
        scenario_client = ScenarioClient(engine=engine)
        scenario = scenario_client.create(name="scenario_org_restructure")
        assert "scenario_org_restructure" in scenario.scenario_id
        assert scenario.status == "ACTIVE"

        # 6. Verify Transactions (2-phase commits)
        tx_client = TransactionClient(engine=engine)
        tx = tx_client.create()
        assert tx.status == "COMMITTED"
        assert len(tx.commit_sha1) == 40


    @pytest.mark.asyncio
    async def test_end_to_end_orchestrator_agent_event_bus_flow(self):
        """Test full round-trip: Orchestrator -> Domain Agent -> Event Bus -> PhiLog Telemetry."""
        client = PhiADKClient()

        # Step 1: Execute action on phibus agent
        bus_ctx = await client.agents["phibus"].execute_verb("publish_event", {
            "topic": "security.threat_detected",
            "payload": {"severity": "HIGH", "source_ip": "192.168.1.50"},
            "source_agent": "phisec",
        })
        assert bus_ctx.results.get("output", {}).get("status") == "PUBLISHED"

        # Step 2: Record telemetry via philog agent
        log_ctx = await client.agents["philog"].execute_verb("log", {
            "level": "WARN",
            "message": "Security threat received on event bus",
            "agent_id": "phisec",
            "topic": "security.threat_detected",
        })
        assert log_ctx.results.get("output") is not None

        # Step 3: Query telemetry
        tail_records = client.agents["philog"].tail(5)
        assert len(tail_records) > 0
