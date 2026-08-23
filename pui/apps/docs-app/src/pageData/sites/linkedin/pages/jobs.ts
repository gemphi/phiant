import type { PageData } from '../../../types';
import { LINKEDIN_THEME } from '../theme';

export const LINKEDIN_JOBS_PAGE: PageData = {
  id: 'linkedin-jobs',
  name: 'LinkedIn Jobs',
  description: 'Job listings with filters and a featured job detail.',
  layoutType: 'linkedin',
  themeVars: LINKEDIN_THEME,
  sections: [
    {
      id: 'jobs-header',
      name: 'Jobs Header',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            { type: 'Title', props: { variant: 'h1' }, children: 'Jobs' },
            {
              type: 'Row',
              props: { gap: 2, wrap: true },
              children: [
                { type: 'Input', props: { placeholder: 'Search jobs', defaultValue: 'Senior Software Engineer' } },
                { type: 'Input', props: { placeholder: 'Location', defaultValue: 'San Francisco Bay Area' } },
                { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Search' },
              ],
            },
            {
              type: 'Row',
              props: { gap: 2, wrap: true },
              children: [
                { type: 'Badge', props: { variant: 'primary' }, children: 'Remote' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Full-time' },
                { type: 'Badge', props: { variant: 'secondary' }, children: '$200K+' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Senior+ level' },
                { type: 'Badge', props: { variant: 'secondary' }, children: 'Posted 1 week' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'jobs-listing',
      name: 'Job Listings',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          dataSource: 'linkedin.jobs',
          itemTemplate: {
            type: 'Card',
            props: { hoverable: true },
            children: [
              {
                type: 'CardBody',
                children: [
                  {
                    type: 'Row',
                    props: { gap: 2, align: 'start' },
                    children: [
                      { type: 'Image', props: { src: '{item.logo}', alt: '{item.company}' } },
                      {
                        type: 'Stack',
                        props: { direction: 'column', gap: 1 },
                        children: [
                          { type: 'Title', props: { variant: 'h4' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.company} · {item.location}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.salary} · {item.type} · {item.applicants} applicants' },
                          { type: 'Text', props: { variant: 'sm' }, children: 'Posted {item.posted}' },
                          { type: 'Badge', props: { variant: 'primary' }, children: 'Easy Apply' },
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
    {
      id: 'jobs-detail',
      name: 'Featured Job Detail',
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
                    {
                      type: 'Row',
                      props: { gap: 2, align: 'center' },
                      children: [
                        { type: 'Image', props: { src: 'https://picsum.photos/seed/stripejob/80/80', alt: 'Stripe' } },
                        {
                          type: 'Stack',
                          props: { direction: 'column', gap: 0 },
                          children: [
                            { type: 'Title', props: { variant: 'h2' }, children: 'Staff Software Engineer, Payments Platform' },
                            { type: 'Text', props: { variant: 'sm' }, children: 'Stripe · San Francisco, CA · Remote' },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'Row',
                      props: { gap: 2 },
                      children: [
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Easy Apply' },
                        { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Save' },
                      ],
                    },
                    { type: 'Title', props: { variant: 'h3' }, children: 'About the Role' },
                    { type: 'Text', props: { variant: 'default' }, children: 'We are looking for a Staff Software Engineer to lead the next generation of our payments orchestration platform. You will own the architecture for routing, retrying, and reconciling billions of dollars in transactions across 47 payment processors.' },
                    { type: 'Title', props: { variant: 'h3' }, children: 'What You Will Do' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      dataSource: 'linkedin.job.responsibilities',
                      itemTemplate: {
                        type: 'Text',
                        props: { variant: 'default' },
                        children: '• {item}',
                      },
                    },
                    { type: 'Title', props: { variant: 'h3' }, children: 'Requirements' },
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 1 },
                      dataSource: 'linkedin.job.requirements',
                      itemTemplate: {
                        type: 'Text',
                        props: { variant: 'default' },
                        children: '• {item}',
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

export default LINKEDIN_JOBS_PAGE;
