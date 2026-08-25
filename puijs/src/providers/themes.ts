import { BrandColors, BrandTheme } from './types';

const B = (o: Partial<BrandColors>): BrandColors => ({
  primary: '#3b82f6', primaryHover: '#2563eb', primaryLight: '#eff6ff', primaryLightDark: '#1e3a8a',
  secondary: '#475569', secondaryHover: '#334155',
  success: '#10b981', successLight: '#ecfdf5', successLightDark: '#064e3b',
  warning: '#f59e0b', warningLight: '#fffbeb', warningLightDark: '#78350f',
  error: '#ef4444', errorHover: '#dc2626', errorLight: '#fef2f2', errorLightDark: '#450a0a',
  info: '#0ea5e9', infoHover: '#0284c7', infoLight: '#f0f9ff', infoLightDark: '#0c4a6e',
  ...o,
});

export const BRAND_THEMES: BrandTheme[] = [
  { id: 'phiano', name: 'Phiano Phase Manifold', colors: B({ primary: '#6366f1', primaryHover: '#4f46e5', primaryLight: 'rgba(99, 102, 241, 0.12)', primaryLightDark: 'rgba(129, 140, 248, 0.2)', secondary: '#0ea5e9', secondaryHover: '#0284c7', success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#8b5cf6' }), gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #0ea5e9 100%)', gradientDark: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #38bdf8 100%)' },
  { id: 'foundry', name: 'Palantir Foundry', colors: B({ primary: '#3b82f6', primaryHover: '#2563eb' }), gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', gradientDark: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)' },
  { id: 'blueprint', name: 'Blueprint Slate', colors: B({ primary: '#2d72d2', primaryHover: '#1f53a3', secondary: '#5c7080' }), gradient: 'linear-gradient(135deg, #2d72d2 0%, #106ba3 100%)', gradientDark: 'linear-gradient(135deg, #2d72d2 0%, #182026 100%)' },
  { id: 'emerald', name: 'Emerald Foundry', colors: B({ primary: '#10b981', primaryHover: '#059669' }), gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', gradientDark: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)' },
  { id: 'midnight', name: 'Midnight Indigo', colors: B({ primary: '#4f46e5', primaryHover: '#4338ca' }), gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', gradientDark: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)' },
  { id: 'amber', name: 'Amber Gold', colors: B({ primary: '#d97706', primaryHover: '#b45309' }), gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', gradientDark: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)' },
];

export const THEME_STYLES = [
  { id: 'flat', name: 'Flat' },
  { id: 'gradient', name: 'Gradient' },
  { id: 'elevated', name: 'Elevated' },
  { id: 'glass', name: 'Glass' },
];
