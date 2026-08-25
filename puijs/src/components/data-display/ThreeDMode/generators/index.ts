import { Geometry3D, Object3DType } from '../types';
import {
  generateTorusManifold,
  generateKleinBottle,
  generateMobiusStrip,
  generateHyperbolicPseudosphere,
  generateGeodesicIcosahedron,
  generateHopfFibration,
} from './topological';
import {
  generateOrderParameterWheel,
  generateLorentzAttractor,
  generateSynapticHeatmap,
} from './dynamical';
import {
  generateRiemannSphere,
  generateCalabiYau,
  generateWavePacket,
  generateBlochSphere,
} from './quantum';
import {
  generateHypercubeLattice,
  generateHelicalSyntax,
  generateKnowledgeGraph,
} from './cognitive';

export function generateGeometry(type: Object3DType): Geometry3D {
  switch (type) {
    case 'torus_manifold':
      return generateTorusManifold();
    case 'riemann_sphere':
      return generateRiemannSphere();
    case 'klein_bottle':
      return generateKleinBottle();
    case 'order_parameter_wheel':
      return generateOrderParameterWheel();
    case 'hypercube_lattice':
      return generateHypercubeLattice();
    case 'lorentz_attractor':
      return generateLorentzAttractor();
    case 'calabi_yau':
      return generateCalabiYau();
    case 'mobius_strip':
      return generateMobiusStrip();
    case 'helical_syntax':
      return generateHelicalSyntax();
    case 'knowledge_graph':
      return generateKnowledgeGraph();
    case 'hyperbolic_pseudosphere':
      return generateHyperbolicPseudosphere();
    case 'wave_packet':
      return generateWavePacket();
    case 'bloch_sphere':
      return generateBlochSphere();
    case 'geodesic_icosahedron':
      return generateGeodesicIcosahedron();
    case 'hopf_fibration':
      return generateHopfFibration();
    case 'synaptic_heatmap':
      return generateSynapticHeatmap();
    default:
      return generateTorusManifold();
  }
}
