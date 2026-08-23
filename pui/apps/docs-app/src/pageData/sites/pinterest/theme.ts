import type { SiteTheme } from '../../../store/services/themeTypes';

/**
 * Pinterest theme — red/white, very rounded, visual discovery.
 */
export const PINTEREST_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#e60023',
  '--phi-color-primary-hover': '#ad081b',
  '--phi-color-primary-light': 'rgba(230, 0, 35, 0.1)',
  '--phi-color-secondary': '#111111',
  '--phi-color-secondary-hover': '#000000',
  '--phi-color-error': '#e60023',
  '--phi-color-error-hover': '#ad081b',
  '--phi-color-error-light': 'rgba(230, 0, 35, 0.1)',
  '--phi-color-success': '#007a33',
  '--phi-color-success-light': 'rgba(0, 122, 51, 0.1)',
  '--phi-color-warning': '#b85c00',
  '--phi-color-warning-light': 'rgba(184, 92, 0, 0.1)',
  '--phi-color-info': '#0066cc',
  '--phi-color-info-light': 'rgba(0, 102, 204, 0.1)',
  '--phi-color-background': '#ffffff',
  '--phi-color-background-rgb': '255, 255, 255',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f5f5f5',
  '--phi-color-text-primary': '#111111',
  '--phi-color-text-secondary': '#767676',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#e2e2e2',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #e60023 0%, #ad081b 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #e60023 0%, #ff4d6d 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(0deg, #ffffff 0%, #fafafa 100%)',

  /* ---------- Radius (very rounded) ---------- */
  '--phi-radius-sm': '8px',
  '--phi-radius-md': '16px',
  '--phi-radius-lg': '24px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  '--phi-font-heading': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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
  '--phi-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
  '--phi-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.12)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.18)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '1rem',
  '--phi-space-3': '1.5rem',
  '--phi-space-4': '2rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.2s',
  '--phi-transition-fast': '0.15s ease-in-out',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.5rem',
  '--phi-layout-header-height': '64px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '80px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '80px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '64px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #e2e2e2',
  '--phi-elevation-shadow': '0 4px 12px rgba(0, 0, 0, 0.12)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.85)',
  '--phi-glass-blur': '12px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#ad081b',
  '--phi-alert-success-text': '#007a33',
  '--phi-alert-warning-text': '#b85c00',
  '--phi-alert-info-text': '#0066cc',
};
