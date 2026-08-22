# PhiLLM: Language Model Multi-Provider Gateway Agent

`PhiLLM` provides unified inference access across OpenAI, Anthropic, Google Gemini, and local LLMs. It manages prompt formatting, token metrics, parameter overrides, and streaming SSE responses.

---

## 1. Architectural & Inference Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph LR
    subgraph Request["Client Request"]
        Prompt["Prompt: 'Draft onboarding checklist'"]
        Params["Params: model=gpt-4o, temp=0.7"]
    end

    subgraph Router["PhiLLM Provider Router"]
        OpenAI["OpenAI Client"]
        Anthropic["Anthropic Client"]
        Gemini["Gemini Client"]
    end

    Prompt & Params --> Router
    Router --> OpenAI & Anthropic & Gemini
    OpenAI & Anthropic & Gemini --> Response["Response (Token Usage + Content)"]
```

### Flow Diagram
```
[ User / Agent Prompt ]
            │
            ▼
[ PhiLLMAgent.envision() ] ──► (Select active model & resolve provider)
            │
            ▼
[ PhiLLMAgent.apply() ]
            ├─► (COMPLETE / CHAT) ──► Execute chat completion & track token usage
            ├─► (EMBED)           ──► Generate dense text vector embeddings
            ├─► (COUNT_TOKENS)    ──► Approximate token count
            └─► (SET_PARAMS)      ──► Update temperature / max_tokens
            │
            ▼
[ PhiLLMAgent.eval() ] ──► (Verify response non-empty & token within limits)
            │
            ▼
[ PhiLLMAgent.iterate() ] ──► (Return completion payload with usage metadata)
```

---

## 2. Key Components

- **`agent.py`**: `PhiLLMAgent` lifecycle implementation.
- **`open_ai_model.py`**: `OpenAiModelClient` multi-provider bridge.
- **`models.py`**: `ChatCompletionResponse`, `Usage`, `ModelConfig`.
- **`verbs.py`**: `PhiLLMVerb` typed enum constants.
- **`spec.md`**: Formal specification contract.
