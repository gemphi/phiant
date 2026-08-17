"""Priority Framework - Scores and queues requests by urgency."""

from __future__ import annotations

from ..agents.base_agent import Priority


# Keywords that signal urgency
URGENCY_KEYWORDS = {
    "urgent", "asap", "immediately", "blocked", "critical",
    "emergency", "down", "broken", "outage", "security incident",
}

# Request type weights
TYPE_WEIGHTS = {
    "security": 40,
    "onboarding_today": 35,
    "access_request": 20,
    "automation": 15,
    "report": 10,
    "documentation": 5,
    "query": 5,
}


def calculate_priority(
    query: str,
    intent: str = "",
    requester_role: str = "user",
) -> Priority:
    """Calculate request priority based on urgency signals, type, and role.

    Args:
        query: The user's query text.
        intent: Classified intent type.
        requester_role: Role of the requester.

    Returns:
        Priority level (P1-P4).
    """
    score = 0
    query_lower = query.lower()

    # Urgency keyword signals
    for keyword in URGENCY_KEYWORDS:
        if keyword in query_lower:
            score += 30
            break

    # Request type weight
    type_key = _map_intent_to_type(intent)
    score += TYPE_WEIGHTS.get(type_key, 5)

    # Requester role weight
    role_weights = {
        "director": 15,
        "manager": 10,
        "lead": 8,
        "engineer": 5,
        "user": 5,
    }
    score += role_weights.get(requester_role, 5)

    # Map score to priority
    if score >= 60:
        return Priority.P1_CRITICAL
    if score >= 40:
        return Priority.P2_HIGH
    if score >= 20:
        return Priority.P3_STANDARD
    return Priority.P4_LOW


def _map_intent_to_type(intent: str) -> str:
    """Map an intent classification to a request type for priority scoring."""
    mapping = {
        "identity_operation": "access_request",
        "onboard_employee": "onboarding_today",
        "run_automation": "automation",
        "knowledge_query": "query",
        "hr_query": "query",
        "docs_operation": "documentation",
    }
    return mapping.get(intent, "query")
