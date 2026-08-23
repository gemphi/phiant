import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Tesla Store theme — red/black, sharp radius (0-4px), premium minimal.
 */
export const TESLA_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#e31937',
  '--phi-color-primary-hover': '#c11530',
  '--phi-color-primary-light': 'rgba(227, 25, 55, 0.1)',
  '--phi-color-secondary': '#171a20',
  '--phi-color-secondary-hover': '#0b0d11',
  '--phi-color-error': '#d32f2f',
  '--phi-color-error-hover': '#b71c1c',
  '--phi-color-error-light': 'rgba(211, 47, 47, 0.1)',
  '--phi-color-success': '#21a664',
  '--phi-color-success-light': 'rgba(33, 166, 100, 0.1)',
  '--phi-color-warning': '#f5a623',
  '--phi-color-warning-light': 'rgba(245, 166, 35, 0.1)',
  '--phi-color-info': '#3b82f6',
  '--phi-color-info-light': 'rgba(59, 130, 246, 0.1)',
  '--phi-color-background': '#000000',
  '--phi-color-background-rgb': '0, 0, 0',
  '--phi-color-background-card': '#171a20',
  '--phi-color-background-secondary': '#0b0d11',
  '--phi-color-text-primary': '#ffffff',
  '--phi-color-text-secondary': '#a0a4a8',
  '--phi-color-text-inverse': '#171a20',
  '--phi-color-border': '#2a2d33',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #e31937 0%, #171a20 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #e31937 0%, #ffffff 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #171a20 0%, #000000 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #000000 0%, #171a20 100%)',

  /* ---------- Radius (sharp) ---------- */
  '--phi-radius-sm': '0px',
  '--phi-radius-md': '2px',
  '--phi-radius-lg': '4px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Inter', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-heading': "'Inter', 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '2.5rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.6)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.8)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '200ms',
  '--phi-transition-fast': '150ms ease',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '2rem',
  '--phi-layout-header-height': '56px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '64px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '64px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '56px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #2a2d33',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.6)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(0, 0, 0, 0.7)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff6b6b',
  '--phi-alert-success-text': '#4ade80',
  '--phi-alert-warning-text': '#fbbf24',
  '--phi-alert-info-text': '#60a5fa',
};

export default TESLA_THEME;
