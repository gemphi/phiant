import type { PageData } from '../../../types';
import { YOUTUBE_THEME } from '../theme';

export const YOUTUBE_FEED_PAGE: PageData = {
  id: 'youtube-feed',
  name: 'YouTube Feed',
  description: 'Video feed with search bar and video grid.',
  layoutType: 'youtube',
  themeVars: YOUTUBE_THEME,
  sections: [
    {
      id: 'search-bar',
      name: 'Search',
      body: [
        { type: 'Input', props: { placeholder: 'Search', iconLeft: 'Search' } },
      ],
    },
    {
      id: 'video-grid',
      name: 'Videos',
      header: { type: 'Title', props: { variant: 'h4' }, children: 'Recommended' },
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 3 },
          dataSource: 'youtube.feed.videos',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Stack',
                    props: { direction: 'column', gap: 0, align: 'center', className: 'youtube-thumbnail' },
                    children: [
                      { type: 'Icon', props: { name: 'Play', size: 32 } },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.duration}' },
                    ],
                  },
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'start' },
                    children: [
                      { type: 'Avatar', props: { initials: '{item.channelInitials}', size: 'sm' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 0 },
                        children: [
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.channel}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.views} · {item.uploaded}' },
                        ],
                      },
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

export default YOUTUBE_FEED_PAGE;
