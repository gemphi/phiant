import { Geometry3D, Point3D, Edge3D } from '../types';

export function generateTorusManifold(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const R = 1.4;
  const r = 0.55;
  const uSteps = 24;
  const vSteps = 16;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j < vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
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

export function generateKleinBottle(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const uSteps = 24;
  const vSteps = 16;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI;
    for (let j = 0; j < vSteps; j++) {
      const v = (j / vSteps) * Math.PI * 2;
      const r = 4 * (1 - Math.cos(u) / 2);
      let x: number, y: number, z: number;
      if (u < Math.PI) {
        x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(u) * Math.cos(v);
        y = 16 * Math.sin(u) + r * Math.sin(u) * Math.cos(v);
      } else {
        x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(v + Math.PI);
        y = 16 * Math.sin(u);
      }
      z = r * Math.sin(v);
      const scale = 0.12;
      const idx = points.length;
      points.push({ x: x * scale, y: (y - 4) * scale, z: z * scale, u: i / uSteps, v: j / vSteps, phase: u / Math.PI });
      const nextV = (j + 1) % vSteps;
      const nextU = (i + 1) % uSteps;
      edges.push({ p1: idx, p2: i * vSteps + nextV });
      edges.push({ p1: idx, p2: nextU * vSteps + j });
    }
  }
  return { points, edges };
}

export function generateMobiusStrip(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const uSteps = 36;
  const vSteps = 8;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 0; j < vSteps; j++) {
      const v = ((j / (vSteps - 1)) - 0.5) * 0.9;
      const x = (1.4 + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (1.4 + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);
      const idx = points.length;
      points.push({ x, y, z, u: i / uSteps, v: j / vSteps, phase: u / (Math.PI * 2) });
      if (j < vSteps - 1) edges.push({ p1: idx, p2: idx + 1 });
      if (i < uSteps - 1) edges.push({ p1: idx, p2: idx + vSteps });
      else edges.push({ p1: idx, p2: vSteps - 1 - j });
    }
  }
  return { points, edges };
}

export function generateHyperbolicPseudosphere(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const uSteps = 24;
  const vSteps = 16;

  for (let i = 0; i < uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    for (let j = 1; j < vSteps; j++) {
      const v = (j / vSteps) * 2.2 + 0.1;
      const sechV = 1 / Math.cosh(v);
      const x = sechV * Math.cos(u) * 1.8;
      const y = sechV * Math.sin(u) * 1.8;
      const z = (v - Math.tanh(v) - 1.0) * 1.3;
      const idx = points.length;
      points.push({ x, y, z, u: i / uSteps, v: j / vSteps, phase: i / uSteps });
      const nextU = (i + 1) % uSteps;
      if (j > 1) edges.push({ p1: idx - 1, p2: idx });
      edges.push({ p1: idx, p2: nextU * (vSteps - 1) + (j - 1) });
    }
  }
  return { points, edges };
}

export function generateGeodesicIcosahedron(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const t = (1.0 + Math.sqrt(5.0)) / 2.0;
  const scale = 0.85;
  const icoVertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ];
  icoVertices.forEach(([x, y, z], idx) => {
    const d = Math.sqrt(x * x + y * y + z * z);
    points.push({ x: (x / d) * 1.5 * scale, y: (y / d) * 1.5 * scale, z: (z / d) * 1.5 * scale, phase: idx / 12 });
  });
  const icoEdges = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
    [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
    [9, 4], [4, 2], [2, 6], [6, 8], [8, 9],
    [4, 5], [5, 9], [9, 1], [1, 8], [8, 7],
    [7, 6], [6, 10], [10, 2], [2, 11], [11, 4]
  ];
  icoEdges.forEach(([p1, p2]) => edges.push({ p1, p2 }));
  return { points, edges };
}

export function generateHopfFibration(): Geometry3D {
  const points: Point3D[] = [];
  const edges: Edge3D[] = [];
  const p = 3;
  const q = 5;
  const N = 240;

  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = 0.6 * Math.cos(q * t) + 1.2;
    const x = r * Math.cos(p * t);
    const y = r * Math.sin(p * t);
    const z = -Math.sin(q * t) * 0.9;
    const idx = points.length;
    points.push({ x, y, z, phase: i / N });
    if (i > 0) edges.push({ p1: idx - 1, p2: idx });
  }
  return { points, edges };
}
