import React from 'react';
import { Drawer, Button, Title, Text, Stack, Divider, Icon, Grid, Span, usePuiTheme } from '@phient/pui';
import { THEME_OPTIONS, THEME_STYLE_OPTIONS, RADIUS_OPTIONS, ANIMATION_SPEED_OPTIONS, LAYOUT_DENSITY_OPTIONS, CHECK_ICON } from '../datasets';
import styles from './SettingsDrawer.module.scss';

type SettingsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
  const { theme, setTheme, themeStyle, setThemeStyle, brandId, setBrandId, brands, isDark } = usePuiTheme();
  const [activeRadius, setActiveRadius] = React.useState('md');
  const [activeSpeed, setActiveSpeed] = React.useState('default');
  const [activeDensity, setActiveDensity] = React.useState('default');

  const applyRadius = (option: typeof RADIUS_OPTIONS[0]) => {
    setActiveRadius(option.id);
    document.documentElement.style.setProperty('--phi-radius-sm', option.sm);
    document.documentElement.style.setProperty('--phi-radius-md', option.md);
    document.documentElement.style.setProperty('--phi-radius-lg', option.lg);
  };

  const applyAnimationSpeed = (option: typeof ANIMATION_SPEED_OPTIONS[0]) => {
    setActiveSpeed(option.id);
    document.documentElement.style.setProperty('--phi-animation-speed', option.value);
  };

  const applyDensity = (option: typeof LAYOUT_DENSITY_OPTIONS[0]) => {
    setActiveDensity(option.id);
    Object.entries(option.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string);
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Preferences" size="xl">
      <Stack direction="column" gap={5}>
        {/* Theme Mode - icon controls */}
        <Stack direction="column" gap={2}>
          <Title variant="h5">Appearance</Title>
          <Text variant="sm" className={styles.sectionDesc}>
            Mode · Style · Brand · Radius · Speed
          </Text>
          <Stack direction="row" gap={2}>
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.iconControl} ${theme === opt.id ? styles.iconControlActive : ''}`}
                onClick={() => setTheme(opt.id)}
                title={opt.label}
              >
                <opt.icon size={20} />
                <Span variant="sm">{opt.label}</Span>
              </button>
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Theme Style - icon controls */}
        <Stack direction="column" gap={2}>
          <Title variant="h5">Style</Title>
          <Text variant="sm" className={styles.sectionDesc}>
            Flat surfaces, gradient backgrounds, elevated shadows, or frosted glass.
          </Text>
          <Stack direction="row" gap={2}>
            {THEME_STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.iconControl} ${themeStyle === opt.id ? styles.iconControlActive : ''}`}
                onClick={() => setThemeStyle(opt.id)}
                title={opt.label}
              >
                <opt.icon size={20} />
                <Span variant="sm">{opt.label}</Span>
              </button>
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Corner Radius - icon controls */}
        <Stack direction="column" gap={2}>
          <Title variant="h5">Corner Radius</Title>
          <Stack direction="row" gap={2} wrap="wrap">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.radiusControl} ${activeRadius === opt.id ? styles.radiusControlActive : ''}`}
                onClick={() => applyRadius(opt)}
                title={opt.label}
              >
                <Span
                  className={styles.radiusPreview}
                  style={{
                    borderRadius: opt.md,
                  }}
                />
                <Span variant="sm">{opt.id}</Span>
              </button>
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Animation Speed - icon controls */}
        <Stack direction="column" gap={2}>
          <Title variant="h5">Animation Speed</Title>
          <Text variant="sm" className={styles.sectionDesc}>
            Controls sidebar slide, drawer, modal, and toast animation duration.
          </Text>
          <Stack direction="row" gap={2}>
            {ANIMATION_SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.iconControl} ${activeSpeed === opt.id ? styles.iconControlActive : ''}`}
                onClick={() => applyAnimationSpeed(opt)}
                title={opt.label}
              >
                <opt.icon size={20} />
                <Span variant="sm">{opt.label}</Span>
              </button>
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Layout Density - 3 options */}
        <Stack direction="column" gap={2}>
          <Title variant="h5">Layout Density</Title>
          <Text variant="sm" className={styles.sectionDesc}>
            Controls sidebar margins, header height, content padding, and header glow on scroll.
          </Text>
          <Stack direction="row" gap={2}>
            {LAYOUT_DENSITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.iconControl} ${activeDensity === opt.id ? styles.iconControlActive : ''}`}
                onClick={() => applyDensity(opt)}
                title={opt.label}
              >
                <opt.icon size={20} />
                <Span variant="sm">{opt.label}</Span>
              </button>
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* Brand Palette - swatch grid */}
        <Stack direction="column" gap={3}>
          <Title variant="h5">Brand</Title>
          <Text variant="sm" className={styles.sectionDesc}>
            {brands.length} brand presets · {isDark ? 'Dark' : 'Light'} mode active
          </Text>
          <Grid columns={4} gap={2}>
            {brands.map((b) => (
              <button
                key={b.id}
                className={`${styles.brandSwatch} ${brandId === b.id ? styles.brandSwatchActive : ''}`}
                onClick={() => setBrandId(b.id)}
                title={b.name}
              >
                <Span
                  className={styles.brandSwatchColor}
                  style={{ background: isDark ? b.gradientDark : b.gradient }}
                />
                <Span variant="sm" className={styles.brandSwatchLabel}>{b.name}</Span>
                {brandId === b.id && (
                  <Span className={styles.brandSwatchCheck}>
                    <CHECK_ICON size={14} />
                  </Span>
                )}
              </button>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default SettingsDrawer;