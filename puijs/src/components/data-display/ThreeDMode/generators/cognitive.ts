import { Geometry3D, Point3D, Edge3D } from '../types';

export function generateHypercubeLattice(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const coords4D: number[][] = [];

  for (let i = 0; i < 16; i++) {
    const x4 = (i & 1 ? 1 : -1) * 0.7;
    const y4 = (i & 2 ? 1 : -1) * 0.7;
    const z4 = (i & 4 ? 1 : -1) * 0.7;
    const w4 = (i & 8 ? 1 : -1) * 0.7;
    coords4D.push([x4, y4, z4, w4]);
    const proj = 1.0 / (2.0 - w4 * 0.5);
    points.push({ x: x4 * proj * 1.5, y: y4 * proj * 1.5, z: z4 * proj * 1.5, phase: i / 16, intensity: w4 > 0 ? 1.2 : 0.7 });
  }

  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      for (let k = 0; k < 4; k++) {
        if (coords4D[i][k] !== coords4D[j][k]) diff++;
      }
      if (diff === 1) edges.push({ p1: i, p2: j });
    }
  }

  return { points, edges };
}

export function generateHelicalSyntax(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const N = 70;
  const turns = 3.5;
  const R = 0.9;
  const h = 2.4;

  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2 * turns;
    const z = ((i / N) - 0.5) * h;
    const p1 = points.length;
    points.push({ x: Math.cos(t) * R, y: Math.sin(t) * R, z, phase: (i / N) });
    const p2 = points.length;
    points.push({ x: Math.cos(t + Math.PI) * R, y: Math.sin(t + Math.PI) * R, z, phase: ((i / N) + 0.5) % 1 });

    if (i > 0) {
      edges.push({ p1: p1 - 2, p2: p1 });
      edges.push({ p1: p2 - 2, p2: p2 });
    }
    if (i % 4 === 0) edges.push({ p1, p2 });
  }

  return { points, edges };
}

export function generateKnowledgeGraph(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const N = 40;
  const clusters = 5;

  const clusterCenters = [
    [0.9, 0.5, 0.4],
    [-0.8, 0.6, -0.3],
    [0.3, -0.9, 0.5],
    [-0.5, -0.6, -0.7],
    [0.0, 0.2, 0.9],
  ];

  for (let i = 0; i < N; i++) {
    const cIdx = i % clusters;
    const [cx, cy, cz] = clusterCenters[cIdx];
    const jitter = 0.45;
    const x = cx + (Math.sin(i * 99) * 0.5) * jitter;
    const y = cy + (Math.cos(i * 77) * 0.5) * jitter;
    const z = cz + (Math.sin(i * 55) * 0.5) * jitter;
    points.push({ x, y, z, phase: cIdx / clusters, intensity: (i % clusters === 0) ? 1.8 : 0.9 });
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const sameCluster = (i % clusters) === (j % clusters);
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (sameCluster && dist < 0.6) edges.push({ p1: i, p2: j });
      else if (!sameCluster && dist < 0.45) edges.push({ p1: i, p2: j });
    }
  }

  return { points, edges };
}
