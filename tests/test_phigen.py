"""Tests for PhiGen Code Synthesis & Palantir Parity Agent."""

import pytest
from phiegg.client import PhiEggClient
from phiegg.phigen.codegen import CodeGenerator
from phiegg.phigen.parity import ParityAuditor
from phiegg.ontologies.engine import POntologyEngine
from phiegg.ontologies.object import ObjectType, PropertyType



class TestPhiGen:
    def test_codegen_single_and_all_types(self):
        engine = POntologyEngine("test_codegen")
        gen = CodeGenerator(engine)
        classes = gen.generate_all_types()

        assert "Employee" in classes
        assert "UserIdentity" in classes
        emp_cls = classes["Employee"]
        assert emp_cls.class_name == "Employee"
        assert "primary_key" in emp_cls.code_str
        assert "from_topos_object" in emp_cls.code_str

        module_code = gen.render_module_code()
        assert "class Employee:" in module_code
        assert "class UserIdentity:" in module_code

    def test_parity_auditor_scan(self):
        auditor = ParityAuditor()
        report = auditor.audit()

        assert report.total_palantir_modules > 0
        assert report.matching_phient_modules > 0
        assert report.parity_percentage >= 80.0
        assert report.total_domain_agents >= 15
        assert report.agents_healthy >= 15

    @pytest.mark.asyncio
    async def test_phigen_agent_verbs(self):
        client = PhiEggClient()
        agent = client.agents["phigen"]

        # generate_types verb
        gen_res = await agent.execute_verb("generate_types", {})
        assert gen_res["status"] == "SUCCESS"
        assert gen_res["generated_classes_count"] >= 4
        assert "Employee" in gen_res["classes"]

        # audit_parity verb
        audit_res = await agent.execute_verb("audit_parity", {})
        assert audit_res["parity_percentage"] >= 80.0
        assert audit_res["total_domain_agents"] >= 15

    def test_client_phigen_subclient(self):
        client = PhiEggClient()
        types = client.phigen.generate_types()
        assert types["count"] >= 4
        assert len(types["code"]) > 100

        parity = client.phigen.audit_parity()
        assert parity.total_domain_agents >= 15
