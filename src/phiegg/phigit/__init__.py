"""PhiGit — Git-Core Storage Engine agent.

Immutable content-addressable storage, SHA-1 object store, refs,
trees, commits, and diffing.
"""

from phiegg.phigit._client import AsyncPhiGitClient as AsyncPhiGitClient
from phiegg.phigit._client import PhiGitClient as PhiGitClient
from phiegg.phigit.agent import PhiGitAgent as PhiGitAgent
from phiegg.phigit.card import PHIGIT_CARD as PHIGIT_CARD
from phiegg.phigit.engine import GitEngine as GitEngine
from phiegg.phigit.models import Blob as Blob
from phiegg.phigit.models import Commit as Commit
from phiegg.phigit.models import DiffResult as DiffResult
from phiegg.phigit.models import ObjectType as ObjectType
from phiegg.phigit.models import Ref as Ref
from phiegg.phigit.models import Tree as Tree
from phiegg.phigit.models import TreeEntry as TreeEntry

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
