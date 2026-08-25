"""PhiGit - Git-Core Storage Engine agent.

Immutable content-addressable storage, SHA-1 object store, refs,
trees, commits, and diffing.
"""

from phiadk.agents.phigit._client import AsyncPhiGitClient as AsyncPhiGitClient
from phiadk.agents.phigit._client import PhiGitClient as PhiGitClient
from phiadk.agents.phigit.agent import PhiGitAgent as PhiGitAgent
from phiadk.agents.phigit.card import PHIGIT_CARD as PHIGIT_CARD
from phiadk.agents.phigit.engine import GitEngine as GitEngine
from phiadk.agents.phigit.models import Blob as Blob
from phiadk.agents.phigit.models import Commit as Commit
from phiadk.agents.phigit.models import DiffResult as DiffResult
from phiadk.agents.phigit.models import ObjectType as ObjectType
from phiadk.agents.phigit.models import Ref as Ref
from phiadk.agents.phigit.models import Tree as Tree
from phiadk.agents.phigit.models import TreeEntry as TreeEntry

__all__ = [
    "PhiGitClient",
    "AsyncPhiGitClient",
    "PhiGitAgent",
    "PHIGIT_CARD",
    "GitEngine",
    "Blob",
    "Tree",
    "TreeEntry",
    "Commit",
    "Ref",
    "DiffResult",
    "ObjectType",
]
