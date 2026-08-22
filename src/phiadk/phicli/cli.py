"""PhiCLI — Command Line Interface and Palantir-Style Developer Toolchain.

Commands:
    phi agents list               — List all active domain agents, layers, and specs
    phi topo inspect <agent>      — Inspect agent topology, simplicial structure, and MDX
    phi generate-spec             — Auto-generate and validate agent schema.json definitions
    phi generate-docs             — Compile MDX topology docs into platform documentation
    phi version set <version>     — Set version across agents and platform schemas
    phi qml run <circuit>         — Execute Quantum Model Language simulation & Born measurement
    phi query vql/rql/oql/qml     — Run multi-model queries
    phi kv get/put/keys           — Key-value operations
    phi git log/diff/refs         — Git-core repository operations
    phi log tail                  — Stream real-time structured logs
    phi server start              — Start the PhiADK AIP server
    phi repl                      — Interactive agent REPL session
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path
from typing import Any, List, Optional

from phiadk.client import PhiADKClient


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="phi", description="PhiADK CLI — Palantir-Style Ontologylogy Platform Toolchain")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # ── phi agents ───────────────────────────────────────────────────
    agents_parser = subparsers.add_parser("agents", help="Manage and inspect domain agents")
    agents_sub = agents_parser.add_subparsers(dest="subcommand")
    agents_sub.add_parser("list", help="List registered domain agents and specs")

    # ── phi topo ─────────────────────────────────────────────────────
    topo_parser = subparsers.add_parser("topo", help="Ontologylogy operations and inspection")
    topo_sub = topo_parser.add_subparsers(dest="subcommand")
    inspect_p = topo_sub.add_parser("inspect", help="Inspect agent topological architecture")
    inspect_p.add_argument("agent", help="Agent identifier (e.g. phione, phical)")

    # ── phi generate-agent ───────────────────────────────────────────
    gen_agent = subparsers.add_parser("generate-agent", help="Scaffold a complete new domain agent package")
    gen_agent.add_argument("agent_name", help="Name of the agent (e.g. phinet, phisec)")
    gen_agent.add_argument("--domain", default="custom", help="Domain area")
    gen_agent.add_argument("--layer", default="application", help="Layer (engine, data, application, infrastructure, executive)")
    gen_agent.add_argument("--version", default="1.0.0", help="Initial version (e.g. 1.0.0)")
    gen_agent.add_argument("--description", default="Custom generated domain agent", help="Agent description")
    gen_agent.add_argument("--verbs", default="execute,status", help="Comma-separated verbs")

    # ── phi generate-spec ────────────────────────────────────────────
    subparsers.add_parser("generate-spec", help="Auto-generate and validate agent schema.json specifications")

    # ── phi generate-docs ────────────────────────────────────────────
    subparsers.add_parser("generate-docs", help="Compile and sync MDX topology documentation")

    # ── phi version ──────────────────────────────────────────────────
    ver_parser = subparsers.add_parser("version", help="Platform and agent version management")
    ver_sub = ver_parser.add_subparsers(dest="subcommand")
    ver_set = ver_sub.add_parser("set", help="Set version across all agents and schemas")
    ver_set.add_argument("version_str", help="Semantic version (e.g. 1.0.0)")

    # ── phi qml ──────────────────────────────────────────────────────
    qml_parser = subparsers.add_parser("qml", help="Quantum Model Language execution")
    qml_sub = qml_parser.add_subparsers(dest="subcommand")
    qml_run = qml_sub.add_parser("run", help="Execute quantum circuit and Born measurement")
    qml_run.add_argument("--circuit", default="bell_state", help="Circuit identifier")
    qml_run.add_argument("--gates", default="H:0,CNOT:0:1", help="Comma-separated gates (e.g. H:0,CNOT:0:1)")
    qml_run.add_argument("--threshold", type=float, default=0.05, help="Decoherence threshold")

    # ── phi kv ───────────────────────────────────────────────────────
    kv_parser = subparsers.add_parser("kv", help="Key-value operations")
    kv_sub = kv_parser.add_subparsers(dest="subcommand")
    
    put_p = kv_sub.add_parser("put", help="Store a key-value record")
    put_p.add_argument("collection", help="Collection name")
    put_p.add_argument("key", help="Record key")
    put_p.add_argument("value", help="Record value (JSON or string)")

    get_p = kv_sub.add_parser("get", help="Retrieve record value")
    get_p.add_argument("collection", help="Collection name")
    get_p.add_argument("key", help="Record key")

    keys_p = kv_sub.add_parser("keys", help="List collection keys")
    keys_p.add_argument("collection", help="Collection name")

    # ── phi git ──────────────────────────────────────────────────────
    git_parser = subparsers.add_parser("git", help="Git-core storage inspection")
    git_sub = git_parser.add_subparsers(dest="subcommand")
    
    log_p = git_sub.add_parser("log", help="Display commit log")
    log_p.add_argument("--ref", default="refs/heads/main", help="Target branch/ref")

    refs_p = git_sub.add_parser("refs", help="List repository refs")

    # ── phi log ──────────────────────────────────────────────────────
    log_parser = subparsers.add_parser("log", help="Telemetry and logs")
    log_sub = log_parser.add_subparsers(dest="subcommand")
    tail_p = log_sub.add_parser("tail", help="Tail recent log records")
    tail_p.add_argument("-n", "--count", type=int, default=10, help="Number of records to tail")

    # ── phi server ───────────────────────────────────────────────────
    srv_parser = subparsers.add_parser("server", help="PhiADK AIP Platform Server")
    srv_sub = srv_parser.add_subparsers(dest="subcommand")
    srv_start = srv_sub.add_parser("start", help="Start FastAPI AIP server and Dashboard")
    srv_start.add_argument("--host", default="127.0.0.1", help="Bind host")
    srv_start.add_argument("--port", type=int, default=8000, help="Bind port")

    # ── phi mcp ──────────────────────────────────────────────────────
    mcp_parser = subparsers.add_parser("mcp", help="Model Context Protocol (MCP) Server")
    mcp_sub = mcp_parser.add_subparsers(dest="subcommand")
    mcp_sub.add_parser("start", help="Start MCP server in stdio transport mode")

    # ── phi repl ─────────────────────────────────────────────────────
    subparsers.add_parser("repl", help="Start interactive agent REPL")

    return parser


def main(args: Optional[List[str]] = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    parser = build_parser()
    opts = parser.parse_args(args)
    client = PhiADKClient()

    if opts.command == "agents":
        if opts.subcommand == "list" or not opts.subcommand:
            print("\n Registered Domain Agents (11)")
            print("=" * 70)
            for aid, agent in client.agents.items():
                card = agent.card
                specs = len(card.specs) if card else 0
                tasks = len(card.tasks) if card else 0
                print(f" • {aid.upper():10} | {agent.agent_name:12} | Layer: {agent.layer.value:14} | v{agent.version} | Specs: {specs} | Tasks: {tasks}")
            print("=" * 70)
            return 0

    elif opts.command == "topo":
        if opts.subcommand == "inspect":
            aid = opts.agent.lower()
            card = client.phidoc.Ontologylogy.render_topology_card(aid)
            if card.get("found"):
                print(f"\n Ontologylogical Architecture for '{aid.upper()}'")
                print("=" * 70)
                print(card.get("raw_mdx", ""))
                print("=" * 70)
            else:
                print(f" Ontologylogy card for agent '{aid}' not found.")
            return 0

    elif opts.command == "generate-agent":
        from phiadk.phicli.scaffold import scaffold_agent
        verbs = [v.strip() for v in opts.verbs.split(",") if v.strip()]
        res = scaffold_agent(
            agent_id=opts.agent_name,
            domain=opts.domain,
            layer=opts.layer,
            version=opts.version,
            description=opts.description,
            verbs=verbs,
        )
        print(f"\n ✓ Successfully scaffolded agent '{res['agent_id']}' (v{res['version']}) with {res['files_created']} files:")
        print(f"   Directory: {res['directory']}\n")
        return 0

    elif opts.command == "generate-spec":
        print("\n Auto-generating schema.json specifications...")
        src_phiadk = Path(__file__).parent.parent
        count = 0
        for p in src_phiadk.glob("phi*/schema.json"):
            aid = p.parent.name
            agent = client.agents.get(aid)
            if agent and agent.card:
                with open(p, "w", encoding="utf-8") as f:
                    json.dump(agent.card.to_dict(), f, indent=2)
                print(f"  [OK] Updated spec: {p.relative_to(src_phiadk)}")
                count += 1
        print(f" Successfully generated {count} agent schema specs.\n")
        return 0

    elif opts.command == "generate-docs":
        print("\n Compiling MDX topology cards...")
        agent_ids = client.phidoc.Ontologylogy.list_topologies()
        for aid in agent_ids:
            c = client.phidoc.Ontologylogy.render_topology_card(aid)
            print(f"  [OK] Compiled topo: {aid} (has_mermaid={c.get('has_mermaid')})")
        print(f" Successfully compiled {len(agent_ids)} topology documents.\n")
        return 0

    elif opts.command == "version":
        if opts.subcommand == "set":
            v = opts.version_str
            print(f"\n Setting platform version to {v}...")
            for aid, agent in client.agents.items():
                agent.version = v
                if agent.card:
                    agent.card.version = v
            print(f" Updated all 11 agents and cards to v{v}.\n")
            return 0

    elif opts.command == "qml":
        if opts.subcommand == "run" or not opts.subcommand:
            print(f"\n Executing Quantum Model Language on circuit '{opts.circuit}'...")
            q = client.qml(opts.circuit).superposition(["|00⟩", "|01⟩", "|10⟩", "|11⟩"])
            for g in opts.gates.split(","):
                parts = g.strip().split(":")
                if parts and parts[0]:
                    name = parts[0].upper()
                    if name == "H" and len(parts) > 1:
                        q.apply_gate("H", qubit=int(parts[1]))
                    elif name == "X" and len(parts) > 1:
                        q.apply_gate("X", qubit=int(parts[1]))
                    elif name == "CNOT" and len(parts) > 2:
                        q.entangle(int(parts[1]), int(parts[2]))
            res = q.born_measurement(threshold=opts.threshold).execute()
            print(f" Born-Rule Distribution (Decoherence Threshold = {opts.threshold}):")
            for lbl, p in res.born_distribution.items():
                print(f"   {lbl}: {p * 100:.2f}%")
            print(f" Collapsed Eigenstate: {res.collapsed_state}\n")
            return 0

    elif opts.command == "kv":
        if opts.subcommand == "put":
            client.phiora.Store.put(opts.collection, opts.key, opts.value)
            print(f" OK: Set {opts.collection}:{opts.key}")
            return 0
        elif opts.subcommand == "get":
            val = client.phiora.Store.get(opts.collection, opts.key)
            print(json.dumps(val, indent=2) if val is not None else " null")
            return 0
        elif opts.subcommand == "keys":
            keys = client.phiora.Store.keys(opts.collection)
            for k in keys:
                print(f" • {k}")
            return 0

    elif opts.command == "git":
        if opts.subcommand == "log":
            commits = client.phigit.Commits.log(opts.ref)
            print(f"\n Git Commit Log ({opts.ref})")
            print("-" * 60)
            for c in commits:
                print(f" commit {c.sha1}")
                print(f" Author: {c.author}")
                print(f" Date:   {c.created_at.isoformat()}")
                print(f"\n    {c.message}\n")
            return 0
        elif opts.subcommand == "refs":
            refs = client.phigit.Refs.list()
            if isinstance(refs, dict):
                for name, sha1 in refs.items():
                    print(f" {name:30} -> {sha1}")
            else:
                for r in refs:
                    name = getattr(r, "name", str(r))
                    target = getattr(r, "target_sha1", "")
                    print(f" {name:30} -> {target}")
            return 0

    elif opts.command == "log":
        if opts.subcommand == "tail":
            records = client.philog.Telemetry.tail(opts.count)
            print(f"\n Live Telemetry Tail ({len(records)} entries)")
            print("-" * 70)
            for r in records:
                print(f" [{r.timestamp.strftime('%H:%M:%S')}] [{r.level.value:5}] [{r.logger_name:12}] {r.message}")
            return 0

    elif opts.command == "server":
        if opts.subcommand == "start":
            import uvicorn
            from phiadk.phiapi.app import app
            print(f"\n Starting PhiADK AIP Server on http://{opts.host}:{opts.port} ...\n")
            uvicorn.run(app, host=opts.host, port=opts.port)
            return 0

    elif opts.command == "mcp":
        if opts.subcommand == "start":
            from src.mcp.server import MCPServer
            mcp_srv = MCPServer(client=client)
            print("\n Starting PhiADK MCP Server (JSON-RPC stdio transport)...", file=sys.stderr)
            asyncio.run(mcp_srv.run_stdio())
            return 0

    elif opts.command == "repl":
        print("\n Starting PhiADK Interactive REPL...")
        print(" Type 'help', 'agents', 'exit' or agent verb queries.\n")
        while True:
            try:
                line = input("phi> ").strip()
                if not line or line in ("exit", "quit"):
                    break
                elif line == "agents":
                    for aid in client.agents:
                        print(f" • {aid}")
                elif line == "help":
                    print(" Commands: agents, exit, or '<agent> <verb>'")
                else:
                    parts = line.split()
                    aid = parts[0]
                    verb = parts[1] if len(parts) > 1 else "info"
                    agent = client.agents.get(aid)
                    if agent:
                        ctx = asyncio.run(agent.execute_verb(verb, {}))
                        print(json.dumps(ctx.results, indent=2))
                    else:
                        print(f" Unknown agent: {aid}")
            except (KeyboardInterrupt, EOFError):
                break
        return 0

    parser.print_help()
    return 0


run_cli = main


if __name__ == "__main__":
    sys.exit(main())
