"""PhiAPI — Palantir AIP-style API and Dashboard platform."""

from phiadk.phiapi.app import app as app
from phiadk.phiapi.app import create_app as create_app

__all__ = ["create_app", "app"]
