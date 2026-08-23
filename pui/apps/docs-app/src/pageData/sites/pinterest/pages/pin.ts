import type { PageData } from '../../../types';
import { PINTEREST_THEME } from '../theme';

export const PINTEREST_PIN_PAGE: PageData = {
  id: 'pinterest-pin',
  name: 'Pinterest Pin Detail',
  description: 'Pin detail with image, description, actions, and comments with replies.',
  layoutType: 'pinterest',
  themeVars: PINTEREST_THEME,
  sections: [
    {
      id: 'pin-detail',
      name: 'Pin Detail',
      body: [
        {
          type: 'Row',
          props: { gap: 4, align: 'start' },
          children: [
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardBody',
                  children: [
                    { type: 'Span', props: { className: 'image-placeholder', style: { aspectRatio: '3 / 4', background: 'linear-gradient(135deg, #e60023, #ff4d6d)', borderRadius: '16px', minHeight: '480px' } } },
                  ],
                },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                {
                  type: 'Row',
                  props: { justify: 'between', align: 'center' },
                  children: [
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'ArrowUp' } },
                        { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'Share2' } },
                        { type: 'Button', props: { variant: 'secondary', size: 'md', iconLeft: 'MoreHorizontal' } },
                      ],
                    },
                    { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Save' },
                  ],
                },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Title', props: { variant: 'h3' }, children: 'Scandinavian living room with oak accents and natural light' },
                    { type: 'Text', props: { variant: 'default' }, children: 'A bright, airy living space styled with warm oak furniture, soft textiles, and a curated gallery wall. The neutral palette keeps the room calm while the layered textures add depth.' },
                  ],
                },
                {
                  type: 'Row',
                  props: { gap: 2, align: 'center' },
                  children: [
                    { type: 'Avatar', props: { initials: 'EM', size: 'md' } },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 0 },
                      children: [
                        { type: 'Title', props: { variant: 'h6' }, children: 'emma.miller' },
                        { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '12.4K followers' },
                      ],
                    },
                    { type: 'Button', props: { variant: 'secondary', size: 'sm' }, children: 'Follow' },
                  ],
                },
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 1 },
                  children: [
                    { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: 'homestyling.co' },
                    { type: 'Text', props: { variant: 'sm' }, children: 'Saved 8,432 times · 1,287 comments' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'pin-comments',
      name: 'Comments',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 3 },
          children: [
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'U', size: 'sm' } },
                { type: 'Input', props: { placeholder: 'Add a comment...', type: 'text' } },
                { type: 'Button', props: { variant: 'primary', size: 'sm' }, children: 'Done' },
              ],
            },
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              dataSource: 'pinterest.pin.comments',
              itemTemplate: {
                type: 'Stack',
                props: { direction: 'column', gap: 1 },
                children: [
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'center' },
                    children: [
                      { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.author}', size: 'sm' } },
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.handle}' },
                      { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '{item.time}' },
                    ],
                  },
                  { type: 'Text', props: { variant: 'default' }, children: '{item.text}' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export default PINTEREST_PIN_PAGE;
