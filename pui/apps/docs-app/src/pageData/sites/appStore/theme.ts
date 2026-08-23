import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * App Store — blue, very rounded, premium and polished.
 * Soft gray canvas with crisp white cards and generous rounding.
 */
export const APP_STORE_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#0071e3',
  '--phi-color-primary-hover': '#0058b8',
  '--phi-color-primary-light': 'rgba(0, 113, 227, 0.1)',
  '--phi-color-secondary': '#147ce9',
  '--phi-color-secondary-hover': '#0a64c4',
  '--phi-color-error': '#ff3b30',
  '--phi-color-error-hover': '#d70015',
  '--phi-color-error-light': 'rgba(255, 59, 48, 0.12)',
  '--phi-color-success': '#34c759',
  '--phi-color-success-light': 'rgba(52, 199, 89, 0.12)',
  '--phi-color-warning': '#ff9500',
  '--phi-color-warning-light': 'rgba(255, 149, 0, 0.12)',
  '--phi-color-info': '#5ac8fa',
  '--phi-color-info-light': 'rgba(90, 200, 250, 0.12)',
  '--phi-color-background': '#f5f5f7',
  '--phi-color-background-rgb': '245, 245, 247',
  '--phi-color-background-card': '#ffffff',
  '--phi-color-background-secondary': '#eeeef0',
  '--phi-color-text-primary': '#1d1d1f',
  '--phi-color-text-secondary': '#86868b',
  '--phi-color-text-inverse': '#ffffff',
  '--phi-color-border': '#d2d2d7',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #0071e3 0%, #5ac8fa 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #5ac8fa 0%, #0071e3 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)',

  /* ---------- Radius (very rounded, premium) ---------- */
  '--phi-radius-sm': '10px',
  '--phi-radius-md': '18px',
  '--phi-radius-lg': '28px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'SF Pro Display', 'Inter', sans-serif",
  '--phi-font-heading': "'SF Pro Display', 'Inter', sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1.0625rem',
  '--phi-font-size-lg': '1.375rem',
  '--phi-font-size-xxl': '2rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '500',
  '--phi-font-weight-semibold': '600',
  '--phi-font-weight-bold': '700',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.06)',
  '--phi-shadow-md': '0 4px 16px rgba(0, 0, 0, 0.08)',
  '--phi-shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.12)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '0.875rem',
  '--phi-space-3': '1.25rem',
  '--phi-space-4': '1.75rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.3s',
  '--phi-transition-fast': '0.2s',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.75rem',
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0',
  '--phi-sidebar-collapsed-width': '80px',
  '--phi-sidebar-expanded-width': '260px',
  '--phi-sidebar-collapsed-spacer': '80px',
  '--phi-sidebar-expanded-spacer': '260px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #d2d2d7',
  '--phi-elevation-shadow': '0 4px 16px rgba(0, 0, 0, 0.08)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(245, 245, 247, 0.8)',
  '--phi-glass-blur': '16px',
  '--phi-tooltip-offset': '10px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#d70015',
  '--phi-alert-success-text': '#249a3d',
  '--phi-alert-warning-text': '#cc7a00',
  '--phi-alert-info-text': '#0058b8',
};
