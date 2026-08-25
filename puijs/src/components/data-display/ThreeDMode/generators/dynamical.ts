import { Geometry3D, Point3D, Edge3D } from '../types';

export function generateOrderParameterWheel(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const radius = 1.5;
  const N = 24;

  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = Math.sin(angle * 3) * 0.3;
    const idx = points.length;
    points.push({ x, y, z, u: i / N, phase: i / N });
    edges.push({ p1: idx, p2: (idx + 1) % N });

    if (i % 3 === 0) {
      const tip = points.length;
      points.push({ x: x * 1.25, y: y * 1.25, z: z * 1.25, phase: i / N, intensity: 0.8 });
      edges.push({ p1: idx, p2: tip });
    }
  }

  const center = points.length;
  points.push({ x: 0, y: 0, z: 0, phase: 0, intensity: 1.5 });
  const rTip = points.length;
  points.push({ x: 0.9, y: 0.6, z: 0.4, phase: 0.5, intensity: 2.0 });
  edges.push({ p1: center, p2: rTip });

  return { points, edges };
}

export function generateLorentzAttractor(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  let x = 0.1, y = 0, z = 0;
  const dt = 0.008;
  const a = 10, b = 28, c = 8 / 3;

  for (let i = 0; i < 360; i++) {
    const dx = a * (y - x);
    const dy = x * (b - z) - y;
    const dz = x * y - c * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    const scale = 0.07;
    const idx = points.length;
    points.push({ x: x * scale, y: y * scale, z: (z - 25) * scale, phase: i / 360 });
    if (i > 0) edges.push({ p1: idx - 1, p2: idx });
  }

  return { points, edges };
}

export function generateSynapticHeatmap(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const size = 15;
  const span = 2.4;

  for (let i = 0; i < size; i++) {
    const x = ((i / (size - 1)) - 0.5) * span;
    for (let j = 0; j < size; j++) {
      const y = ((j / (size - 1)) - 0.5) * span;
      const z = 0.5 * Math.sin(x * 3) * Math.cos(y * 3) + 0.3 * Math.sin((x + y) * 4);
      const idx = points.length;
      points.push({ x, y, z, u: i / size, v: j / size, phase: (z + 0.8) / 1.6 });
      if (j > 0) edges.push({ p1: idx - 1, p2: idx });
      if (i > 0) edges.push({ p1: idx - size, p2: idx });
    }
  }

  return { points, edges };
}
