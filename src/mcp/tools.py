"""MCP Tool Definitions & Declarative Query Templates for Phiant Agent Platform."""

from __future__ import annotations

from typing import Any

# Declarative template mapping tool names to query templates
TOOL_QUERY_TEMPLATES: dict[str, str] = {
    "ask_knowledge": "{query}",
    "lookup_user": "Look up user {email}",
    "lookup_employee": "Look up employee {email}",
    "check_leave_balance": "Check leave balance for {email}",
    "search_docs": "Search documentation: {query}",
    "run_automation": "Run automation playbook {playbook}",
    "onboard_employee": "Onboard new employee {full_name}",
}

MCP_TOOLS: list[dict[str, Any]] = [
    {
        "name": "ask_knowledge",
        "description": "Search Phiant's internal knowledge base for policies, processes, and documentation.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The question or search query"},
                "collection": {
                    "type": "string",
                    "enum": ["policies", "technical", "processes", "general"],
                    "description": "Optional: specific knowledge collection to search",
                },
            },
            "required": ["query"],
        },
    },
    {
        "name": "lookup_user",
        "description": "Look up user account details in Microsoft Entra ID.",
        "inputSchema": {
            "type": "object",
            "properties": {"email": {"type": "string", "description": "User's email address"}},
            "required": ["email"],
        },
    },
    {
        "name": "lookup_employee",
        "description": "Look up employee details in HiBob HRIS.",
        "inputSchema": {
            "type": "object",
            "properties": {"email": {"type": "string", "description": "Employee's email address"}},
            "required": ["email"],
        },
    },
    {
        "name": "check_leave_balance",
        "description": "Check leave balance for an employee.",
        "inputSchema": {
            "type": "object",
            "properties": {"email": {"type": "string", "description": "Employee's email address"}},
            "required": ["email"],
        },
    },
    {
        "name": "search_docs",
        "description": "Search Notion documentation workspace.",
        "inputSchema": {
            "type": "object",
            "properties": {"query": {"type": "string", "description": "Search query"}},
            "required": ["query"],
        },
    },
    {
        "name": "run_automation",
        "description": "Execute an automation playbook.",
        "inputSchema": {
            "type": "object",
            "properties": {"playbook": {"type": "string", "description": "Playbook ID to execute"}},
            "required": ["playbook"],
        },
    },
    {
        "name": "onboard_employee",
        "description": "Initiate full onboarding workflow for a new employee.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "full_name": {"type": "string"},
                "email": {"type": "string"},
                "department": {"type": "string"},
                "title": {"type": "string"},
                "start_date": {"type": "string", "format": "date"},
                "country": {"type": "string", "enum": ["KE", "UG", "NG", "GH", "ZA", "GB"]},
            },
            "required": ["full_name", "email", "department", "title", "start_date", "country"],
        },
    },
    {
        "name": "agent_status",
        "description": "Check the health status of all agents in the ecosystem.",
        "inputSchema": {"type": "object", "properties": {}},
    },
]
