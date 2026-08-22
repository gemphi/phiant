"""PhiLLM Task enumeration."""

from enum import Enum


class PhiLLMTask(str, Enum):
    INFERENCE = "inference"
    CONFIGURATION = "configuration"
    ENDPOINT_HEALTH = "endpoint_health"
