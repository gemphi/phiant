import { Point3D, ProjectedPoint3D, Rotation3D } from './types';

export interface ViewportConfig {
  width: number;
  height: number;
  zoom: number;
  fov?: number;
}

export function projectPoints(
  points: Point3D[],
  rotation: Rotation3D,
  config: ViewportConfig
): ProjectedPoint3D[] {
  const { width, height, zoom, fov = 3.5 } = config;
  const cx = width / 2;
  const cy = height / 2;
  const scaleBase = Math.min(width, height) * 0.28 * zoom;

  const { x: rx, y: ry, z: rz } = rotation;
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const cosZ = Math.cos(rz), sinZ = Math.sin(rz);

  return points.map((p) => {
    // Rotation Y
    const x1 = p.x * cosY + p.z * sinY;
    const y1 = p.y;
    const z1 = -p.x * sinY + p.z * cosY;

    // Rotation X
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    // Rotation Z
    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    // Perspective projection
    const pers = fov / (fov + z3);
    const px = cx + x3 * scaleBase * pers;
    const py = cy - y3 * scaleBase * pers;

    return {
      px,
      py,
      z: z3,
      phase: p.phase ?? 0,
      intensity: p.intensity ?? 1.0,
    };
  });
}
