import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Nike theme — black/white/orange, bold, medium radius.
 */
export const NIKE_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#ff6900',
  '--phi-color-primary-hover': '#e65f00',
  '--phi-color-primary-light': 'rgba(255, 105, 0, 0.12)',
  '--phi-color-secondary': '#111111',
  '--phi-color-secondary-hover': '#000000',
  '--phi-color-error': '#d32f2f',
  '--phi-color-error-hover': '#b71c1c',
  '--phi-color-error-light': 'rgba(211, 47, 47, 0.1)',
  '--phi-color-success': '#21a664',
  '--phi-color-success-light': 'rgba(33, 166, 100, 0.1)',
  '--phi-color-warning': '#f5a623',
  '--phi-color-warning-light': 'rgba(245, 166, 35, 0.1)',
  '--phi-color-info': '#3b82f6',
  '--phi-color-info-light': 'rgba(59, 130, 246, 0.1)',
  '--phi-color-background': '#ffffff',
  '--phi-color-background-rgb': '255, 255, 255',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f5f5f5',
  '--phi-color-text-primary': '#111111',
  '--phi-color-text-secondary': '#757575',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#e0e0e0',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #ff6900 0%, #111111 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #ff6900 0%, #ffffff 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',

  /* ---------- Radius (medium) ---------- */
  '--phi-radius-sm': '4px',
  '--phi-radius-md': '8px',
  '--phi-radius-lg': '12px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif",
  '--phi-font-heading': "'Helvetica Neue', Helvetica, Arial, sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.5rem',
  '--phi-font-size-xxl': '3rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '700',
  '--phi-font-weight-bold': '900',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.15)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.25)',

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
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '64px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '64px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #e0e0e0',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.8)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#d32f2f',
  '--phi-alert-success-text': '#21a664',
  '--phi-alert-warning-text': '#f5a623',
  '--phi-alert-info-text': '#3b82f6',
};

export default NIKE_THEME;
