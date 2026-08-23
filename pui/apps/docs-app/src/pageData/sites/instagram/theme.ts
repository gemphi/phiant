import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * Instagram — gradient brand (purple-pink-orange), very rounded, playful.
 * Light canvas with the signature multi-stop brand gradient on accents.
 */
export const INSTAGRAM_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#833ab4',
  '--phi-color-primary-hover': '#6d2192',
  '--phi-color-primary-light': 'rgba(131, 58, 180, 0.1)',
  '--phi-color-secondary': '#fd1d1d',
  '--phi-color-secondary-hover': '#d41414',
  '--phi-color-error': '#ed4956',
  '--phi-color-error-hover': '#c62e3a',
  '--phi-color-error-light': 'rgba(237, 73, 86, 0.12)',
  '--phi-color-success': '#2ecc71',
  '--phi-color-success-light': 'rgba(46, 204, 113, 0.12)',
  '--phi-color-warning': '#fcb045',
  '--phi-color-warning-light': 'rgba(252, 176, 69, 0.12)',
  '--phi-color-info': '#5b51d4',
  '--phi-color-info-light': 'rgba(91, 81, 212, 0.12)',
  '--phi-color-background': '#ffffff',
  '--phi-color-background-rgb': '255, 255, 255',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#fafafa',
  '--phi-color-text-primary': '#262626',
  '--phi-color-text-secondary': '#8e8e8e',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#dbdbdb',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient':
    'linear-gradient(45deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
  '--phi-icon-gradient':
    'linear-gradient(45deg, #fcb045 0%, #fd1d1d 50%, #833ab4 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',

  /* ---------- Radius (very rounded, playful) ---------- */
  '--phi-radius-sm': '12px',
  '--phi-radius-md': '20px',
  '--phi-radius-lg': '32px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Instagram Sans', 'Inter', sans-serif",
  '--phi-font-heading': "'Instagram Sans', 'Inter', sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.375rem',
  '--phi-font-size-xxl': '2.25rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '800',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
  '--phi-shadow-md': '0 4px 18px rgba(131, 58, 180, 0.18)',
  '--phi-shadow-lg': '0 12px 36px rgba(253, 29, 29, 0.22)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '0.875rem',
  '--phi-space-3': '1.25rem',
  '--phi-space-4': '1.75rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.3s',
  '--phi-transition-fast': '0.2s',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0',
  '--phi-sidebar-collapsed-width': '76px',
  '--phi-sidebar-expanded-width': '256px',
  '--phi-sidebar-collapsed-spacer': '76px',
  '--phi-sidebar-expanded-spacer': '256px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #dbdbdb',
  '--phi-elevation-shadow': '0 4px 18px rgba(131, 58, 180, 0.18)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.85)',
  '--phi-glass-blur': '14px',
  '--phi-tooltip-offset': '10px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#c62e3a',
  '--phi-alert-success-text': '#249a3d',
  '--phi-alert-warning-text': '#b97300',
  '--phi-alert-info-text': '#5b51d4',
};
