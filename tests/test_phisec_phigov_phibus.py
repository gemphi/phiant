"""Test suite for PhiSec (Security), PhiGov (Governance), and PhiBus (Event Bus Pub/Sub with PBusEvent)."""

import pytest
from starlette.testclient import TestClient

from phiadk.client import PhiADKClient
from phiadk.phibus.models import PBusEvent
from phiadk.phibus.verbs import PBusVerb, PhiBusVerb
from phiadk.phigov.verbs import PGovVerb, PhiGovVerb
from phiadk.phisec.verbs import PSecVerb, PhiSecVerb
from phiadk._core import PAgent, PNode, PSpace, PMorphism


@pytest.fixture
def client():
    return PhiADKClient()


@pytest.fixture
def api_client():
    from phiadk.phiapi.app import app
    return TestClient(app)


class TestPhiBusPubSub:
    """Test suite for PhiBus pub/sub event routing with PBusEvent."""

    def test_pbus_event_creation_and_serialization(self):
        evt = PBusEvent(
            topic="identity.user_created",
            payload={"email": "alice@phient.com", "role": "engineer"},
            source_agent="phione",
        )
        assert evt.topic == "identity.user_created"
        assert evt.payload["email"] == "alice@phient.com"
        d = evt.to_dict()
        assert d["topic"] == "identity.user_created"
        assert "event_id" in d
        assert "timestamp" in d

    def test_pub_and_sub_synchronous_delivery(self, client):
        received_events = []

        def handler(event: PBusEvent):
            received_events.append(event)

        # Subscribe to topic
        unsub = client.phibus.sub("workforce.onboarded", handler)

        # Publish event
        evt = PBusEvent(
            topic="workforce.onboarded",
            payload={"employee": "Jane Muthoni", "status": "active"},
            source_agent="phibrd",
        )
        client.phibus.pub("workforce.onboarded", evt)

        assert len(received_events) == 1
        assert received_events[0].payload["employee"] == "Jane Muthoni"

        # Test unsubscribe
        unsub()
        client.phibus.pub("workforce.onboarded", evt)
        assert len(received_events) == 1  # No new event received

    def test_wildcard_subscription(self, client):
        all_events = []
        client.phibus.sub("*", lambda e: all_events.append(e))

        client.phibus.pub("security.scan", PBusEvent(topic="security.scan", payload={"risk": 0}))
        client.phibus.pub("governance.audit", PBusEvent(topic="governance.audit", payload={"score": 0.99}))

        assert len(all_events) >= 2

    def test_phibus_agent_lifecycle(self, client):
        agent = client.agents["phibus"]
        assert agent.agent_id == "phibus"
        assert agent.layer.value == "Infrastructure"

    def test_phibus_api_endpoints(self, api_client):
        # Test publish
        res_pub = api_client.post("/v2/bus/pub", json={
            "topic": "test.topic",
            "payload": {"msg": "hello from api"},
            "source_agent": "test_suite",
        })
        assert res_pub.status_code == 200
        assert res_pub.json()["status"] == "PUBLISHED"

        # Test get events
        res_events = api_client.get("/v2/bus/events?topic=test.topic")
        assert res_events.status_code == 200
        assert len(res_events.json()["events"]) >= 1


class TestPhiSecSecurity:
    """Test suite for PhiSec security domain agent."""

    def test_phisec_scan_target(self, client):
        scan = client.phisec.scan_target("workspace")
        assert scan.passed is True
        assert scan.risk_score == 0.0

    def test_phisec_verify_token(self, client):
        valid = client.phisec.verify_token("valid_jwt_token_123")
        assert valid.token_valid is True
        assert valid.subject == "jane.m@phient.com"

        invalid = client.phisec.verify_token("invalid_token")
        assert invalid.token_valid is False

    def test_phisec_policy_enforcement(self, client):
        res = client.phisec.enforce_policy(
            resource="Employee",
            action="read",
            subject="jane.m@phient.com",
        )
        assert res["decision"] == "PERMIT"

    def test_phisec_agent_verb_execution(self, client):
        agent = client.agents["phisec"]
        assert agent.agent_id == "phisec"


class TestPhiGovGovernance:
    """Test suite for PhiGov governance domain agent."""

    def test_phigov_check_compliance(self, client):
        report = client.phigov.check_compliance("GDPR")
        assert report.score >= 0.95
        assert report.passed is True
        assert "GDPR" in report.regulations

    def test_phigov_audit_lineage(self, client):
        lineage = client.phigov.audit_lineage("dataset_employees")
        assert lineage.asset_id == "dataset_employees"
        assert len(lineage.transform_chain) >= 2

    def test_phigov_compliance_score(self, client):
        scores = client.phigov.get_compliance_score()
        assert scores["overall_score"] >= 0.95
        assert scores["gdpr"] == "COMPLIANT"


class TestPPrefixStandard:
    """Verify that all core types with P* prefix work seamlessly."""

    def test_p_core_types(self):
        assert PAgent is not None
        assert PNode is not None
        assert PSpace is not None
        assert PMorphism is not None
        assert PBusEvent is not None
        assert PBusVerb == PhiBusVerb
        assert PSecVerb == PhiSecVerb
        assert PGovVerb == PhiGovVerb
