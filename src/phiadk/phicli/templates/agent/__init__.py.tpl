"""{{agent_name}} Agent package."""

from phiadk.{{agent_id}}.agent import {{class_name}} as {{class_name}}
from phiadk.{{agent_id}}._client import {{client_name}} as {{client_name}}
from phiadk.{{agent_id}}._client import {{async_client_name}} as {{async_client_name}}
from phiadk.{{agent_id}}.card import {{card_name}} as {{card_name}}
from phiadk.{{agent_id}}.verbs import {{agent_name}}Verb as {{agent_name}}Verb
from phiadk.{{agent_id}}.tasks import {{agent_name}}Task as {{agent_name}}Task
from phiadk.{{agent_id}}.specs import {{agent_name}}Spec as {{agent_name}}Spec

__all__ = [
    "{{class_name}}",
    "{{client_name}}",
    "{{async_client_name}}",
    "{{card_name}}",
    "{{agent_name}}Verb",
    "{{agent_name}}Task",
    "{{agent_name}}Spec",
]
