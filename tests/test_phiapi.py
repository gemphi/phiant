"""Tests for PhiAPI Server, Endpoints, and Palantir AIP Dashboard."""

import pytest
from fastapi.testclient import TestClient

from src.phiadk.phiapi.app import create_app


@pytest.fixture
def api_client():
    app = create_app()
    return TestClient(app)


class TestPhiAPI:
    def test_dashboard_endpoint_serves_html(self, api_client):
        response = api_client.get("/")
        assert response.status_code == 200
        assert "PhiADK AIP" in response.text
        assert "mermaid" in response.text

    def test_list_agents_endpoint(self, api_client):
        response = api_client.get("/v2/agents")
        assert response.status_code == 200
        data = response.json()
        assert data["count"] >= 14
        agent_ids = [a["agent_id"] for a in data["agents"]]
        assert "phione" in agent_ids
        assert "phigit" in agent_ids
        assert "phimen" in agent_ids
        assert "phigen" in agent_ids

    def test_get_agent_schema(self, api_client):
        response = api_client.get("/v2/agents/phical/schema")
        assert response.status_code == 200
        data = response.json()
        assert data["agent_id"] == "phical"
        assert len(data["specs"]) >= 1

    def test_get_agent_topology(self, api_client):
        response = api_client.get("/v2/agents/phione/topology")
        assert response.status_code == 200
        data = response.json()
        assert data["found"] is True
        assert data["has_mermaid"] is True
        assert "EmployeeNode" in data["raw_mdx"]

    def test_execute_agent_verb(self, api_client):
        response = api_client.post(
            "/v2/agents/phione/execute",
            json={"verb": "lookup_employee", "parameters": {"email": "jane@phient.com"}},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["confidence"] >= 0.9
        assert "results" in data

    def test_workforce_endpoints(self, api_client):
        res_emp = api_client.get("/v2/workforce/lookup?email=jane@phient.com")
        assert res_emp.status_code == 200
        assert res_emp.json()["display_name"] == "Jane Muthoni"

    def test_virtual_ceo_strategy_endpoint(self, api_client):
        res = api_client.post(
            "/v2/executive/strategy",
            json={"objective": "Expand operations and hire leadership"},
        )
        assert res.status_code == 200
        data = res.json()
        assert data["decision"] == "conclude"

    def test_query_endpoints(self, api_client):
        res_rql = api_client.get("/v2/query/rql?table=employees")
        assert res_rql.status_code == 200

        res_vql = api_client.get("/v2/query/vql?vector=1.0,0.0,0.0,0.0&top_k=2")
        assert res_vql.status_code == 200

        res_oql = api_client.get("/v2/query/oql?node_id=jane@phient.com&edge=reports_to")
        assert res_oql.status_code == 200

    def test_git_and_telemetry_endpoints(self, api_client):
        res_git = api_client.get("/v2/git/log")
        assert res_git.status_code == 200
        assert "commits" in res_git.json()

        res_log = api_client.get("/v2/telemetry/tail?n=5")
        assert res_log.status_code == 200
        assert "logs" in res_log.json()

    def test_docs_catalog_and_article_endpoints(self, api_client):
        res_cat = api_client.get("/v2/docs/catalog")
        assert res_cat.status_code == 200
        catalog = res_cat.json()["catalog"]
        assert len(catalog) >= 4

        res_art = api_client.get("/v2/docs/article?path=docs/v1/README.md")
        assert res_art.status_code == 200
        data = res_art.json()
        assert "content" in data
        assert "title" in data
        assert "Phient SDK Documentation" in data["title"]
