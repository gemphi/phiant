"""Unit tests for the PhiADK Ontologylogy SDK and Agent Platform."""

import pytest
from src.phiadk import (
    AgentCard,
    AgentContext,
    AgentLayer,
    Edge,
    Fiber,
    Manifold,
    Morphism,
    Node,
    Phase,
    PhiAgent,
    PhiBotAgent,
    PhiBrdAgent,
    PhiCalAgent,
    PhiDocAgent,
    PhiADKClient,
    PhiLLMAgent,
    PhiMenAgent,
    PhiOneAgent,
    PhiOraAgent,
    PhiRAGAgent,
    SimplexType,
    Space,
    TokenAuth,
    Ontologylogy,
    Traversal,
)


# ── Ontologylogy Primitive Tests ──────────────────────────────────────────

class TestOntologylogyPrimitives:
    def test_node_creation(self):
        node = Node(node_type="test_entity", properties={"name": "Alpha"})
        assert node.node_type == "test_entity"
        assert node.simplex == SimplexType.POINT
        d = node.to_dict()
        assert d["properties"]["name"] == "Alpha"

    def test_space_and_edges(self):
        space = Space(space_type="cluster")
        n1 = Node(node_type="point_a")
        n2 = Node(node_type="point_b")
        edge = Edge(source_id=n1.node_id, target_id=n2.node_id, edge_type="linked")

        space.add_node(n1)
        space.add_node(n2)
        space.add_edge(edge)

        assert space.size == 2
        assert space.connectivity == 0.5
        assert space.dimension == 1

    def test_morphism_execution(self):
        morphism = Morphism(
            morphism_type="transform",
            source_space="space_a",
            target_space="space_b",
            parameters={"multiplier": 2},
        )
        assert morphism.status == "pending"
        morphism.complete({"output": 42})
        assert morphism.status == "completed"
        assert morphism.result == {"output": 42}

    def test_traversal_path(self):
        traversal = Traversal(origin="seed_node")
        n1 = Node(node_type="hop1")
        n2 = Node(node_type="hop2")
        traversal.visit(n1)
        traversal.visit(n2)
        assert traversal.hops == 1
        assert len(traversal.results) == 2

    def test_fiber_bundle(self):
        fiber = Fiber(base_space="root")
        m1 = Morphism(morphism_type="step1", source_space="a", target_space="b")
        m2 = Morphism(morphism_type="step2", source_space="b", target_space="c")
        fiber.add_morphism(m1)
        fiber.add_morphism(m2)
        fiber.execute_all()
        assert fiber.status == "completed"
        assert len(fiber.morphisms) == 2


# ── Universal Lifecycle & Agent Card Tests ────────────────────────────

class TestAgentLifecycle:
    @pytest.mark.asyncio
    async def test_phione_agent_lifecycle(self):
        agent = PhiOneAgent()
        ctx = await agent.execute_verb("lookup_employee", {"email": "test@phient.com"})
        assert ctx.phase == Phase.ITERATE
        assert "Jane Muthoni" in str(ctx.results.get("output", {}))
        assert ctx.confidence > 0.8
        assert agent.card.agent_id == "phione"

    @pytest.mark.asyncio
    async def test_phical_quantum_search_and_circuit(self):
        agent = PhiCalAgent()
        # Semantic search in superposition
        ctx_search = await agent.execute_verb("query", {"text": "entanglement", "top_k": 2})
        assert len(ctx_search.results.get("output", [])) == 2
        # Circuit simulation
        ctx_circ = await agent.execute_verb("create_circuit", {"name": "BellState", "num_qubits": 2})
        assert ctx_circ.results.get("output", {}).get("num_qubits") == 2

    @pytest.mark.asyncio
    async def test_phiora_content_addressed_storage(self):
        agent = PhiOraAgent()
        # Put record (computes SHA-1 hash)
        ctx_put = await agent.execute_verb("put_record", {"collection": "configs", "key": "k1", "value": "val1"})
        out = ctx_put.results.get("output", {})
        assert out.get("sha1") != ""
        assert out.get("version") == 1

        # Get record
        ctx_get = await agent.execute_verb("get_record", {"collection": "configs", "key": "k1"})
        assert ctx_get.results.get("output", {}).get("value") == "val1"

    @pytest.mark.asyncio
    async def test_phirag_agent(self):
        agent = PhiRAGAgent()
        ctx = await agent.execute_verb("answer_query", {"query": "security policy"})
        assert "answer" in ctx.results.get("output", {})

    @pytest.mark.asyncio
    async def test_phidoc_agent(self):
        agent = PhiDocAgent()
        ctx = await agent.execute_verb("create_page", {"title": "Engineering Handbook"})
        assert "notion.so" in ctx.results.get("output", {}).get("result", {}).get("url", "")

    @pytest.mark.asyncio
    async def test_phibot_agent(self):
        agent = PhiBotAgent()
        ctx = await agent.execute_verb("list_playbooks", {"category": "it_ops"})
        assert ctx.confidence == 1.0

    @pytest.mark.asyncio
    async def test_phibrd_agent(self):
        agent = PhiBrdAgent()
        emp_data = {
            "full_name": "Alice Smith",
            "email": "alice@phient.com",
            "department": "Engineering",
            "title": "Lead",
            "start_date": "2026-09-01",
            "country": "Kenya",
        }
        ctx = await agent.execute_verb("onboard_employee", emp_data)
        assert ctx.results.get("output", {}).get("status") == "completed"

    @pytest.mark.asyncio
    async def test_phillm_agent(self):
        agent = PhiLLMAgent()
        ctx_comp = await agent.execute_verb("complete", {"prompt": "Hello world", "model": "gpt-4o"})
        assert "response" in ctx_comp.results.get("output", {}).get("content", "").lower()
        ctx_cnt = await agent.execute_verb("count_tokens", {"text": "one two three four"})
        assert ctx_cnt.results.get("output", {}).get("tokens", 0) > 0

    @pytest.mark.asyncio
    async def test_phimen_virtual_ceo(self):
        agent = PhiMenAgent(domain_clients={"phione": None, "phirag": None})
        ctx = await agent.execute_verb("assess_objective", {"objective": "Scale infrastructure"})
        assert ctx.results.get("decision") == "conclude"


