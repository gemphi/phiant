"""PhiLLM Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiLLMVerb(str, Enum):
    """Verbs supported by the PhiLLM Language Model agent."""

    COMPLETE = "complete"
    CHAT = "chat"
    EMBED = "embed"
    EMBEDDINGS = "embeddings"
    COUNT_TOKENS = "count_tokens"
    GET_CONFIG = "get_config"
    SET_PARAMS = "set_params"
    GET_USAGE = "get_usage"
    PING = "ping"
    VALIDATE = "validate"


class PhiLLMTask(str, Enum):
    INFERENCE = "inference"
    CONFIGURATION = "configuration"
    ENDPOINT_HEALTH = "endpoint_health"


class PhiLLMSpec(str, Enum):
    LLM_MODEL_ACCESS_V1 = "LLM_MODEL_ACCESS_V1"
