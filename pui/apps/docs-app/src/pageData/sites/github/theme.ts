import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * GitHub theme — dark/white, sharp radius (0-6px), developer-focused.
 */
export const GITHUB_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#238636',
  '--phi-color-primary-hover': '#2ea043',
  '--phi-color-primary-light': 'rgba(35, 134, 54, 0.15)',
  '--phi-color-secondary': '#0969da',
  '--phi-color-secondary-hover': '#0550ae',
  '--phi-color-error': '#da3633',
  '--phi-color-error-hover': '#b62324',
  '--phi-color-error-light': 'rgba(218, 54, 51, 0.15)',
  '--phi-color-success': '#238636',
  '--phi-color-success-light': 'rgba(35, 134, 54, 0.15)',
  '--phi-color-warning': '#d29922',
  '--phi-color-warning-light': 'rgba(210, 153, 34, 0.15)',
  '--phi-color-info': '#0969da',
  '--phi-color-info-light': 'rgba(9, 105, 218, 0.15)',
  '--phi-color-background': '#0d1117',
  '--phi-color-background-rgb': '13, 17, 23',
  '--phi-color-background-card': '#161b22',
  '--phi-color-background-secondary': '#21262d',
  '--phi-color-text-primary': '#e6edf3',
  '--phi-color-text-secondary': '#7d8590',
  '--phi-color-text-inverse': '#0d1117',
  '--phi-color-border': '#30363d',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #238636 0%, #0969da 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #238636 0%, #e6edf3 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)',

  /* ---------- Radius (sharp) ---------- */
  '--phi-radius-sm': '0px',
  '--phi-radius-md': '4px',
  '--phi-radius-lg': '6px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Mona Sans', 'Hubot Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
  '--phi-font-heading': "'Mona Sans', 'Hubot Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
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
  '--phi-shadow-sm': '0 0 transparent',
  '--phi-shadow-md': '0 8px 24px rgba(1, 4, 9, 0.6)',
  '--phi-shadow-lg': '0 16px 48px rgba(1, 4, 9, 0.8)',

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
  '--phi-layout-header-height': '48px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '48px',
  '--phi-sidebar-expanded-width': '260px',
  '--phi-sidebar-collapsed-spacer': '48px',
  '--phi-sidebar-expanded-spacer': '260px',
  '--phi-sidebar-header-height': '48px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #30363d',
  '--phi-elevation-shadow': '0 8px 24px rgba(1, 4, 9, 0.6)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(1, 4, 9, 0.8)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ff7b72',
  '--phi-alert-success-text': '#3fb950',
  '--phi-alert-warning-text': '#d29922',
  '--phi-alert-info-text': '#58a6ff',
};

export default GITHUB_THEME;
