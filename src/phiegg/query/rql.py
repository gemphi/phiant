"""PhiEgg RQL (Relational Query Language).

A fluent query builder for structured tabular filtering, projections,
aggregations, and ordering over collections.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Union

from phiegg.phiora.store import StoreClient


@dataclass
class RQLQuery:
    """Represents a compiled Relational Query Language expression."""

    table: str = ""
    columns: Optional[List[str]] = None
    predicates: List[Callable[[Dict[str, Any]], bool]] = field(default_factory=list)
    order_by_col: Optional[str] = None
    descending: bool = False
    limit_count: Optional[int] = None
    group_by_col: Optional[str] = None


class RQL:
    """Fluent query builder for Relational Query Language."""

    def __init__(self, table: str, store_client: Optional[StoreClient] = None) -> None:
        self._query = RQLQuery(table=table)
        self._store = store_client or StoreClient()

    @classmethod
    def from_table(cls, table: str, store_client: Optional[StoreClient] = None) -> "RQL":
        return cls(table=table, store_client=store_client)

    def select(self, columns: List[str]) -> "RQL":
        """Project specific fields."""
        self._query.columns = columns
        return self

    def where(self, predicate_or_clause: Optional[Union[Callable[[Dict[str, Any]], bool], str]] = None, **kwargs: Any) -> "RQL":
        """Filter records by predicate function or key-value criteria."""
        if callable(predicate_or_clause):
            self._query.predicates.append(predicate_or_clause)
        if kwargs:
            self._query.predicates.append(
                lambda row: all(row.get(k) == v for k, v in kwargs.items())
            )
        return self

    def order_by(self, column: str, *, descending: bool = False) -> "RQL":
        """Sort results by a column."""
        self._query.order_by_col = column
        self._query.descending = descending
        return self

    def limit(self, count: int) -> "RQL":
        """Limit the number of records returned."""
        self._query.limit_count = count
        return self

    def group_by(self, column: str) -> "RQL":
        """Aggregate records grouped by a key."""
        self._query.group_by_col = column
        return self

    def execute(self) -> Union[List[Dict[str, Any]], Dict[str, List[Dict[str, Any]]]]:
        """Execute the relational query over the store collection."""
        raw_items = self._store.values(self._query.table)
        rows: List[Dict[str, Any]] = [
            r if isinstance(r, dict) else (r.to_dict() if hasattr(r, "to_dict") else r.__dict__)
            for r in raw_items if r is not None
        ]

        # 1. Apply predicates
        for pred in self._query.predicates:
            rows = [r for r in rows if pred(r)]

        # 2. Ordering
        if self._query.order_by_col:
            rows.sort(
                key=lambda r: str(r.get(self._query.order_by_col, "")),
                reverse=self._query.descending,
            )

        # 3. Limit
        if self._query.limit_count is not None:
            rows = rows[:self._query.limit_count]

        # 4. Projection
        if self._query.columns:
            rows = [
                {k: r.get(k) for k in self._query.columns if k in r}
                for r in rows
            ]

        # 5. Grouping
        if self._query.group_by_col:
            grouped: Dict[str, List[Dict[str, Any]]] = {}
            for r in rows:
                key = str(r.get(self._query.group_by_col, "Unknown"))
                grouped.setdefault(key, []).append(r)
            return grouped

        return rows