# ── Request Abstraction & Response Mode Tests ─────────────────────────

class TestRequestInfoAndStreaming:
    def test_request_info_path_building(self):
        from src.phiadk import RequestInfo
        req = RequestInfo(
            method="POST",
            resource_path="/v2/languageModels/{provider}/{modelId}/completions",
            path_params={"provider": "openAi", "modelId": "gpt-4o"},
        )
        assert req.build_path() == "/v2/languageModels/openAi/gpt-4o/completions"

    @pytest.mark.asyncio
    async def test_page_iterator(self):
        from src.phiadk import AsyncPageIterator

        pages = {None: (["item1", "item2"], "page2"), "page2": (["item3"], None)}

        async def fetch_page(token):
            return pages.get(token, ([], None))

        iterator = AsyncPageIterator(fetch_page)
        collected = []
        async for item in iterator:
            collected.append(item)

        assert collected == ["item1", "item2", "item3"]

    def test_with_raw_and_streaming_response(self):
        from src.phiadk import with_raw_response, with_streaming_response

        def get_data():
            return {"key": "val"}

        raw_fn = with_raw_response(lambda: None, get_data)
        raw_resp = raw_fn()
        assert raw_resp.ok
        assert raw_resp.data == {"key": "val"}

        stream_fn = with_streaming_response(lambda: None, get_data)
        stream_resp = stream_fn()
        assert len(stream_resp.chunks) == 1


# ── Unified Client Integration Tests ─────────────────────────────────

class TestPhiADKClient:
    @pytest.mark.asyncio
    async def test_client_subclients_and_data_resolution(self):
        client = PhiADKClient(auth=TokenAuth("phi_demo_123"))

        # Verify all 9 agents exist on client
        assert hasattr(client, "phione")
        assert hasattr(client, "phical")
        assert hasattr(client, "phirag")
        assert hasattr(client, "phidoc")
        assert hasattr(client, "phibot")
        assert hasattr(client, "phibrd")
        assert hasattr(client, "phiora")
        assert hasattr(client, "phillm")
        assert hasattr(client, "phimen")

        # Test language model client
        completion = client.phillm.OpenAi.create_chat_completion("gpt-4o", [{"role": "user", "content": "Hi"}])
        assert completion.model == "gpt-4o"
        assert len(completion.content) > 0

        # Test raw response mode
        raw_comp = client.phillm.OpenAi.with_raw_response.create_chat_completion("gpt-4o", [{"role": "user", "content": "Hi"}])
        assert raw_comp.ok

        # Test traversal on employee space
        emp = await client.phione.Employee.lookup("jane@phient.com")
        assert emp.display_name == "Jane Muthoni"

        # Test quantum semantic query
        results = await client.phical.SemanticSearch.query("quantum state", top_k=3)
        assert len(results) == 3

        # Test playbook listing
        playbooks = await client.phibot.Playbook.list()
        assert len(playbooks.results) > 0

        # Test checklist
        checklist = await client.phibrd.Onboarding.checklist()
        assert len(checklist) == 6

    def test_palantir_module_aliases(self):
        client = PhiADKClient(auth=TokenAuth("phi_demo_123"))

        # Verify all 20 Palantir module aliases on client
        palantir_modules = [
            "admin", "aip_agents", "audit", "checkpoints", "connectivity",
            "core", "data_health", "datasets", "filesystem", "functions",
            "geo", "language_models", "media_sets", "models", "ontologies",
            "orchestration", "sql_queries", "streams", "third_party_applications",
            "widgets",
        ]

        for mod in palantir_modules:
            assert hasattr(client, mod), f"Missing client.{mod}"
            assert hasattr(client.v1, mod), f"Missing client.v1.{mod}"
            assert hasattr(client.v2, mod), f"Missing client.v2.{mod}"

