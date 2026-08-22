"""PhiMen Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiMenVerb(str, Enum):
    ASSESS_OBJECTIVE = "assess_objective"
    DELEGATE_STRATEGY = "delegate_strategy"
    SYNTHESIZE_REPORT = "synthesize_report"


class PhiMenTask(str, Enum):
    STRATEGIC_ASSESSMENT = "strategic_assessment"
    EXECUTIVE_ORCHESTRATION = "executive_orchestration"


class PhiMenSpec(str, Enum):
    EXECUTIVE_STRATEGY_ORCHESTRATION_V1 = "EXECUTIVE_STRATEGY_ORCHESTRATION_V1"
