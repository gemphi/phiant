import type { PageData } from '../../../types';
import { NETFLIX_THEME } from '../theme';

export const NETFLIX_MYLIST_PAGE: PageData = {
  id: 'netflix-mylist',
  name: 'Netflix My List',
  description: 'User saved titles displayed in a grid with profile selector.',
  layoutType: 'netflix',
  themeVars: NETFLIX_THEME,
  sections: [
    {
      id: 'profile-selector',
      name: 'Profile Selector',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h4' }, children: 'Who\'s watching?' },
            {
              type: 'Row',
              props: { gap: 3 },
              dataSource: 'netflix.profiles',
              itemTemplate: {
                type: 'Stack',
                props: { direction: 'column', gap: 1, align: 'center' },
                children: [
                  { type: 'Avatar', props: { initials: '{item.initials}', size: 'lg' } },
                  { type: 'Text', props: { variant: 'sm' }, children: '{item.name}' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: 'my-list',
      name: 'My List',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'My List' },
      body: [
        {
          type: 'Grid',
          props: { columns: 5, gap: 2 },
          dataSource: 'netflix.mylist',
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
                      { type: 'Icon', props: { name: 'Film', size: 32 } },
                      { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.seasons}' },
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

export default NETFLIX_MYLIST_PAGE;
