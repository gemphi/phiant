/**
 * Complete theme definition — covers ALL CSS custom properties used by PUI (Phient UI).
 * Each site theme should implement this fully to control colors, radius, fonts,
 * shadows, spacing, animations, and layout.
 */
export type SiteTheme = {
  /* ---------- Colors ---------- */
  '--phi-color-primary': string;
  '--phi-color-primary-hover': string;
  '--phi-color-primary-light': string;
  '--phi-color-secondary': string;
  '--phi-color-secondary-hover': string;
  '--phi-color-error': string;
  '--phi-color-error-hover': string;
  '--phi-color-error-light': string;
  '--phi-color-success': string;
  '--phi-color-success-light': string;
  '--phi-color-warning': string;
  '--phi-color-warning-light': string;
  '--phi-color-info': string;
  '--phi-color-info-light': string;
  '--phi-color-background': string;
  '--phi-color-background-rgb': string;
  '--phi-color-background-card': string;
  '--phi-color-background-secondary': string;
  '--phi-color-text-primary': string;
  '--phi-color-text-secondary': string;
  '--phi-color-text-inverse': string;
  '--phi-color-border': string;

  /* ---------- Gradients ---------- */
  '--phi-brand-gradient': string;
  '--phi-icon-gradient': string;
  '--phi-surface-gradient': string;
  '--phi-surface-gradient-reverse': string;

  /* ---------- Radius (roundness) ---------- */
  '--phi-radius-sm': string;
  '--phi-radius-md': string;
  '--phi-radius-lg': string;
  '--phi-radius-full': string;

  /* ---------- Typography ---------- */
  '--phi-font-family': string;
  '--phi-font-heading': string;
  '--phi-font-size-xs': string;
  '--phi-font-size-sm': string;
  '--phi-font-size-base': string;
  '--phi-font-size-lg': string;
  '--phi-font-size-xxl': string;
  '--phi-font-weight-normal': string;
  '--phi-font-weight-medium': string;
  '--phi-font-weight-semibold': string;
  '--phi-font-weight-bold': string;

  /* ---------- Shadows ---------- */
  '--phi-shadow-sm': string;
  '--phi-shadow-md': string;
  '--phi-shadow-lg': string;

  /* ---------- Spacing ---------- */
  '--phi-space-1': string;
  '--phi-space-2': string;
  '--phi-space-3': string;
  '--phi-space-4': string;

  /* ---------- Animation ---------- */
  '--phi-animation-speed': string;
  '--phi-transition-fast': string;

  /* ---------- Layout ---------- */
  '--phi-layout-content-padding': string;
  '--phi-layout-header-height': string;
  '--phi-layout-sidebar-margin': string;
  '--phi-sidebar-collapsed-width': string;
  '--phi-sidebar-expanded-width': string;
  '--phi-sidebar-collapsed-spacer': string;
  '--phi-sidebar-expanded-spacer': string;
  '--phi-sidebar-header-height': string;

  /* ---------- Elevation ---------- */
  '--phi-elevation-border': string;
  '--phi-elevation-shadow': string;

  /* ---------- Effects ---------- */
  '--phi-backdrop-color': string;
  '--phi-glass-blur': string;
  '--phi-tooltip-offset': string;

  /* ---------- Alert text colors ---------- */
  '--phi-alert-error-text': string;
  '--phi-alert-success-text': string;
  '--phi-alert-warning-text': string;
  '--phi-alert-info-text': string;

  [key: string]: string;
};
