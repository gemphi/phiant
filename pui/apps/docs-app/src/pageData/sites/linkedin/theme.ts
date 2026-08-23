import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * LinkedIn theme — blue/white, professional, medium radius (4-8px).
 */
export const LINKEDIN_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#0a66c2',
  '--phi-color-primary-hover': '#004182',
  '--phi-color-primary-light': 'rgba(10, 102, 194, 0.1)',
  '--phi-color-secondary': '#4470c8',
  '--phi-color-secondary-hover': '#3456a0',
  '--phi-color-error': '#cc0000',
  '--phi-color-error-hover': '#a30000',
  '--phi-color-error-light': 'rgba(204, 0, 0, 0.1)',
  '--phi-color-success': '#057642',
  '--phi-color-success-light': 'rgba(5, 118, 66, 0.1)',
  '--phi-color-warning': '#c37d16',
  '--phi-color-warning-light': 'rgba(195, 125, 22, 0.1)',
  '--phi-color-info': '#0a66c2',
  '--phi-color-info-light': 'rgba(10, 102, 194, 0.1)',
  '--phi-color-background': '#f4f2ee',
  '--phi-color-background-rgb': '244, 242, 238',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#eef3f8',
  '--phi-color-text-primary': 'rgba(0, 0, 0, 0.9)',
  '--phi-color-text-secondary': 'rgba(0, 0, 0, 0.6)',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': 'rgba(0, 0, 0, 0.08)',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #0a66c2 0%, #4470c8 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #0a66c2 0%, #ffffff 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f4f2ee 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #f4f2ee 0%, #ffffff 100%)',

  /* ---------- Radius (medium) ---------- */
  '--phi-radius-sm': '4px',
  '--phi-radius-md': '8px',
  '--phi-radius-lg': '12px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif",
  '--phi-font-heading': "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif",
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
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.12)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.16)',

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
  '--phi-layout-header-height': '52px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '64px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '64px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '52px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid rgba(0, 0, 0, 0.08)',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.12)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(0, 0, 0, 0.5)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#cc0000',
  '--phi-alert-success-text': '#057642',
  '--phi-alert-warning-text': '#c37d16',
  '--phi-alert-info-text': '#0a66c2',
};

export default LINKEDIN_THEME;
