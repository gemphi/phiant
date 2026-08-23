'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeStyle, PuiContextValue } from './types';
import { BRAND_THEMES } from './themes';
import { ServiceProvider } from '../services/ServiceProvider';
import { IServiceContainer } from '../services/types';

export * from './types';
export * from './themes';

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
export const usePTheme = usePuiTheme;
export const useVvidTheme = usePuiTheme;

const getIsDark = (t: Theme) => {
  if (typeof window === 'undefined') return false;
  return t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
};

const applyDOMTheme = (theme: Theme, brandId: string, style: ThemeStyle) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = getIsDark(theme);
  root.classList.toggle('dark', isDark);
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  root.setAttribute('data-theme-style', style);

  const brand = BRAND_THEMES.find((b) => b.id === brandId) || BRAND_THEMES[0];
  const { colors } = brand;
  root.style.setProperty('--phi-color-primary', colors.primary);
  root.style.setProperty('--phi-color-primary-hover', colors.primaryHover);
  root.style.setProperty('--phi-color-primary-light', isDark ? colors.primaryLightDark : colors.primaryLight);
  root.style.setProperty('--phi-color-success', colors.success);
  root.style.setProperty('--phi-brand-gradient', isDark ? brand.gradientDark : brand.gradient);
};

export interface PuiProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultThemeStyle?: ThemeStyle;
  defaultBrand?: string;
  container?: IServiceContainer;
}

export const PuiProvider: React.FC<PuiProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultThemeStyle = 'flat',
  defaultBrand = 'foundry',
  container,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => (typeof window !== 'undefined' ? (localStorage.getItem('phi-theme') as Theme) || defaultTheme : defaultTheme));
  const [themeStyle, setThemeStyleState] = useState<ThemeStyle>(() => (typeof window !== 'undefined' ? (localStorage.getItem('phi-style') as ThemeStyle) || defaultThemeStyle : defaultThemeStyle));
  const [brandId, setBrandIdState] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('phi-brand') || defaultBrand : defaultBrand));

  useEffect(() => {
    applyDOMTheme(theme, brandId, themeStyle);
  }, [theme, brandId, themeStyle]);

  const setTheme = (t: Theme) => { setThemeState(t); localStorage.setItem('phi-theme', t); };
  const setThemeStyle = (s: ThemeStyle) => { setThemeStyleState(s); localStorage.setItem('phi-style', s); };
  const setBrandId = (b: string) => { setBrandIdState(b); localStorage.setItem('phi-brand', b); };

  return (
    <PuiContext.Provider value={{ theme, setTheme, themeStyle, setThemeStyle, brandId, setBrandId, brands: BRAND_THEMES, isDark: getIsDark(theme) }}>
      <ServiceProvider container={container}>{children}</ServiceProvider>
    </PuiContext.Provider>
  );
};

export const PhiProvider = PuiProvider;
export const PProvider = PuiProvider;
export default PuiProvider;
