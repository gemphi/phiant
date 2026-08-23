import type { PageData } from '../../../types';
import { PINTEREST_THEME } from '../theme';

export const PINTEREST_BOARD_PAGE: PageData = {
  id: 'pinterest-board',
  name: 'Pinterest Board Detail',
  description: 'Board detail with cover, board info, and a grid of pins.',
  layoutType: 'pinterest',
  themeVars: PINTEREST_THEME,
  sections: [
    {
      id: 'board-header',
      name: 'Board Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2, align: 'center' },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Cozy Home Office Ideas' },
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Avatar', props: { initials: 'EM', size: 'sm' } },
                { type: 'Text', props: { variant: 'sm' }, children: 'emma.miller' },
                { type: 'Text', props: { variant: 'sm', color: 'secondary' }, children: '· 142 pins · 3d ago' },
              ],
            },
            {
              type: 'Row',
              props: { gap: 2, align: 'center' },
              children: [
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Follow' },
                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Share' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'board-pins',
      name: 'Board Pins Grid',
      body: [
        {
          type: 'Grid',
          props: { columns: 4, gap: 3 },
          dataSource: 'pinterest.board.pins',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 1 },
                    children: [
                      { type: 'Image', props: { src: '{item.image}', alt: '{item.title}' } },
                      { type: 'Text', props: { variant: 'sm', weight: 'semibold' }, children: '{item.title}' },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

export default PINTEREST_BOARD_PAGE;
