'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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

const B = (overrides: Partial<BrandColors>): BrandColors => ({
  primary: '#3b82f6', primaryHover: '#2563eb', primaryLight: '#eff6ff', primaryLightDark: '#1e3a8a',
  secondary: '#475569', secondaryHover: '#334155',
  success: '#10b981', successLight: '#ecfdf5', successLightDark: '#064e3b',
  warning: '#f59e0b', warningLight: '#fffbeb', warningLightDark: '#78350f',
  error: '#ef4444', errorHover: '#dc2626', errorLight: '#fef2f2', errorLightDark: '#450a0a',
  info: '#0ea5e9', infoHover: '#0284c7', infoLight: '#f0f9ff', infoLightDark: '#0c4a6e',
  ...overrides,
});

export const BRAND_THEMES: BrandTheme[] = [
  { id: 'foundry', name: 'Palantir Foundry', colors: B({ primary: '#3b82f6', primaryHover: '#2563eb', primaryLight: '#eff6ff', primaryLightDark: '#1e3a8a', secondary: '#475569', secondaryHover: '#334155' }), gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', gradientDark: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)' },
  { id: 'blueprint', name: 'Blueprint Slate', colors: B({ primary: '#2d72d2', primaryHover: '#1f53a3', primaryLight: '#ebf1f5', primaryLightDark: '#182026', secondary: '#5c7080', secondaryHover: '#394b59' }), gradient: 'linear-gradient(135deg, #2d72d2 0%, #106ba3 100%)', gradientDark: 'linear-gradient(135deg, #2d72d2 0%, #182026 100%)' },
  { id: 'pui', name: 'PUI Purple', colors: B({ primary: '#7c3aed', primaryHover: '#6d28d9', primaryLight: '#f5f3ff', primaryLightDark: '#2e1065', secondary: '#27272a', secondaryHover: '#3f3f46' }), gradient: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)', gradientDark: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)' },
  { id: 'emerald', name: 'Emerald Foundry', colors: B({ primary: '#10b981', primaryHover: '#059669', primaryLight: '#ecfdf5', primaryLightDark: '#064e3b', secondary: '#064e3b', secondaryHover: '#065f46' }), gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', gradientDark: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)' },
  { id: 'midnight', name: 'Midnight Indigo', colors: B({ primary: '#4f46e5', primaryHover: '#4338ca', primaryLight: '#eef2ff', primaryLightDark: '#1e1b4b', secondary: '#1e1b4b', secondaryHover: '#312e81' }), gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', gradientDark: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)' },
  { id: 'amber', name: 'Amber Gold', colors: B({ primary: '#d97706', primaryHover: '#b45309', primaryLight: '#fffbeb', primaryLightDark: '#451a03', secondary: '#1c1917', secondaryHover: '#292524' }), gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)', gradientDark: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)' },
  { id: 'crimson', name: 'Crimson Alert', colors: B({ primary: '#dc2626', primaryHover: '#b91c1c', primaryLight: '#fef2f2', primaryLightDark: '#450a0a', secondary: '#1c1917', secondaryHover: '#292524' }), gradient: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)', gradientDark: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)' },
];

export const THEME_STYLES: { id: ThemeStyle; name: string }[] = [
  { id: 'flat', name: 'Flat' },
  { id: 'gradient', name: 'Gradient' },
  { id: 'elevated', name: 'Elevated' },
  { id: 'glass', name: 'Glass' },
];

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

const PuiContext = createContext<PuiContextValue>({
  theme: 'system',
  setTheme: () => {},
  themeStyle: 'flat',
  setThemeStyle: () => {},
  brandId: 'foundry',
  setBrandId: () => {},
  brands: BRAND_THEMES,
  isDark: false,
});

export const usePuiTheme = () => useContext(PuiContext);
export const usePhiTheme = usePuiTheme;
export const usePuiTheme = usePuiTheme;

const STORAGE_KEY = 'phi-theme';
const BRAND_KEY = 'phi-brand';
const STYLE_KEY = 'phi-theme-style';

const getIsDark = (theme: Theme) => {
  if (typeof window === 'undefined') return false;
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = getIsDark(theme);
  if (isDark) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
};

const applyThemeStyle = (style: ThemeStyle) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme-style', style);
};

const applyBrand = (brandId: string, isDark: boolean) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const brand = BRAND_THEMES.find((b) => b.id === brandId) || BRAND_THEMES[0];
  const { colors } = brand;

  // Apply --phi- and --phi- custom properties
  root.style.setProperty('--phi-color-primary', colors.primary);
  root.style.setProperty('--phi-color-primary-hover', colors.primaryHover);
  root.style.setProperty('--phi-color-primary-light', isDark ? colors.primaryLightDark : colors.primaryLight);
  root.style.setProperty('--phi-color-secondary', colors.secondary);
  root.style.setProperty('--phi-color-secondary-hover', colors.secondaryHover);
  root.style.setProperty('--phi-color-success', colors.success);
  root.style.setProperty('--phi-color-success-light', isDark ? colors.successLightDark : colors.successLight);
  root.style.setProperty('--phi-color-warning', colors.warning);
  root.style.setProperty('--phi-color-warning-light', isDark ? colors.warningLightDark : colors.warningLight);
  root.style.setProperty('--phi-color-error', colors.error);
  root.style.setProperty('--phi-color-error-hover', colors.errorHover);
  root.style.setProperty('--phi-color-error-light', isDark ? colors.errorLightDark : colors.errorLight);
  root.style.setProperty('--phi-color-info', colors.info);
  root.style.setProperty('--phi-color-info-hover', colors.infoHover);
  root.style.setProperty('--phi-color-info-light', isDark ? colors.infoLightDark : colors.infoLight);
  root.style.setProperty('--phi-brand-gradient', isDark ? brand.gradientDark : brand.gradient);

  // Sync to legacy aliases
  root.style.setProperty('--phi-color-primary', colors.primary);
  root.style.setProperty('--phi-color-primary-hover', colors.primaryHover);
  root.style.setProperty('--phi-brand-gradient', isDark ? brand.gradientDark : brand.gradient);
};

export interface PuiProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultThemeStyle?: ThemeStyle;
  defaultBrand?: string;
}

export const PuiProvider: React.FC<PuiProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultThemeStyle = 'flat',
  defaultBrand = 'foundry',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [themeStyle, setThemeStyleState] = useState<ThemeStyle>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STYLE_KEY) as ThemeStyle) || defaultThemeStyle;
    }
    return defaultThemeStyle;
  });

  const [brandId, setBrandIdState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(BRAND_KEY) || defaultBrand;
    }
    return defaultBrand;
  });

  const isDark = getIsDark(theme);

  useEffect(() => {
    applyTheme(theme);
    applyBrand(brandId, isDark);
    applyThemeStyle(themeStyle);
  }, [theme, brandId, isDark, themeStyle]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const setThemeStyle = (newStyle: ThemeStyle) => {
    setThemeStyleState(newStyle);
    localStorage.setItem(STYLE_KEY, newStyle);
  };

  const setBrandId = (newBrand: string) => {
    setBrandIdState(newBrand);
    localStorage.setItem(BRAND_KEY, newBrand);
  };

  return (
    <PuiContext.Provider
      value={{
        theme,
        setTheme,
        themeStyle,
        setThemeStyle,
        brandId,
        setBrandId,
        brands: BRAND_THEMES,
        isDark,
      }}
    >
      {children}
    </PuiContext.Provider>
  );
};

export const PhiProvider = PuiProvider;
export const PuiProvider = PuiProvider;
export const PuiProvider = PuiProvider;
export default PuiProvider;
