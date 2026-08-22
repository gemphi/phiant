"""Tests for PhiOraDB Topological Spatial Store Engine."""

import pytest
from phiadk.agents.phiora import PhiOraDB, SpatialStore, SpatialRecord, PhiOraClient
from phiadk.client import PhiADKClient


class TestPhiOraSpatialDB:
    """Test suite for PhiOraDB Spatial Store operations."""

    def test_phioradb_spatial_insert_and_count(self):
        db = PhiOraDB(manifold="euclidean_r3")
        assert db.count() == 0

        # Insert spatial entities with 3D coordinates
        e1 = db.insert(
            key="radar_node_01",
            coordinates=[10.0, 20.0, 5.0],
            data={"label": "Sensor Alpha", "power_mw": 150},
            spatial_bounds={"min_x": 9.5, "max_x": 10.5},
        )
        assert e1["key"] == "radar_node_01"
        assert e1["coordinates"] == [10.0, 20.0, 5.0]
        assert db.count() == 1

        db.insert(
            key="radar_node_02",
            coordinates=[12.0, 22.0, 6.0],
            data={"label": "Sensor Beta", "power_mw": 300},
        )
        assert db.count() == 2

    def test_phioradb_geodesic_nearest_neighbor_query(self):
        db = PhiOraDB()

        db.insert("point_origin", [0.0, 0.0, 0.0])
        db.insert("point_near", [1.0, 1.0, 0.0])
        db.insert("point_mid", [5.0, 5.0, 0.0])
        db.insert("point_far", [100.0, 100.0, 0.0])

        # Query 2 nearest to [0.5, 0.5, 0.0]
        results = db.query_nearest([0.5, 0.5, 0.0], k=2)
        assert len(results) == 2
        assert results[0]["key"] in ("point_origin", "point_near")
        assert results[1]["key"] in ("point_origin", "point_near")
        assert results[0]["distance"] < results[1]["distance"] or results[0]["distance"] == results[1]["distance"]

    def test_phioradb_bounding_box_query(self):
        db = PhiOraDB()

        db.insert("p1", [10.0, 10.0, 0.0])
        db.insert("p2", [15.0, 15.0, 0.0])
        db.insert("p3", [50.0, 50.0, 0.0])

        # Box from [5.0, 5.0, -1.0] to [20.0, 20.0, 1.0]
        box_hits = db.query_bounding_box(
            min_coords=[5.0, 5.0, -1.0],
            max_coords=[20.0, 20.0, 1.0],
        )
        keys = [item["key"] for item in box_hits]
        assert "p1" in keys
        assert "p2" in keys
        assert "p3" not in keys

    def test_spatial_record_dataclass(self):
        sr = SpatialRecord(
            key="geo_point_01",
            coordinates=[36.8219, -1.2921, 1795.0],
            value={"city": "Nairobi Hub"},
        )
        assert sr.node_type == "spatial_record"
        assert sr.coordinates == [36.8219, -1.2921, 1795.0]
        assert sr.simplex.value == "0-simplex"
