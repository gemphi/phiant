"""Metrics Collector - Agent and system metrics tracking."""

from __future__ import annotations

import time
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass
class MetricPoint:
    """A single metric data point."""

    name: str
    value: float
    labels: dict[str, str] = field(default_factory=dict)
    timestamp: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


class MetricsCollector:
    """In-memory metrics collector for agent and system monitoring.

    Tracks counters, gauges, and histograms for agent performance,
    RAG pipeline, and connector health.
    """

    def __init__(self) -> None:
        self._counters: dict[str, float] = defaultdict(float)
        self._gauges: dict[str, float] = {}
        self._histograms: dict[str, list[float]] = defaultdict(list)
        self._start_time = time.monotonic()

    def increment(self, name: str, value: float = 1.0, labels: dict[str, str] | None = None) -> None:
        """Increment a counter."""
        key = self._key(name, labels)
        self._counters[key] += value

    def set_gauge(self, name: str, value: float, labels: dict[str, str] | None = None) -> None:
        """Set a gauge value."""
        key = self._key(name, labels)
        self._gauges[key] = value

    def observe(self, name: str, value: float, labels: dict[str, str] | None = None) -> None:
        """Record a histogram observation."""
        key = self._key(name, labels)
        self._histograms[key].append(value)

    def record_agent_request(
        self, agent: str, status: str, duration_ms: int, tokens: int = 0
    ) -> None:
        """Record an agent request with all relevant metrics."""
        self.increment("agent_requests_total", labels={"agent": agent, "status": status})
        self.observe("agent_request_duration_ms", duration_ms, labels={"agent": agent})
        if tokens > 0:
            self.increment("agent_tokens_used_total", tokens, labels={"agent": agent})

    def get_summary(self) -> dict[str, Any]:
        """Get a summary of all metrics."""
        uptime = time.monotonic() - self._start_time

        # Calculate histogram percentiles
        histogram_stats = {}
        for key, values in self._histograms.items():
            if values:
                sorted_vals = sorted(values)
                n = len(sorted_vals)
                histogram_stats[key] = {
                    "count": n,
                    "min": sorted_vals[0],
                    "max": sorted_vals[-1],
                    "avg": sum(sorted_vals) / n,
                    "p50": sorted_vals[int(n * 0.5)],
                    "p95": sorted_vals[int(n * 0.95)] if n >= 20 else sorted_vals[-1],
                    "p99": sorted_vals[int(n * 0.99)] if n >= 100 else sorted_vals[-1],
                }

        return {
            "uptime_seconds": round(uptime, 1),
            "counters": dict(self._counters),
            "gauges": dict(self._gauges),
            "histograms": histogram_stats,
        }

    def get_agent_metrics(self) -> dict[str, Any]:
        """Get agent-specific metrics summary."""
        agents = set()
        for key in list(self._counters.keys()) + list(self._histograms.keys()):
            if "agent=" in key:
                agent = key.split("agent=")[1].split(",")[0].split("}")[0]
                agents.add(agent)

        result = {}
        for agent in agents:
            requests_key = self._key("agent_requests_total", {"agent": agent, "status": "success"})
            errors_key = self._key("agent_requests_total", {"agent": agent, "status": "error"})
            duration_key = self._key("agent_request_duration_ms", {"agent": agent})
            tokens_key = self._key("agent_tokens_used_total", {"agent": agent})

            total_requests = self._counters.get(requests_key, 0) + self._counters.get(errors_key, 0)
            durations = self._histograms.get(duration_key, [])

            result[agent] = {
                "requests_total": int(total_requests),
                "errors": int(self._counters.get(errors_key, 0)),
                "tokens_total": int(self._counters.get(tokens_key, 0)),
                "avg_duration_ms": round(sum(durations) / len(durations), 1) if durations else 0,
            }

        return result

    @staticmethod
    def _key(name: str, labels: dict[str, str] | None = None) -> str:
        """Build a metric key from name and labels."""
        if not labels:
            return name
        label_str = ",".join(f"{k}={v}" for k, v in sorted(labels.items()))
        return f"{name}{{{label_str}}}"


# Global metrics instance
metrics = MetricsCollector()
