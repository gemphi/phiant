import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ThreeDCanvasProps, Rotation3D } from './types';
import { projectPoints } from './projections';
import { getPaletteColor } from './palettes';

export const ThreeDCanvas: React.FC<ThreeDCanvasProps> = ({
  geometry,
  renderStyle = 'hybrid',
  palette = 'chromatic',
  zoom = 1.0,
  speed = 1.0,
  autoRotate = true,
  className = '',
  onRotationChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState<Rotation3D>({ x: 0.4, y: 0.6, z: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Mouse interaction handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      setRotation((prev) => {
        const next = {
          x: prev.x + dy * 0.008,
          y: prev.y + dx * 0.008,
          z: prev.z,
        };
        onRotationChange?.(next);
        return next;
      });
    },
    [onRotationChange]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRotation = { ...rotation };

    const render = () => {
      if (autoRotate && !isDraggingRef.current) {
        localRotation.y += 0.005 * speed;
        localRotation.x += 0.002 * speed;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Project points
      const projected = projectPoints(geometry.points, isDraggingRef.current ? rotation : localRotation, {
        width,
        height,
        zoom,
      });

      // 1. Draw Edges (Wireframe / Mesh / Hybrid)
      if (renderStyle !== 'points') {
        geometry.edges.forEach((edge) => {
          const p1 = projected[edge.p1];
          const p2 = projected[edge.p2];
          if (!p1 || !p2) return;

          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.12, Math.min(0.85, 0.5 + avgZ * 0.25));
          const color = getPaletteColor(palette, (p1.phase + p2.phase) / 2);

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = renderStyle === 'mesh' ? 1.5 : 1.0;
          ctx.stroke();
        });
      }

      // 2. Draw Points (Nodes)
      if (renderStyle !== 'wireframe') {
        // Sort points back to front for depth rendering
        const sorted = projected
          .map((p, idx) => ({ ...p, origIdx: idx }))
          .sort((a, b) => b.z - a.z);

        sorted.forEach((p) => {
          const radius = Math.max(1.8, (3.2 + p.z * 1.0) * p.intensity);
          const color = getPaletteColor(palette, p.phase);
          const alpha = Math.max(0.25, Math.min(1.0, 0.6 + p.z * 0.3));

          ctx.beginPath();
          ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Outer Glow
          if (p.intensity > 1.2) {
            ctx.beginPath();
            ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha * 0.25;
            ctx.fill();
          }
        });
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [geometry, renderStyle, palette, zoom, speed, autoRotate, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
    />
  );
};
