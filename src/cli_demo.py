"""CLI Demo runner and formatting helpers."""

from __future__ import annotations

import asyncio
from typing import Any

from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

console = Console()


def print_agents_status(orchestrator: Any) -> None:
    """Display agent health status in a table."""
    table = Table(title="Agent Status", border_style="bright_cyan")
    table.add_column("Agent", style="cyan")
    table.add_column("Status", style="green")
    table.add_column("Requests", justify="right")
    table.add_column("Errors", justify="right")
    table.add_column("Avg Duration", justify="right")

    for name, health in orchestrator.get_agents_status().items():
        status_style = "green" if health["status"] == "healthy" else "yellow"
        table.add_row(
            name,
            Text(health["status"], style=status_style),
            str(health["requests_total"]),
            str(health["errors_total"]),
            f"{health['avg_duration_ms']:.0f}ms",
        )

    console.print(table)


def print_result(result: Any) -> None:
    """Display an agent result."""
    status_color = {"success": "green", "error": "red", "needs_approval": "yellow"}.get(
        result.status, "white"
    )

    header = Text()
    header.append(f"[{result.agent_name.upper()}]", style="bold cyan")
    header.append(f" ({result.status})", style=status_color)
    header.append(f" | {result.duration_ms}ms", style="dim")
    if result.tokens_used:
        header.append(f" | {result.tokens_used} tokens", style="dim")

    console.print(header)
    console.print(Panel(Markdown(result.output), border_style="bright_cyan", padding=(1, 2)))

    if result.sources:
        console.print("\n[dim]Sources:[/dim]")
        for src in result.sources:
            console.print(f"  [dim]- {src.get('title', 'Unknown')} ({src.get('section', '')})[/dim]")


def run_demo(orchestrator: Any) -> None:
    """Run a demo showing all agents in action."""
    console.print("\n[bold bright_cyan]Running Demo Mode[/bold bright_cyan]\n")

    demo_queries = [
        ("Knowledge Agent", "What is Phiant's leave policy for employees in Kenya?"),
        ("HR Agent", "Check leave balance for jane@phiant.com"),
        ("Identity Agent", "Look up user peter@phiant.com in Entra ID"),
        ("Docs Agent", "Search documentation for deployment runbook"),
        ("Automation Agent", "List available automation playbooks"),
        ("Onboarding Agent", "Show onboarding checklist"),
    ]

    async def run_all():
        for agent_name, query in demo_queries:
            console.print(f"\n[bold yellow]--- {agent_name} ---[/bold yellow]")
            console.print(f'[dim]Query: "{query}"[/dim]\n')
            result = await orchestrator.process(query=query, user_id="demo")
            print_result(result)

    asyncio.run(run_all())
