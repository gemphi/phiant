"""PhiGit Engine — internal content-addressable storage operations.

Handles blobs, trees, commits, refs, and diffing.
"""

from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional, Union

from phiegg.phigit.models import Blob, Commit, DiffResult, ObjectType, Ref, Tree, TreeEntry

logger = logging.getLogger(__name__)


class GitEngine:
    """Core in-memory and persisted content-addressed object store."""

    def __init__(self) -> None:
        self._objects: Dict[str, Union[Blob, Tree, Commit]] = {}
        self._refs: Dict[str, str] = {"HEAD": "refs/heads/main", "refs/heads/main": ""}

    # ── Object Storage (Blobs & Trees) ───────────────────────────────

    def store_blob(self, content: Any) -> Blob:
        """Store content as a content-addressed blob."""
        blob = Blob(content=content)
        self._objects[blob.sha1] = blob
        return blob

    def get_blob(self, sha1: str) -> Optional[Blob]:
        """Retrieve blob by SHA-1 hash."""
        obj = self._objects.get(sha1)
        return obj if isinstance(obj, Blob) else None

    def store_tree(self, entries: List[TreeEntry]) -> Tree:
        """Create and store a tree object from entries."""
        tree = Tree(entries=entries)
        self._objects[tree.sha1] = tree
        return tree

    def get_tree(self, sha1: str) -> Optional[Tree]:
        """Retrieve tree by SHA-1 hash."""
        obj = self._objects.get(sha1)
        return obj if isinstance(obj, Tree) else None

    # ── Commits & History ────────────────────────────────────────────

    def commit(
        self,
        tree_sha1: str,
        *,
        message: str = "Update state",
        parents: Optional[List[str]] = None,
        author: str = "system",
        agent_id: str = "phigit",
        version: str = "1.0.0",
        ref: str = "refs/heads/main",
    ) -> Commit:
        """Create a new commit snapshot and advance the target ref."""
        parent_list = parents if parents is not None else ([self.get_ref(ref)] if self.get_ref(ref) else [])
        parent_list = [p for p in parent_list if p]  # filter empty

        commit_obj = Commit(
            tree_sha1=tree_sha1,
            parent_sha1s=parent_list,
            author=author,
            agent_id=agent_id,
            version=version,
            message=message,
        )
        self._objects[commit_obj.sha1] = commit_obj

        # Update ref
        self.set_ref(ref, commit_obj.sha1)
        return commit_obj

    def get_commit(self, sha1: str) -> Optional[Commit]:
        """Retrieve commit by SHA-1 hash."""
        obj = self._objects.get(sha1)
        return obj if isinstance(obj, Commit) else None

    def log(self, start_ref_or_sha1: str = "refs/heads/main", *, max_count: int = 50) -> List[Commit]:
        """Traverse commit history backward from a ref or commit SHA-1."""
        sha1 = self.get_ref(start_ref_or_sha1) or start_ref_or_sha1
        history: List[Commit] = []
        visited = set()

        curr_sha1: Optional[str] = sha1
        while curr_sha1 and curr_sha1 not in visited and len(history) < max_count:
            visited.add(curr_sha1)
            commit = self.get_commit(curr_sha1)
            if not commit:
                break
            history.append(commit)
            curr_sha1 = commit.parent_sha1s[0] if commit.parent_sha1s else None

        return history

    # ── Refs (Branches & Tags) ───────────────────────────────────────

    def set_ref(self, name: str, commit_sha1: str) -> None:
        """Point a ref name to a commit SHA-1."""
        self._refs[name] = commit_sha1

    def get_ref(self, name: str) -> Optional[str]:
        """Resolve a ref name to its commit SHA-1."""
        if name in self._refs:
            val = self._refs[name]
            # Handle symbolic ref (e.g. HEAD -> refs/heads/main)
            if val.startswith("refs/"):
                return self._refs.get(val, "")
            return val
        return None

    def list_refs(self) -> Dict[str, str]:
        """List all named references."""
        return dict(self._refs)

    # ── Diffing ──────────────────────────────────────────────────────

    def diff(self, ref_or_sha1_a: str, ref_or_sha1_b: str) -> DiffResult:
        """Compute differences between two commits or trees."""
        commit_a = self.get_commit(self.get_ref(ref_or_sha1_a) or ref_or_sha1_a)
        commit_b = self.get_commit(self.get_ref(ref_or_sha1_b) or ref_or_sha1_b)

        tree_sha1_a = commit_a.tree_sha1 if commit_a else ref_or_sha1_a
        tree_sha1_b = commit_b.tree_sha1 if commit_b else ref_or_sha1_b

        tree_a = self.get_tree(tree_sha1_a)
        tree_b = self.get_tree(tree_sha1_b)

        entries_a = {e.name: e.sha1 for e in tree_a.entries} if tree_a else {}
        entries_b = {e.name: e.sha1 for e in tree_b.entries} if tree_b else {}

        added = {k: sha for k, sha in entries_b.items() if k not in entries_a}
        deleted = {k: sha for k, sha in entries_a.items() if k not in entries_b}
        modified = {
            k: (entries_a[k], entries_b[k])
            for k in entries_a
            if k in entries_b and entries_a[k] != entries_b[k]
        }

        return DiffResult(added=added, modified=modified, deleted=deleted)
