import type { LayoutTemplate } from '../datasets';
import type { PageComponent, PageData, PageSection } from './types';

const createPlaceholderComponents = (section: LayoutTemplate['sections'][number]): PageComponent[] => {
  const { layout, cols = 2, gap = 2 } = section;

  const blocks: PageComponent[] = Array.from({ length: layout === 'grid' ? cols * 2 : 4 }).map(() => ({
    type: 'Span',
    props: {
      style: {
        display: 'block',
        height: '2.5rem',
        borderRadius: 'var(--phi-radius-md, 0.375rem)',
        background: 'var(--phi-color-background-secondary, #e2e8f0)',
      },
    },
  }));

  const layoutComponent: PageComponent = {
    type: layout === 'row' ? 'Row' : 'Stack',
    props: layout === 'row' ? { gap } : { direction: 'column', gap },
    children: blocks,
  };

  return [layoutComponent];
};

export const layoutTemplateToPageData = (template: LayoutTemplate): PageData => {
  const sections: PageSection[] = template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    layout: section.layout,
    cols: section.cols,
    gap: section.gap,
    components: [
      {
        type: 'Card',
        props: section.props,
        children: [
          {
            type: 'CardHeader',
            children: [{ type: 'Title', props: { variant: 'h5' }, children: section.name }],
          },
          {
            type: 'CardBody',
            children: [
              {
                type: 'Text',
                props: { variant: 'sm' },
                children: `Layout: ${section.layout}${section.cols ? ` · cols ${section.cols}` : ''}${section.gap ? ` · gap ${section.gap}` : ''}`,
              },
              { type: 'Divider' },
              ...createPlaceholderComponents(section),
            ],
          },
        ],
      },
    ],
  }));

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    layoutType: template.id,
    themeVars: template.themeVars,
    sections,
  };
};
