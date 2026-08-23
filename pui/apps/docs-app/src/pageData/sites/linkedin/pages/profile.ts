import type { PageData } from '../../../types';
import { LINKEDIN_THEME } from '../theme';

export const LINKEDIN_PROFILE_PAGE: PageData = {
  id: 'linkedin-profile',
  name: 'LinkedIn Profile',
  description: 'User profile with experience, skills, and activity.',
  layoutType: 'linkedin',
  themeVars: LINKEDIN_THEME,
  sections: [
    {
      id: 'profile-header',
      name: 'Profile Header',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 3 },
                  children: [
                    { type: 'Image', props: { src: 'https://picsum.photos/seed/licover/800/240', alt: 'Cover photo' } },
                    {
                      type: 'Row',
                      props: { gap: 3, align: 'start' },
                      children: [
                        { type: 'Avatar', props: { src: 'https://i.pravatar.cc/150?img=47', alt: 'Sarah Chen', size: 'xl' } },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 1 },
                          children: [
                            { type: 'Title', props: { variant: 'h1' }, children: 'Sarah Chen' },
                            { type: 'Text', props: { variant: 'lg' }, children: 'Principal Software Engineer at Google Cloud' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'San Francisco Bay Area · 500+ connections' },
                            {
                              type: 'Row',
                              props: { gap: 2 },
                              children: [
                                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Open to' },
                                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Add Section' },
                                { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Enhance Profile' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'profile-about',
      name: 'About',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h2' }, children: 'About' },
                    { type: 'Text', props: { variant: 'default' }, children: 'Principal engineer with 12 years building distributed systems at scale. I lead the team responsible for Google Cloud Spanner\'s query optimization engine. Passionate about open source, mentoring, and making complex systems understandable. Previously at Stripe and Airbnb.' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'profile-experience',
      name: 'Experience',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 3 },
                  children: [
                    { type: 'Title', props: { variant: 'h2' }, children: 'Experience' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 2 },
                      dataSource: 'linkedin.profile.experience',
                      itemTemplate: {
                        type: 'Row',
                        props: { gap: 2, align: 'start' },
                        children: [
                          { type: 'Image', props: { src: '{item.logo}', alt: '{item.company}' } },
                          {
                            type: 'Stack',
                            props: { direction: 'column', gap: 0 },
                            children: [
                              { type: 'Title', props: { variant: 'h4' }, children: '{item.role}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.company} · {item.type}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.period}' },
                              { type: 'Text', props: { variant: 'sm' }, children: '{item.description}' },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'profile-skills',
      name: 'Skills',
      body: [
        {
          type: 'Card',
          props: { hoverable: false },
          children: [
            {
              type: 'CardBody',
              children: [
                {
                  type: 'Stack',
                  props: { direction: 'column', gap: 2 },
                  children: [
                    { type: 'Title', props: { variant: 'h2' }, children: 'Skills' },
                    {
                      type: 'Row',
                      props: { gap: 2, wrap: true },
                      dataSource: 'linkedin.skills',
                      itemTemplate: {
                        type: 'Badge',
                        props: { variant: 'secondary' },
                        children: '{item.name}',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default LINKEDIN_PROFILE_PAGE;
