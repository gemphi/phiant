---
outline: deep
---

# PhiLLM

> Language model endpoint provider, parameter configuration, token counting, and multi-provider inference.

| | |
|---|---|
| **ID** | `phillm` |
| **Class** | `PhiLLMAgent` / `PhiLLMClient` |
| **Extends** | `PhiAgent` |
| **Layer** | Engine |
| **Domain** | `model_access` |
| **File** | `phiegg/phillm/` |
| **Schema** | `phiegg/phillm/schema.json` |

## What PhiLLM Does

PhiLLM is the **model abstraction and inference layer**. It manages credentials, endpoints, parameter profiles (temperature, max tokens, context window), token counting, usage tracking, streaming, and raw response extraction for OpenAI, Anthropic, Gemini, and local Ollama models.

## Tasks & Verbs

### `inference` - Model Inference Operations
| Verb | Description | Parameters |
|------|-------------|------------|
| `complete` | Run chat completion against active model | `prompt: str, model: str` |
| `embed` | Generate dense vector embeddings for input text | `text: str, model: str` |
| `count_tokens` | Count tokens for given input text | `text: str` |

### `configuration` - Model Settings & Usage
| Verb | Description | Parameters |
|------|-------------|------------|
| `get_config` | Retrieve active model profile configuration | - |
| `set_params` | Hot-swap temperature, max tokens, or model | `temperature: float, max_tokens: int, model: str` |
| `get_usage` | Retrieve aggregate token consumption metrics | - |

### `endpoint_health` - Availability & Auth
| Verb | Description | Parameters |
|------|-------------|------------|
| `ping` | Check if model API endpoint is reachable | - |
| `validate` | Validate credentials and model permissions | - |

## Specs

| Spec | Description | Required Task |
|------|-------------|---------------|
| `LLM_MODEL_ACCESS_V1` | Multi-provider inference, embedding generation, streaming, parameter hot-swapping, and token tracking | `inference`, `configuration`, `endpoint_health` |

## Dependencies

| Agent | Why |
|-------|-----|
| `phiora` | Resolves model profiles and persistence |
