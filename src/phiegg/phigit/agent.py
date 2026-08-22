"""PhiGit Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiegg._core.agent_base import AgentContext, PhiAgent
from phiegg._core.agent_card import AgentLayer
from phiegg.phigit.card import PHIGIT_CARD
from phiegg.phigit.engine import GitEngine
from phiegg.phigit.models import TreeEntry
from phiegg.phigit.verbs import PhiGitVerb


class PhiGitAgent(PhiAgent):
    """The PhiGit Internal Storage Engine Agent."""

    agent_id = "phigit"
    agent_name = "PhiGit"
    domain = "git_engine"
    layer = AgentLayer.DATA
    version = "1.0.0"
    description = "Internal git-core engine — content-addressable storage, SHA-1 object store, refs, trees, and commits."
    card = PHIGIT_CARD

    def __init__(self, data_resolver=None, engine: Optional[GitEngine] = None) -> None:
        super().__init__(data_resolver=data_resolver)
        self.engine = engine or GitEngine()

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine storage operation."""
        verb = ctx.verb or ctx.parameters.get("verb", "store_blob")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "space": "git_object_space",
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute Git engine operation."""
        verb = ctx.verb
        params = ctx.parameters

        if verb == PhiGitVerb.STORE_BLOB:
            content = params.get("content", params.get("data"))
            blob = self.engine.store_blob(content)
            ctx.results["output"] = blob.to_dict()
        elif verb == PhiGitVerb.GET_BLOB:
            sha1 = params.get("sha1", "")
            blob = self.engine.get_blob(sha1)
            ctx.results["output"] = blob.to_dict() if blob else None
        elif verb == PhiGitVerb.STORE_TREE:
            raw_entries = params.get("entries", [])
            entries = [
                e if isinstance(e, TreeEntry) else TreeEntry(**e)
                for e in raw_entries
            ]
            tree = self.engine.store_tree(entries)
            ctx.results["output"] = tree.to_dict()
        elif verb == PhiGitVerb.GET_TREE:
            sha1 = params.get("sha1", "")
            tree = self.engine.get_tree(sha1)
            ctx.results["output"] = tree.to_dict() if tree else None
        elif verb == PhiGitVerb.COMMIT:
            tree_sha1 = params.get("tree_sha1", "")
            msg = params.get("message", "Commit update")
            agent_id = params.get("agent_id", "phigit")
            ver = params.get("version", self.version)
            ref = params.get("ref", "refs/heads/main")
            commit_obj = self.engine.commit(tree_sha1, message=msg, agent_id=agent_id, version=ver, ref=ref)
            ctx.results["output"] = commit_obj.to_dict()
        elif verb == PhiGitVerb.GET_COMMIT:
            sha1 = params.get("sha1", "")
            commit_obj = self.engine.get_commit(sha1)
            ctx.results["output"] = commit_obj.to_dict() if commit_obj else None
        elif verb == PhiGitVerb.LOG:
            ref = params.get("ref", "refs/heads/main")
            max_count = params.get("max_count", 50)
            history = self.engine.log(ref, max_count=max_count)
            ctx.results["output"] = [c.to_dict() for c in history]
        elif verb == PhiGitVerb.DIFF:
            ref_a = params.get("ref_a", "")
            ref_b = params.get("ref_b", "")
            diff_res = self.engine.diff(ref_a, ref_b)
            ctx.results["output"] = diff_res.base_dict() | {
                "added": diff_res.added,
                "modified": diff_res.modified,
                "deleted": diff_res.deleted,
            }
        elif verb == PhiGitVerb.SET_REF:
            name = params.get("name", "refs/heads/main")
            sha1 = params.get("commit_sha1", "")
            self.engine.set_ref(name, sha1)
            ctx.results["output"] = {"name": name, "commit_sha1": sha1}
        elif verb == PhiGitVerb.GET_REF:
            name = params.get("name", "HEAD")
            sha1 = self.engine.get_ref(name)
            ctx.results["output"] = {"name": name, "commit_sha1": sha1}
        elif verb == PhiGitVerb.LIST_REFS:
            ctx.results["output"] = self.engine.list_refs()
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify SHA-1 integrity."""
        output = ctx.results.get("output")
        is_valid = output is not None and (not isinstance(output, dict) or output.get("status") != "unsupported_verb")
        ctx.confidence = 1.0 if is_valid else 0.0
        ctx.results["eval"] = {
            "status": "valid" if is_valid else "invalid",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or scale."""
        return ctx
