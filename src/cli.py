"""CLI - Rich-based terminal interface for the M-KOPA Agent Platform."""

from __future__ import annotations

import asyncio
import sys

from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

from .cli_demo import print_agents_status, print_result, run_demo
from .orchestrator.orchestrator import Orchestrator

console = Console()

BANNER = r"""
 __  __       _  __  ___  ____   _      
|  \/  |     | |/ / / _ \|  _ \ / \     
| |\/| |_____| ' / | | | | |_) / _ \    
| |  | |_____| . \ | |_| |  __/ ___ \   
|_|  |_|     |_|\_\ \___/|_| /_/   \_\  

  AI Ops Agent Platform v1.0.0
  Multi-Agent Ecosystem for Internal Operations
"""


def print_banner() -> None:
    console.print(Panel(BANNER, border_style="bright_cyan", padding=(0, 2)))


async def interactive_loop(orchestrator: Orchestrator) -> None:
    console.print("\n[bright_cyan]Type your query below. Commands: /status, /agents, /help, /quit[/bright_cyan]\n")

    while True:
        try:
            query = Prompt.ask("[bold cyan]>[/bold cyan]")
        except (KeyboardInterrupt, EOFError):
            console.print("\n[dim]Goodbye![/dim]")
            break

        if not query.strip():
            continue

        if query.startswith("/"):
            cmd = query.lower().strip()
            if cmd in ("/quit", "/exit", "/q"):
                console.print("[dim]Goodbye![/dim]")
                break
            elif cmd in ("/status", "/agents"):
                print_agents_status(orchestrator)
                continue
            elif cmd == "/help":
                console.print(Panel(
                    "Commands: /status, /agents, /help, /quit\n"
                    'Examples: "What is leave policy?", "Look up user jane@phient.com"',
                    title="Help", border_style="bright_cyan",
                ))
                continue

        with console.status("[bright_cyan]Processing...[/bright_cyan]"):
            result = await orchestrator.process(query=query, user_id="cli-user")

        print_result(result)
        console.print()


def main() -> None:
    """Entry point for the CLI application."""
    if len(sys.argv) > 1 and sys.argv[1] == "serve":
        port = 8000
        if "--port" in sys.argv:
            idx = sys.argv.index("--port")
            if idx + 1 < len(sys.argv):
                port = int(sys.argv[idx + 1])
        import uvicorn
        console.print(f"[bright_cyan]Starting API server on 0.0.0.0:{port}...[/bright_cyan]")
        uvicorn.run("src.api.main:app", host="0.0.0.0", port=port, reload=False)
        return

    print_banner()
    orchestrator = Orchestrator()

    if "--demo" in sys.argv:
        run_demo(orchestrator)
        return

    asyncio.run(interactive_loop(orchestrator))


if __name__ == "__main__":
    main()
