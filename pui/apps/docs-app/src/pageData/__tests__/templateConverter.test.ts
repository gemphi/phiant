import { describe, it, expect } from 'vitest';
import { layoutTemplateToPageData } from '../templateConverter';
import type { LayoutTemplate } from '../../datasets';

const mockTemplate: LayoutTemplate = {
  id: 'test-template',
  name: 'Test Template',
  description: 'A test template',
  category: 'test',
  icon: 'Layers',
  themeVars: { '--phi-color-primary': '#ff0000' },
  sections: [
    { id: 'sec-1', name: 'Section 1', layout: 'grid', cols: 3, gap: 2 },
    { id: 'sec-2', name: 'Section 2', layout: 'row', gap: 3 },
    { id: 'sec-3', name: 'Section 3', layout: 'col', gap: 1 },
  ],
};

describe('layoutTemplateToPageData', () => {
  const result = layoutTemplateToPageData(mockTemplate);

  it('preserves id, name, description', () => {
    expect(result.id).toBe('test-template');
    expect(result.name).toBe('Test Template');
    expect(result.description).toBe('A test template');
  });

  it('sets layoutType to template id', () => {
    expect(result.layoutType).toBe('test-template');
  });

  it('preserves themeVars', () => {
    expect(result.themeVars).toEqual({ '--phi-color-primary': '#ff0000' });
  });

  it('creates a section for each template section', () => {
    expect(result.sections).toHaveLength(3);
  });

  it('preserves section ids and names', () => {
    expect(result.sections[0].id).toBe('sec-1');
    expect(result.sections[0].name).toBe('Section 1');
  });

  it('wraps each section in a Card with CardHeader and CardBody', () => {
    const comp = result.sections[0].components[0];
    expect(comp.type).toBe('Card');
    const children = comp.children as any[];
    expect(children[0].type).toBe('CardHeader');
    expect(children[1].type).toBe('CardBody');
  });

  it('creates placeholder components based on layout', () => {
    const gridSection = result.sections[0];
    const card = gridSection.components[0];
    const body = (card.children as any[])[1];
    const layoutComp = body.children.find((c: any) => c.type === 'Stack' || c.type === 'Row');
    expect(layoutComp).toBeDefined();
  });
});
