import React from 'react';
import { usePuiTheme, Popover, Stack, Span, Grid, Title } from '@phi/pui';

export const BrandSelector = () => {
  const { brandId, setBrandId, brands } = usePuiTheme();

  const currentBrand = brands.find((b) => b.id === brandId) || brands[0];

  return (
    <Popover
      trigger={
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: currentBrand.gradient,
            border: '2px solid var(--phi-color-border)',
            cursor: 'pointer',
          }}
          aria-label="Select brand theme"
          title={currentBrand.name}
        />
      }
      contentClassName="brand-popover"
    >
      <Stack direction="column" gap={2}>
        <Title variant="h5">Brand Themes ({brands.length})</Title>
        <Grid columns={2} gap={2}>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setBrandId(brand.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: 'var(--phi-radius-sm)',
                border: brand.id === brandId ? '2px solid var(--phi-color-primary)' : '1px solid var(--phi-color-border)',
                background: brand.id === brandId ? 'var(--phi-color-primary-bg)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <Span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: brand.gradient,
                  flexShrink: 0,
                }}
              />
              <Span variant="sm">{brand.name}</Span>
            </button>
          ))}
        </Grid>
      </Stack>
    </Popover>
  );
};