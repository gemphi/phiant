import React from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ThemeStyle = 'flat' | 'gradient' | 'elevated' | 'glass';

export interface BrandColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryLightDark: string;
  secondary: string;
  secondaryHover: string;
  success: string;
  successLight: string;
  successLightDark: string;
  warning: string;
  warningLight: string;
  warningLightDark: string;
  error: string;
  errorHover: string;
  errorLight: string;
  errorLightDark: string;
  info: string;
  infoHover: string;
  infoLight: string;
  infoLightDark: string;
}

export interface BrandTheme {
  id: string;
  name: string;
  colors: BrandColors;
  gradient: string;
  gradientDark: string;
}

export interface PuiContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeStyle: ThemeStyle;
  setThemeStyle: (style: ThemeStyle) => void;
  brandId: string;
  setBrandId: (id: string) => void;
  brands: BrandTheme[];
  isDark: boolean;
}
