"""MCP Tool Definitions for Phient & PhiEgg Agent Platform.

Complies with specs/mcp-server.md.
"""

from __future__ import annotations

from typing import Any, Dict, List

MCP_TOOLS: List[Dict[str, Any]] = [
    {
        "name": "ask_knowledge",
        "description": "Search internal knowledge base for policies, processes, and documentation with source citations.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The question or search query"},
                "collection": {
                    "type": "string",
                    "enum": ["policies", "technical", "processes", "general"],
                    "description": "Optional: specific knowledge collection to search",
                },
                "top_k": {"type": "integer", "default": 5, "description": "Number of results to return"},
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
        "description": "Look up employee details in HiBob HRIS topological space.",
        "inputSchema": {
            "type": "object",
            "properties": {"email": {"type": "string", "description": "Employee's email address"}},
            "required": ["email"],
        },
    },
    {
        "name": "check_leave_balance",
        "description": "Check leave balance and accruals for an employee.",
        "inputSchema": {
            "type": "object",
            "properties": {"email": {"type": "string", "description": "Employee's email address"}},
            "required": ["email"],
        },
    },
    {
        "name": "list_team_members",
        "description": "List team members and reports in a given department.",
        "inputSchema": {
            "type": "object",
            "properties": {"department": {"type": "string", "default": "Engineering", "description": "Department name"}},
            "required": [],
        },
    },
    {
        "name": "search_docs",
        "description": "Search Notion workspace and technical documentation.",
        "inputSchema": {
            "type": "object",
            "properties": {"query": {"type": "string", "description": "Search query"}},
            "required": ["query"],
        },
    },
    {
        "name": "run_automation",
        "description": "Execute an automated workflow playbook by ID.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "playbook": {"type": "string", "description": "Playbook ID (e.g. weekly_report)"},
                "params": {"type": "object", "description": "Optional parameters"},
            },
            "required": ["playbook"],
        },
    },
    {
        "name": "onboard_employee",
        "description": "Initiate automated employee onboarding fiber bundle across HR, Entra, and Notion.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "full_name": {"type": "string", "description": "Full name"},
                "email": {"type": "string", "description": "Corporate email"},
                "department": {"type": "string", "description": "Assigned department"},
                "title": {"type": "string", "description": "Job title"},
                "start_date": {"type": "string", "description": "Start date (YYYY-MM-DD)"},
                "country": {"type": "string", "default": "Kenya", "description": "Country office"},
            },
            "required": ["full_name", "email", "department", "title", "start_date"],
        },
    },
    {
        "name": "run_qml",
        "description": "Execute Quantum Model Language circuit with Born-rule amplitude measurement.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "circuit": {"type": "string", "default": "bell_state", "description": "Circuit name"},
                "gates": {"type": "string", "default": "H:0,CNOT:0:1", "description": "Comma-separated gates"},
            },
            "required": [],
        },
    },
    {
        "name": "agent_status",
        "description": "Get real-time operational status of all 11 domain agents in the ecosystem.",
        "inputSchema": {
            "type": "object",
            "properties": {},
        },
    },
]
