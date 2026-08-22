"""PhiCal Training morphisms.

Training graph adapter inspired by phi-oml's training module.  Models
training as a series of morphisms that transform model state through
gradient-based optimisation steps.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from phiegg._core.topology import Morphism, Space
from phiegg._core.model_base import ModelBase


@dataclass
class TrainingStep(ModelBase):
    """A single training step — a morphism from state_t to state_{t+1}."""

    _model_type: str = "training_step"
    epoch: int = 0
    loss: float = 0.0
    learning_rate: float = 0.001
    metrics: Dict[str, float] = field(default_factory=dict)


class TrainingClient:
    """Training morphisms over model state spaces.

    Orchestrates training loops as sequences of morphisms that
    transform a model's parameter space.
    """

    def __init__(self) -> None:
        self._sessions: Dict[str, List[TrainingStep]] = {}

    async def morph_train(
        self,
        model_name: str,
        *,
        epochs: int = 10,
        learning_rate: float = 0.001,
        data_space: str = "training_data",
    ) -> Morphism:
        """Execute a training morphism — transforms model parameters
        through gradient descent over the data space.

        :param model_name: Name of the model to train.
        :param epochs: Number of training epochs.
        :param learning_rate: Initial learning rate.
        :param data_space: Source data space for training.
        :returns: A ``Morphism`` with training results.
        """
        steps: List[TrainingStep] = []
        loss = 1.0

        for epoch in range(epochs):
            # Simulated exponential decay loss
            loss *= 0.85
            step = TrainingStep(
                epoch=epoch,
                loss=round(loss, 6),
                learning_rate=learning_rate,
                metrics={
                    "accuracy": round(1.0 - loss * 0.5, 4),
                    "gradient_norm": round(loss * 2.0, 4),
                },
            )
            steps.append(step)

        self._sessions[model_name] = steps

        morphism = Morphism(
            morphism_type="train",
            source_space=data_space,
            target_space="model_space",
            parameters={
                "model_name": model_name,
                "epochs": epochs,
                "learning_rate": learning_rate,
            },
        )
        morphism.complete({
            "final_loss": steps[-1].loss if steps else 0.0,
            "final_accuracy": steps[-1].metrics.get("accuracy", 0.0) if steps else 0.0,
            "total_steps": len(steps),
            "steps": [
                {"epoch": s.epoch, "loss": s.loss, "metrics": s.metrics}
                for s in steps
            ],
        })
        return morphism

    async def get_history(self, model_name: str) -> List[TrainingStep]:
        """Retrieve the training history for a model.

        :param model_name: Model name.
        :returns: List of ``TrainingStep`` records.
        """
        return self._sessions.get(model_name, [])
