import { Geometry3D, Point3D, Edge3D } from '../types';

export function generateRiemannSphere(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const N = 80;
  const phi = (1 + Math.sqrt(5)) / 2;
  const radius = 1.3;

  for (let i = 0; i < N; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / N);
    const azimuth = (2 * Math.PI * i) / phi;
    const x = Math.sin(theta) * Math.cos(azimuth) * radius;
    const y = Math.sin(theta) * Math.sin(azimuth) * radius;
    const z = Math.cos(theta) * radius;
    points.push({ x, y, z, u: i / N, phase: (azimuth + Math.PI) / (Math.PI * 2) });
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 0.65) edges.push({ p1: i, p2: j });
    }
  }

  return { points, edges };
}

export function generateCalabiYau(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const uSteps = 24;
  const vSteps = 16;
  const n = 5;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j < vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const r = Math.pow(Math.cos(n * u), 2) + Math.pow(Math.sin(n * v), 2) + 0.3;
      const x = r * Math.cos(u) * Math.cos(v) * 0.9;
      const y = r * Math.sin(u) * Math.cos(v) * 0.9;
      const z = r * Math.sin(v) * 0.8;
      const idx = points.length;
      points.push({ x, y, z, u: i / uSteps, v: j / vSteps, phase: (u + v) / (Math.PI * 2) });
      const nextV = (j + 1) % vSteps;
      const nextU = (i + 1) % uSteps;
      edges.push({ p1: idx, p2: i * vSteps + nextV });
      edges.push({ p1: idx, p2: nextU * vSteps + j });
    }
  }

  return { points, edges };
}

export function generateWavePacket(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const N = 200;

  for (let i = 0; i < N; i++) {
    const t = ((i / (N - 1)) - 0.5) * 4.0;
    const env = Math.exp(-t * t * 0.8);
    const k = 12.0;
    const x = t * 0.7;
    const y = env * Math.cos(k * t) * 0.9;
    const z = env * Math.sin(k * t) * 0.9;
    const idx = points.length;
    points.push({ x, y, z, phase: (k * t + Math.PI * 4) / (Math.PI * 8), intensity: env });
    if (i > 0) edges.push({ p1: idx - 1, p2: idx });
  }

  return { points, edges };
}

export function generateBlochSphere(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const R = 1.3;
  const N = 36;

  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    points.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, z: 0, phase: i / N });
    edges.push({ p1: i, p2: (i + 1) % N });
  }

  const offset = points.length;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    points.push({ x: Math.cos(a) * R, y: 0, z: Math.sin(a) * R, phase: 0.5 });
    edges.push({ p1: offset + i, p2: offset + ((i + 1) % N) });
  }

  const north = points.length;
  points.push({ x: 0, y: 0, z: R * 1.15, phase: 0, intensity: 1.5 });
  const south = points.length;
  points.push({ x: 0, y: 0, z: -R * 1.15, phase: 0.5, intensity: 1.5 });
  edges.push({ p1: north, p2: south });

  const psiTip = points.length;
  points.push({ x: 0.8, y: 0.6, z: 0.7, phase: 0.25, intensity: 2.0 });
  const center = points.length;
  points.push({ x: 0, y: 0, z: 0, phase: 0 });
  edges.push({ p1: center, p2: psiTip });

  return { points, edges };
}
