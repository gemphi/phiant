# PhiLLM: Language Models & Multi-Provider Ontologylogy

PhiLLM encapsulates model endpoints across OpenAI, Anthropic, Gemini, and local LLMs. It manages parameters, token metrics, raw responses, and streaming SSE pipes.

## 1. Provider Multiplexing Ontologylogy

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'background': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#3b82f6', 'clusterBkg': 'transparent', 'clusterBorder': '#475569', 'lineColor': '#60a5fa', 'textColor': '#ffffff', 'primaryTextColor': '#ffffff', 'nodeTextColor': '#ffffff', 'edgeLabelBackground': '#0f172a'}}}%%
graph TD
    Client["Client / Agent"] --> RequestInfo["Typed RequestInfo (Path/Body/Headers)"]
    RequestInfo --> ProviderRouter["Provider Router"]

    subgraph Providers["Model Provider Endpoints"]
        OpenAI["OpenAI (GPT-4o, Embeddings)"]
        Anthropic["Anthropic (Claude 3.5 Sonnet)"]
        Gemini["Google Gemini (1.5 Flash/Pro)"]
        Local["Local / Ollama (Llama 3.3)"]
    end

    ProviderRouter --> OpenAI
    ProviderRouter --> Anthropic
    ProviderRouter --> Gemini
    ProviderRouter --> Local

    Providers --> ResponseDecorators["Response Mode (Typed / Raw / Streaming SSE)"]
```

### Provider Pipeline
```
[ RequestInfo ] ──► [ Provider Router ] ──► [ OpenAI / Anthropic / Gemini ]
                            │
                            ▼
      [ with_raw_response / with_streaming_response ]
```

## 2. Inter-Agent Dependencies & Inheritance

- **Extends**: `PhiAgent`
- **Depends on**: `phiora` (Profile config persistence)
- **Feeds into**: `phirag`, `phimen`, `phidoc`
