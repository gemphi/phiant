"""PhiLLM Agent implementation.

Extends the universal ``PhiAgent`` lifecycle:
    envision → apply → eval → iterate/scale
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from phiadk._core.agent_base import AgentContext, PhiAgent
from phiadk._core.agent_card import AgentLayer
from phiadk.agents.phillm.card import PHILLM_CARD
from phiadk.agents.phillm.open_ai_model import OpenAiModelClient
from phiadk.agents.phillm.verbs import PhiLLMVerb


class PhiLLMAgent(PhiAgent):
    """The PhiLLM Model Access Agent."""

    agent_id = "phillm"
    agent_name = "PhiLLM"
    domain = "model_access"
    layer = AgentLayer.ENGINE
    description = "LLM endpoint provider, parameter configuration, token counting, and multi-provider inference."
    card = PHILLM_CARD

    def __init__(self, data_resolver=None) -> None:
        super().__init__(data_resolver=data_resolver)
        from phiadk._core.auth import TokenAuth
        self.openai = OpenAiModelClient(auth=TokenAuth("phi_local"), hostname="api.phient.com")
        self._active_model = "gpt-4o"
        self._temperature = 0.7
        self._max_tokens = 4096
        self._usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}

    async def envision(self, ctx: AgentContext) -> AgentContext:
        """Phase 1: Determine model operation."""
        verb = ctx.verb or ctx.parameters.get("verb", "complete")
        ctx.verb = verb
        ctx.results["plan"] = {
            "agent": self.agent_id,
            "target_verb": verb,
            "model": ctx.parameters.get("model", self._active_model),
        }
        return ctx

    async def apply(self, ctx: AgentContext) -> AgentContext:
        """Phase 2: Execute completion, embedding, or configuration mutation."""
        verb = ctx.verb
        params = ctx.parameters
        model = params.get("model", self._active_model)

        if verb in (PhiLLMVerb.COMPLETE, PhiLLMVerb.CHAT):
            prompt = params.get("prompt", params.get("query", ""))
            if str(model).lower().startswith("phiano"):
                import urllib.request
                import json
                try:
                    req_data = json.dumps({"text": prompt}).encode("utf-8")
                    req = urllib.request.Request(
                        "http://127.0.0.1:3005/api/chat",
                        data=req_data,
                        headers={"Content-Type": "application/json"},
                    )
                    with urllib.request.urlopen(req, timeout=10) as response:
                        res = json.loads(response.read().decode("utf-8"))
                        resp_content = res.get("response", "")
                        prompt_toks = len(prompt.split())
                        resp_toks = len(resp_content.split())
                        self._usage["prompt_tokens"] += prompt_toks
                        self._usage["completion_tokens"] += resp_toks
                        self._usage["total_tokens"] += (prompt_toks + resp_toks)
                        ctx.results["output"] = {
                            "content": resp_content,
                            "model": "phiano-manifold",
                            "speech_act": res.get("speech_act"),
                            "direction_of_fit": res.get("direction_of_fit"),
                            "coherence": res.get("coherence"),
                            "vocabulary": res.get("vocabulary"),
                            "usage": {
                                "prompt_tokens": prompt_toks,
                                "completion_tokens": resp_toks,
                                "total_tokens": prompt_toks + resp_toks,
                            },
                        }
                        return ctx
                except Exception:
                    pass

            resp = self.openai.create_chat_completion(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=params.get("temperature", self._temperature),
                max_tokens=params.get("max_tokens", self._max_tokens),
            )
            self._usage["prompt_tokens"] += resp.usage.prompt_tokens
            self._usage["completion_tokens"] += resp.usage.completion_tokens
            self._usage["total_tokens"] += resp.usage.total_tokens
            ctx.results["output"] = {
                "content": resp.content,
                "model": resp.model,
                "usage": resp.usage.base_dict() | {"total_tokens": resp.usage.total_tokens},
            }
        elif verb in (PhiLLMVerb.EMBED, PhiLLMVerb.EMBEDDINGS):
            text = params.get("text", params.get("input", ""))
            resp = self.openai.create_embeddings(model=model, input=text)
            ctx.results["output"] = {
                "embeddings": [d.embedding for d in resp.data],
                "model": resp.model,
            }
        elif verb == PhiLLMVerb.COUNT_TOKENS:
            text = params.get("text", "")
            tokens = len(text.split()) * 2  # Approximate / mock
            ctx.results["output"] = {"tokens": tokens, "char_count": len(text)}
        elif verb == PhiLLMVerb.GET_CONFIG:
            ctx.results["output"] = {
                "model": self._active_model,
                "temperature": self._temperature,
                "max_tokens": self._max_tokens,
            }
        elif verb == PhiLLMVerb.SET_PARAMS:
            if "temperature" in params:
                self._temperature = float(params["temperature"])
            if "max_tokens" in params:
                self._max_tokens = int(params["max_tokens"])
            if "model" in params:
                self._active_model = str(params["model"])
            ctx.results["output"] = {"status": "updated", "model": self._active_model}
        elif verb == PhiLLMVerb.GET_USAGE:
            ctx.results["output"] = dict(self._usage)
        elif verb == PhiLLMVerb.PING:
            ctx.results["output"] = {"status": "pong", "model": self._active_model}
        else:
            ctx.results["output"] = {"status": "unsupported_verb", "verb": verb}

        return ctx

    async def eval(self, ctx: AgentContext) -> AgentContext:
        """Phase 3: Verify completion output validity."""
        output = ctx.results.get("output", {})
        has_content = bool(output and output.get("status") != "unsupported_verb")
        ctx.confidence = 0.95 if has_content else 0.0
        ctx.results["eval"] = {
            "status": "success" if has_content else "error",
            "confidence": ctx.confidence,
        }
        return ctx

    async def iterate(self, ctx: AgentContext) -> AgentContext:
        """Phase 4: Conclude or scale."""
        return ctx


PhiLlmAgent = PhiLLMAgent

