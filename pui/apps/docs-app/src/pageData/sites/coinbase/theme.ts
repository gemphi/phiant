import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Coinbase theme — blue primary (#0052ff), dark canvas (#0a0e27),
 * clean and modern with medium radius. Trustworthy fintech aesthetic.
 */
export const COINBASE_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#0052ff',
  '--phi-color-primary-hover': '#0042cc',
  '--phi-color-primary-light': 'rgba(0, 82, 255, 0.12)',
  '--phi-color-secondary': '#1652f0',
  '--phi-color-secondary-hover': '#0d40c4',
  '--phi-color-error': '#ff3b3b',
  '--phi-color-error-hover': '#e02828',
  '--phi-color-error-light': 'rgba(255, 59, 59, 0.12)',
  '--phi-color-success': '#00d395',
  '--phi-color-success-light': 'rgba(0, 211, 149, 0.12)',
  '--phi-color-warning': '#f5a623',
  '--phi-color-warning-light': 'rgba(245, 166, 35, 0.12)',
  '--phi-color-info': '#3b82f6',
  '--phi-color-info-light': 'rgba(59, 130, 246, 0.12)',
  '--phi-color-background': '#0a0e27',
  '--phi-color-background-rgb': '10, 14, 39',
  '--phi-color-background-card': '#141b3d',
  '--phi-color-background-secondary': '#1a2147',
  '--phi-color-text-primary': '#ffffff',
  '--phi-color-text-secondary': '#8b95c7',
  '--phi-color-text-inverse': '#0a0e27',
  '--phi-color-border': '#252e5c',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #0052ff 0%, #0a0e27 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #0052ff 0%, #00d395 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #141b3d 0%, #0a0e27 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #0a0e27 0%, #141b3d 100%)',

  /* ---------- Radius (medium, clean) ---------- */
  '--phi-radius-sm': '6px',
  '--phi-radius-md': '10px',
  '--phi-radius-lg': '16px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Inter', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-heading': "'Inter', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '2rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.3)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.5)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '200ms',
  '--phi-transition-fast': '150ms ease',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '72px',
  '--phi-sidebar-expanded-width': '256px',
  '--phi-sidebar-collapsed-spacer': '72px',
  '--phi-sidebar-expanded-spacer': '256px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #252e5c',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.4)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(10, 14, 39, 0.85)',
  '--phi-glass-blur': '10px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff6b6b',
  '--phi-alert-success-text': '#00d395',
  '--phi-alert-warning-text': '#f5a623',
  '--phi-alert-info-text': '#60a5fa',
};

export default COINBASE_THEME;
