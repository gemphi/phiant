export type Object3DType =
  | 'torus_manifold'
  | 'riemann_sphere'
  | 'klein_bottle'
  | 'order_parameter_wheel'
  | 'hypercube_lattice'
  | 'lorentz_attractor'
  | 'calabi_yau'
  | 'mobius_strip'
  | 'helical_syntax'
  | 'knowledge_graph'
  | 'hyperbolic_pseudosphere'
  | 'wave_packet'
  | 'bloch_sphere'
  | 'geodesic_icosahedron'
  | 'hopf_fibration'
  | 'synaptic_heatmap';

export type Object3DCategory = 'Topological' | 'Dynamical' | 'Quantum' | 'Cognitive';

export interface Object3DMeta {
  id: Object3DType;
  name: string;
  category: Object3DCategory;
  formula: string;
  description: string;
}

export type RenderStyle = 'mesh' | 'wireframe' | 'points' | 'hybrid';
export type ColorPalette = 'chromatic' | 'cyber' | 'golden' | 'cosmic' | 'palantir';

export interface Point3D {
  x: number;
  y: number;
  z: number;
  u?: number;
  v?: number;
  phase?: number;
  intensity?: number;
}

export interface Edge3D {
  p1: number;
  p2: number;
  color?: string;
}

export interface Geometry3D {
  points: Point3D[];
  edges: Edge3D[];
}

export interface ProjectedPoint3D {
  px: number;
  py: number;
  z: number;
  phase: number;
  intensity: number;
}

export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

export interface ThreeDCanvasProps {
  geometry: Geometry3D;
  renderStyle?: RenderStyle;
  palette?: ColorPalette;
  zoom?: number;
  speed?: number;
  autoRotate?: boolean;
  className?: string;
  onRotationChange?: (rot: Rotation3D) => void;
}

export interface ThreeDModeProps {
  initialObject?: Object3DType;
  height?: number | string;
  className?: string;
  autoRotate?: boolean;
  showControls?: boolean;
  showCatalog?: boolean;
  renderStyle?: RenderStyle;
  palette?: ColorPalette;
  onObjectChange?: (obj: Object3DType) => void;
}
