import type { SiteTheme } from '../../../store/services/themeTypes';

/**
 * Amazon theme — orange/dark navy, medium radius, commerce-focused.
 */
export const AMAZON_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#ff9900',
  '--phi-color-primary-hover': '#e88a00',
  '--phi-color-primary-light': 'rgba(255, 153, 0, 0.12)',
  '--phi-color-secondary': '#131921',
  '--phi-color-secondary-hover': '#0f1419',
  '--phi-color-error': '#cc0c39',
  '--phi-color-error-hover': '#a60a2e',
  '--phi-color-error-light': 'rgba(204, 12, 57, 0.1)',
  '--phi-color-success': '#007600',
  '--phi-color-success-light': 'rgba(0, 118, 0, 0.1)',
  '--phi-color-warning': '#b85c00',
  '--phi-color-warning-light': 'rgba(184, 92, 0, 0.1)',
  '--phi-color-info': '#0066cc',
  '--phi-color-info-light': 'rgba(0, 102, 204, 0.1)',
  '--phi-color-background': '#eaeded',
  '--phi-color-background-rgb': '234, 237, 237',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#f3f3f3',
  '--phi-color-text-primary': '#0f1111',
  '--phi-color-text-secondary': '#565959',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#d5d9d9',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #ff9900 0%, #e88a00 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #ff9900 0%, #ffb74d 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(0deg, #ffffff 0%, #f7f7f7 100%)',

  /* ---------- Radius (medium) ---------- */
  '--phi-radius-sm': '4px',
  '--phi-radius-md': '8px',
  '--phi-radius-lg': '12px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': '"Amazon Ember", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  '--phi-font-heading': '"Amazon Ember", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.25rem',
  '--phi-font-size-xxl': '1.875rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
  '--phi-shadow-md': '0 2px 8px rgba(0, 0, 0, 0.12)',
  '--phi-shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.16)',

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
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0px',
  '--phi-sidebar-collapsed-width': '80px',
  '--phi-sidebar-expanded-width': '240px',
  '--phi-sidebar-collapsed-spacer': '80px',
  '--phi-sidebar-expanded-spacer': '240px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #d5d9d9',
  '--phi-elevation-shadow': '0 2px 8px rgba(0, 0, 0, 0.12)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(255, 255, 255, 0.9)',
  '--phi-glass-blur': '8px',
  '--phi-tooltip-offset': '8px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#a60a2e',
  '--phi-alert-success-text': '#007600',
  '--phi-alert-warning-text': '#b85c00',
  '--phi-alert-info-text': '#0066cc',
};
