import React, { useState, useMemo, useCallback } from 'react';
import {
  ThreeDModeProps,
  Object3DType,
  RenderStyle,
  ColorPalette,
} from './types';
import { OBJECT_3D_CATALOG } from './catalog';
import { generateGeometry } from './generators';
import { ThreeDCanvas } from './ThreeDCanvas';
import styles from './styles.module.scss';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Sliders,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const ThreeDMode: React.FC<ThreeDModeProps> = ({
  initialObject = 'torus_manifold',
  height = 540,
  className = '',
  autoRotate = true,
  showControls = true,
  showCatalog = true,
  renderStyle: initialRenderStyle = 'hybrid',
  palette: initialPalette = 'chromatic',
  onObjectChange,
}) => {
  const [currentObject, setCurrentObject] = useState<Object3DType>(initialObject);
  const [rotating, setRotating] = useState(autoRotate);
  const [renderStyle, setRenderStyle] = useState<RenderStyle>(initialRenderStyle);
  const [palette, setPalette] = useState<ColorPalette>(initialPalette);
  const [zoom, setZoom] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);

  const activeMeta = useMemo(
    () => OBJECT_3D_CATALOG.find((m) => m.id === currentObject) || OBJECT_3D_CATALOG[0],
    [currentObject]
  );

  const geometry = useMemo(() => generateGeometry(currentObject), [currentObject]);

  const handleSelectObject = useCallback(
    (id: Object3DType) => {
      setCurrentObject(id);
      onObjectChange?.(id);
    },
    [onObjectChange]
  );

  const handleNextObject = useCallback(() => {
    const idx = OBJECT_3D_CATALOG.findIndex((m) => m.id === currentObject);
    const nextIdx = (idx + 1) % OBJECT_3D_CATALOG.length;
    handleSelectObject(OBJECT_3D_CATALOG[nextIdx].id);
  }, [currentObject, handleSelectObject]);

  const handlePrevObject = useCallback(() => {
    const idx = OBJECT_3D_CATALOG.findIndex((m) => m.id === currentObject);
    const prevIdx = (idx - 1 + OBJECT_3D_CATALOG.length) % OBJECT_3D_CATALOG.length;
    handleSelectObject(OBJECT_3D_CATALOG[prevIdx].id);
  }, [currentObject, handleSelectObject]);

  return (
    <div
      className={`${styles.threeDContainer} ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* 3D Canvas Rendering Engine */}
      <ThreeDCanvas
        geometry={geometry}
        renderStyle={renderStyle}
        palette={palette}
        zoom={zoom}
        speed={speed}
        autoRotate={rotating}
      />

      {/* Top HUD: Mathematical Formula & Model Info */}
      {hudVisible && (
        <div className={styles.topHud}>
          <div className={styles.metaBadge}>
            <span className={styles.categoryTag}>{activeMeta.category}</span>
            <h3 className={styles.objectTitle}>{activeMeta.name}</h3>
            <div className={styles.formulaBox}>
              <code>{activeMeta.formula}</code>
            </div>
            <p className={styles.descText}>{activeMeta.description}</p>
          </div>

          <div className={styles.statsBadge}>
            <span>{geometry.points.length} nodes</span>
            <span>·</span>
            <span>{geometry.edges.length} edges</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Control Bar */}
      {showControls && (
        <div className={styles.bottomBar}>
          <div className={styles.controlsGroup}>
            <button
              className={styles.iconBtn}
              onClick={handlePrevObject}
              title="Previous 3D Topology"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              className={styles.iconBtn}
              onClick={() => setRotating((r) => !r)}
              title={rotating ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            >
              {rotating ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              className={styles.iconBtn}
              onClick={handleNextObject}
              title="Next 3D Topology"
            >
              <ChevronRight size={16} />
            </button>

            <div className={styles.divider} />

            {/* Render Styles */}
            {(['hybrid', 'mesh', 'wireframe', 'points'] as RenderStyle[]).map((st) => (
              <button
                key={st}
                className={`${styles.pillBtn} ${renderStyle === st ? styles.active : ''}`}
                onClick={() => setRenderStyle(st)}
              >
                {st}
              </button>
            ))}

            <div className={styles.divider} />

            {/* Palettes */}
            {(['chromatic', 'cyber', 'golden', 'cosmic', 'palantir'] as ColorPalette[]).map(
              (p) => (
                <button
                  key={p}
                  className={`${styles.pillBtn} ${palette === p ? styles.active : ''}`}
                  onClick={() => setPalette(p)}
                >
                  {p}
                </button>
              )
            )}

            <div className={styles.divider} />

            {/* Zoom Controls */}
            <button
              className={styles.iconBtn}
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}
              title="Zoom Out"
            >
              <Minimize2 size={15} />
            </button>
            <button
              className={styles.iconBtn}
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
              title="Zoom In"
            >
              <Maximize2 size={15} />
            </button>
            <button
              className={styles.iconBtn}
              onClick={() => {
                setZoom(1.0);
                setSpeed(1.0);
              }}
              title="Reset Viewport"
            >
              <RotateCcw size={15} />
            </button>

            {showCatalog && (
              <button
                className={`${styles.iconBtn} ${catalogOpen ? styles.active : ''}`}
                onClick={() => setCatalogOpen((c) => !c)}
                title="Toggle 16-Model Catalog Drawer"
              >
                <Layers size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Catalog Drawer */}
      {showCatalog && catalogOpen && (
        <div className={styles.catalogDrawer}>
          <div className={styles.drawerHeader}>
            <h4>16 Topological Manifolds & 3D Objects</h4>
            <button className={styles.iconBtn} onClick={() => setCatalogOpen(false)}>
              ✕
            </button>
          </div>
          <div className={styles.drawerGrid}>
            {OBJECT_3D_CATALOG.map((item) => {
              const isSelected = item.id === currentObject;
              return (
                <button
                  key={item.id}
                  className={`${styles.catalogCard} ${isSelected ? styles.selectedCard : ''}`}
                  onClick={() => {
                    handleSelectObject(item.id);
                    setCatalogOpen(false);
                  }}
                >
                  <span className={styles.cardCategory}>{item.category}</span>
                  <div className={styles.cardTitle}>{item.name}</div>
                  <div className={styles.cardFormula}>{item.formula}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
