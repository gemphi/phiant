import { describe, it, expect } from 'vitest';
import { ALL_SITES, SITE_REGISTRY } from '../sites';
import type { PageData, SiteDefinition, Section } from '../types';

const getSectionBlocks = (section: Section): number => {
  const headerCount = section.header ? (Array.isArray(section.header) ? section.header.length : 1) : 0;
  const bodyCount = section.body ? (Array.isArray(section.body) ? section.body.length : 1) : 0;
  const footerCount = section.footer ? (Array.isArray(section.footer) ? section.footer.length : 1) : 0;
  return headerCount + bodyCount + footerCount;
};

const validatePage = (page: PageData, siteId: string) => {
  expect(page.id).toBeTruthy();
  expect(page.name).toBeTruthy();
  expect(page.layoutType).toBe(siteId);
  expect(page.sections.length).toBeGreaterThanOrEqual(1);

  page.sections.forEach((section) => {
    expect(section.id).toBeTruthy();
    expect(getSectionBlocks(section)).toBeGreaterThan(0);
  });
};

const validateSite = (site: SiteDefinition) => {
  expect(site.id).toBeTruthy();
  expect(site.name).toBeTruthy();
  expect(site.pages.length).toBeGreaterThanOrEqual(3);
  site.pages.forEach((page) => validatePage(page, site.id));
};

describe('Site Registry', () => {
  it('contains at least 4 sites', () => {
    expect(ALL_SITES.length).toBeGreaterThanOrEqual(4);
  });

  it('includes App Store, X.com, TikTok, and YouTube', () => {
    expect(SITE_REGISTRY['app-store']).toBeDefined();
    expect(SITE_REGISTRY['x-com']).toBeDefined();
    expect(SITE_REGISTRY['tiktok']).toBeDefined();
    expect(SITE_REGISTRY['youtube']).toBeDefined();
  });

  it('every site has valid structure', () => {
    ALL_SITES.forEach(validateSite);
  });

  it('every page has themeVars', () => {
    ALL_SITES.forEach((site) => {
      site.pages.forEach((page) => {
        expect(page.themeVars).toBeDefined();
        expect(Object.keys(page.themeVars!).length).toBeGreaterThan(0);
      });
    });
  });

  it('every section has at least one block in header/body/footer', () => {
    ALL_SITES.forEach((site) => {
      site.pages.forEach((page) => {
        page.sections.forEach((section) => {
          expect(getSectionBlocks(section)).toBeGreaterThan(0);
        });
      });
    });
  });
});
