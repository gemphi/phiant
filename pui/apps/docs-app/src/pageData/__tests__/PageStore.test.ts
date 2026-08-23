import { describe, it, expect } from 'vitest';
import { getAtPath, getComponentAtPath, getParentPath, getBreadcrumbPaths } from '../PageStore';
import type { PageData } from '../types';

const mockPage: PageData = {
  id: 'test-page',
  name: 'Test Page',
  layoutType: 'test',
  sections: [
    {
      id: 'section-0',
      body: [
        {
          type: 'Card',
          props: { hoverable: true },
          children: [
            { type: 'CardBody', children: [{ type: 'Text', props: { variant: 'sm' }, children: 'Hello' }] },
          ],
        },
        { type: 'Button', props: { variant: 'primary' }, children: 'Click' },
      ],
    },
    {
      id: 'section-1',
      body: [{ type: 'Badge', props: { variant: 'secondary' }, children: 'New' }],
    },
  ],
};

describe('getAtPath', () => {
  it('retrieves a top-level section', () => {
    const result = getAtPath(mockPage, 'sections.0');
    expect(result).toBe(mockPage.sections[0]);
  });

  it('retrieves a nested block via body', () => {
    const result = getAtPath(mockPage, 'sections.0.body.0');
    expect(result).toEqual((mockPage.sections[0].body as any[])[0]);
  });

  it('retrieves a deeply nested child', () => {
    const result = getAtPath(mockPage, 'sections.0.body.0.children.0');
    expect(result).toEqual(((mockPage.sections[0].body as any[])[0].children as any[])[0]);
  });

  it('returns undefined for invalid path', () => {
    expect(getAtPath(mockPage, 'sections.99')).toBeUndefined();
    expect(getAtPath(mockPage, 'invalid.path')).toBeUndefined();
  });
});

describe('getComponentAtPath', () => {
  it('returns a block at a valid path', () => {
    const result = getComponentAtPath(mockPage, 'sections.0.body.1');
    expect(result?.type).toBe('Button');
  });

  it('returns a nested child block', () => {
    const result = getComponentAtPath(mockPage, 'sections.0.body.0.children.0');
    expect(result?.type).toBe('CardBody');
  });

  it('returns undefined for invalid path', () => {
    expect(getComponentAtPath(mockPage, 'sections.99.body.0')).toBeUndefined();
  });
});

describe('getParentPath', () => {
  it('returns the parent of a block path', () => {
    expect(getParentPath('sections.0.body.0')).toBe('sections.0.body');
  });

  it('returns the parent of a nested child', () => {
    expect(getParentPath('sections.0.body.0.children.0')).toBe('sections.0.body.0.children');
  });

  it('returns null for a top-level path', () => {
    expect(getParentPath('sections')).toBeNull();
  });
});

describe('getBreadcrumbPaths', () => {
  it('returns all ancestor paths including self', () => {
    const crumbs = getBreadcrumbPaths('sections.0.body.0');
    expect(crumbs).toEqual(['sections', 'sections.0', 'sections.0.body', 'sections.0.body.0']);
  });

  it('returns single element for top-level path', () => {
    expect(getBreadcrumbPaths('sections')).toEqual(['sections']);
  });
});
