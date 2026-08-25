import { ColorPalette } from './types';

export const PALETTES: Record<ColorPalette, (t: number) => string> = {
  chromatic: (t: number) => {
    const hue = (((t % 1) + 1) % 1) * 360;
    return `hsl(${hue}, 85%, 60%)`;
  },
  cyber: (t: number) => {
    const p = ((t % 1) + 1) % 1;
    if (p < 0.33) return `rgb(${Math.floor(p * 3 * 255)}, 240, 255)`;
    if (p < 0.66) return `rgb(255, ${Math.floor((1 - (p - 0.33) * 3) * 255)}, 200)`;
    return `rgb(200, 50, ${Math.floor((p - 0.66) * 3 * 255)})`;
  },
  golden: (t: number) => {
    const p = ((t % 1) + 1) % 1;
    return `hsl(${35 + p * 25}, 95%, ${50 + p * 20}%)`;
  },
  cosmic: (t: number) => {
    const p = ((t % 1) + 1) % 1;
    return `hsl(${260 + p * 90}, 80%, ${55 + p * 20}%)`;
  },
  palantir: (t: number) => {
    const p = ((t % 1) + 1) % 1;
    return `hsl(${195 + p * 40}, 85%, ${50 + p * 25}%)`;
  },
};

export const getPaletteColor = (palette: ColorPalette, t: number): string => {
  const fn = PALETTES[palette] || PALETTES.chromatic;
  return fn(t);
};
