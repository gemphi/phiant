"""PhiDoc Verb enumeration - typed action verbs."""

from enum import Enum


class PhiDocVerb(str, Enum):
    """Verbs supported by the PhiDoc Documentation agent."""

    SEARCH_DOCS = "search_docs"
    SEARCH_PAGES = "search_pages"
    SEARCH = "search"
    CREATE_PAGE = "create_page"
    SYNC_KNOWLEDGE_BASE = "sync_knowledge_base"
    GET_TOPOLOGY = "get_topology"
    LIST_TOPOLOGIES = "list_topologies"
