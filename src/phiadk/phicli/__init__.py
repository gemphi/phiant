"""PhiCLI - Command Line Interface package for PhiADK."""

from phiadk.phicli.cli import build_parser as build_parser
from phiadk.phicli.cli import run_cli as run_cli

__all__ = ["run_cli", "build_parser"]
