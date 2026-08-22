"""PhiRAG Verb, Task, and Spec enumerations."""

from enum import Enum


class PhiRAGVerb(str, Enum):
    """Verbs supported by the PhiRAG Knowledge Retrieval agent."""

    RETRIEVE = "retrieve"
    SEARCH = "search"
    GENERATE = "generate"
    GENERATE_ANSWER = "generate_answer"
    ANSWER_QUERY = "answer_query"
    INDEX = "index"
    CHUNK = "chunk"


class PhiRAGTask(str, Enum):
    KNOWLEDGE_RETRIEVAL = "knowledge_retrieval"
    CONTEXT_AUGMENTATION = "context_augmentation"


class PhiRAGSpec(str, Enum):
    RETRIEVAL_AUGMENTED_GENERATION_V1 = "RETRIEVAL_AUGMENTED_GENERATION_V1"
