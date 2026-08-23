import type { PageData } from '../../../types';
import { X_COM_THEME } from '../theme';

export const X_COM_WELCOME_PAGE: PageData = {
  id: 'x-com-welcome',
  name: 'X.com Welcome',
  description: 'Landing page with sign in / create account panel and trending topics.',
  layoutType: 'x-com',
  themeVars: X_COM_THEME,
  sections: [
    {
      id: 'landing-hero',
      name: 'Landing Hero',
      body: [
        {
          type: 'Row',
          props: { gap: 4 },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Happening now' },
                { type: 'Title', props: { variant: 'h3' }, children: 'Join today.' },
              ],
            },
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
                        { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Continue with Google' },
                        { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Continue with Apple' },
                        { type: 'Divider' },
                        { type: 'Input', props: { placeholder: 'Phone, email, or username', type: 'text' } },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Create account' },
                        { type: 'Text', props: { variant: 'sm' }, children: 'Already have an account?' },
                        { type: 'Button', props: { variant: 'ghost', size: 'md' }, children: 'Sign in' },
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
      id: 'landing-trending',
      name: 'Trending Preview',
      body: [
        {
          type: 'Stack',
          props: { direction: 'column', gap: 2 },
          children: [
            {
              type: 'Card',
              props: { hoverable: false },
              children: [
                {
                  type: 'CardHeader',
                  children: [{ type: 'Title', props: { variant: 'h5' }, children: "What's happening" }],
                },
                {
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Stack',
                      props: { direction: 'column', gap: 3 },
                      dataSource: 'x.trends',
                      itemTemplate: {
                        type: 'Stack',
                        props: { direction: 'column', gap: 0 },
                        children: [
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.category}' },
                          { type: 'Title', props: { variant: 'h6' }, children: '{item.title}' },
                          { type: 'Text', props: { variant: 'sm' }, children: '{item.posts}' },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: 'CardFooter',
                  children: [{ type: 'Button', props: { variant: 'ghost', size: 'sm' }, children: 'Show more' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default X_COM_WELCOME_PAGE;
