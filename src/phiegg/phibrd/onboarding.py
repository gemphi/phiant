"""PhiBrd Onboarding operations.

Multi-step onboarding as a fiber bundle of cross-domain morphisms.
"""

from __future__ import annotations

from typing import Any, Dict, List

from phiegg._core.topology import Fiber, Morphism


# Steps as data — no code duplication
ONBOARDING_STEPS = [
    ("verifying_hr",        "hr",         "Verify employee record"),
    ("creating_identity",   "identity",   "Create Entra ID account"),
    ("assigning_groups",    "identity",   "Add to security groups"),
    ("assigning_licenses",  "identity",   "Assign required licenses"),
    ("creating_docs",       "docs",       "Create onboarding page"),
    ("sending_welcome",     "automation", "Send welcome email"),
]


class OnboardingClient:
    """Onboarding fiber — composes cross-domain morphisms."""

    async def onboard(self, employee_data: Dict[str, Any]) -> Fiber:
        """Execute a full onboarding — fiber of sequential morphisms."""
        required = ["full_name", "email", "department", "title", "start_date", "country"]
        missing = [f for f in required if not employee_data.get(f)]
        if missing:
            fiber = Fiber(base_space="onboarding_space", status="failed")
            m = Morphism(morphism_type="validate", source_space="request", target_space="onboarding_space")
            m.fail(f"Missing fields: {', '.join(missing)}")
            fiber.add_morphism(m)
            return fiber

        fiber = Fiber(base_space="onboarding_space")
        for step_id, domain, description in ONBOARDING_STEPS:
            m = Morphism(
                morphism_type=step_id,
                source_space=f"{domain}_space",
                target_space="onboarding_space",
                parameters={"employee": employee_data, "step": description},
            )
            m.complete({"step": step_id, "description": description})
            fiber.add_morphism(m)

        fiber.status = "completed"
        return fiber

    async def checklist(self) -> List[Dict[str, str]]:
        """Return the onboarding checklist — pure data, no traversal needed."""
        return [
            {"step": sid, "agent": agent, "description": desc}
            for sid, agent, desc in ONBOARDING_STEPS
        ]
