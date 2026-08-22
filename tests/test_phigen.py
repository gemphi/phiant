"""Tests for PhiGen Code Synthesis & Palantir Parity Agent."""

import pytest
from phiadk.client import PhiADKClient
from phiadk.phigen.codegen import CodeGenerator
from phiadk.phigen.parity import ParityAuditor
from phiadk.ontologies.engine import POntologyEngine
from phiadk.ontologies.object import ObjectType, PropertyType



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
        client = PhiADKClient()
        agent = client.agents["phigen"]

        # generate_types verb
        gen_res = await agent.execute_verb("generate_types", {})
        gen_out = gen_res.results.get("output", {}) if hasattr(gen_res, "results") else gen_res
        assert gen_out["status"] == "SUCCESS"
        assert gen_out["generated_classes_count"] >= 4
        assert "Employee" in gen_out["classes"]

        # audit_parity verb
        audit_res = await agent.execute_verb("audit_parity", {})
        audit_out = audit_res.results.get("output", {}) if hasattr(audit_res, "results") else audit_res
        assert audit_out["parity_percentage"] >= 80.0
        assert audit_out["total_domain_agents"] >= 15


    def test_client_phigen_subclient(self):
        client = PhiADKClient()
        types = client.phigen.generate_types()
        assert types["count"] >= 4
        assert len(types["code"]) > 100

        parity = client.phigen.audit_parity()
        assert parity.total_domain_agents >= 15
