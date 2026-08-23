import type { SiteTheme } from '../../store/services/themeTypes';

/**
 * TikTok — cyan + black, very rounded, bold and energetic.
 * Dark canvas with neon accents and pill-shaped controls.
 */
export const TIKTOK_THEME: SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': '#fe2c55',
  '--phi-color-primary-hover': '#e01e44',
  '--phi-color-primary-light': 'rgba(254, 44, 85, 0.12)',
  '--phi-color-secondary': '#25f4ee',
  '--phi-color-secondary-hover': '#11d9d2',
  '--phi-color-error': '#fe2c55',
  '--phi-color-error-hover': '#e01e44',
  '--phi-color-error-light': 'rgba(254, 44, 85, 0.16)',
  '--phi-color-success': '#25f4ee',
  '--phi-color-success-light': 'rgba(37, 244, 238, 0.16)',
  '--phi-color-warning': '#ffcc00',
  '--phi-color-warning-light': 'rgba(255, 204, 0, 0.16)',
  '--phi-color-info': '#25f4ee',
  '--phi-color-info-light': 'rgba(37, 244, 238, 0.16)',
  '--phi-color-background': '#000000',
  '--phi-color-background-rgb': '0, 0, 0',
  '--phi-color-background-card': '#111112',
  '--phi-color-background-secondary': '#161618',
  '--phi-color-text-primary': '#ffffff',
  '--phi-color-text-secondary': '#8a8b91',
  '--phi-color-text-inverse': '#000000',
  '--phi-color-border': '#2f2f2f',

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': 'linear-gradient(135deg, #25f4ee 0%, #fe2c55 100%)',
  '--phi-icon-gradient': 'linear-gradient(135deg, #fe2c55 0%, #25f4ee 100%)',
  '--phi-surface-gradient': 'linear-gradient(180deg, #161618 0%, #000000 100%)',
  '--phi-surface-gradient-reverse': 'linear-gradient(180deg, #000000 0%, #161618 100%)',

  /* ---------- Radius (very rounded, bold) ---------- */
  '--phi-radius-sm': '10px',
  '--phi-radius-md': '16px',
  '--phi-radius-lg': '24px',
  '--phi-radius-full': '9999px',

  /* ---------- Typography ---------- */
  '--phi-font-family': "'Proxima Nova', 'Inter', sans-serif",
  '--phi-font-heading': "'Proxima Nova', 'Inter', sans-serif",
  '--phi-font-size-xs': '0.75rem',
  '--phi-font-size-sm': '0.875rem',
  '--phi-font-size-base': '1rem',
  '--phi-font-size-lg': '1.375rem',
  '--phi-font-size-xxl': '2rem',
  '--phi-font-weight-normal': '400',
  '--phi-font-weight-medium': '600',
  '--phi-font-weight-semibold': '700',
  '--phi-font-weight-bold': '800',

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
  '--phi-shadow-md': '0 4px 16px rgba(254, 44, 85, 0.25)',
  '--phi-shadow-lg': '0 12px 32px rgba(37, 244, 238, 0.3)',

  /* ---------- Spacing ---------- */
  '--phi-space-1': '0.5rem',
  '--phi-space-2': '0.75rem',
  '--phi-space-3': '1rem',
  '--phi-space-4': '1.75rem',

  /* ---------- Animation ---------- */
  '--phi-animation-speed': '0.25s',
  '--phi-transition-fast': '0.18s',

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': '1.25rem',
  '--phi-layout-header-height': '60px',
  '--phi-layout-sidebar-margin': '0',
  '--phi-sidebar-collapsed-width': '80px',
  '--phi-sidebar-expanded-width': '260px',
  '--phi-sidebar-collapsed-spacer': '80px',
  '--phi-sidebar-expanded-spacer': '260px',
  '--phi-sidebar-header-height': '60px',

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': '1px solid #2f2f2f',
  '--phi-elevation-shadow': '0 4px 16px rgba(254, 44, 85, 0.25)',

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': 'rgba(0, 0, 0, 0.7)',
  '--phi-glass-blur': '12px',
  '--phi-tooltip-offset': '10px',

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': '#fe6c8a',
  '--phi-alert-success-text': '#5ff7f1',
  '--phi-alert-warning-text': '#ffdb4d',
  '--phi-alert-info-text': '#5ff7f1',
};
