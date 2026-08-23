import type { PageData } from '../../../types';
import { INSTAGRAM_THEME } from '../theme';

export const INSTAGRAM_WELCOME_PAGE: PageData = {
  id: 'instagram-welcome',
  name: 'Instagram Welcome',
  description: 'Landing page with a hero, sign up prompt, and a featured posts grid.',
  layoutType: 'instagram',
  themeVars: INSTAGRAM_THEME,
  sections: [
    {
      id: 'welcome-hero',
      name: 'Hero',
      body: [
        {
          type: 'Row',
          props: { gap: 4 },
          children: [
            {
              type: 'Stack',
              props: { direction: 'column', gap: 3 },
              children: [
                { type: 'Title', props: { variant: 'h1' }, children: 'Instagram' },
                { type: 'Title', props: { variant: 'h3' }, children: 'Sign up to see photos and videos from your friends.' },
                {
                  type: 'Stack',
                  props: { direction: 'row', gap: 2, align: 'center' },
                  children: [
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Continue with Google' },
                    { type: 'Button', props: { variant: 'secondary', size: 'md' }, children: 'Continue with Apple' },
                  ],
                },
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
                        { type: 'Input', props: { placeholder: 'Mobile number or email', type: 'text' } },
                        { type: 'Input', props: { placeholder: 'Full name', type: 'text' } },
                        { type: 'Input', props: { placeholder: 'Username', type: 'text' } },
                        { type: 'Input', props: { placeholder: 'Password', type: 'password' } },
                        { type: 'Button', props: { variant: 'primary', size: 'md' }, children: 'Sign up' },
                        { type: 'Text', props: { variant: 'sm' }, children: 'By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.' },
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
      id: 'welcome-signin',
      name: 'Sign In Prompt',
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
                  type: 'CardBody',
                  children: [
                    {
                      type: 'Row',
                      props: { justify: 'center', align: 'center', gap: 2 },
                      children: [
                        { type: 'Text', props: { variant: 'default' }, children: 'Have an account?' },
                        { type: 'Button', props: { variant: 'ghost', size: 'md' }, children: 'Log in' },
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
      id: 'welcome-featured',
      name: 'Featured Posts Grid',
      body: [
        {
          type: 'Grid',
          props: { columns: 3, gap: 2 },
          dataSource: 'instagram.suggested',
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
                      { type: 'Avatar', props: { src: '{item.avatar}', alt: '{item.name}', size: 'sm' } },
                      { type: 'Text', props: { variant: 'sm' }, children: '{item.handle}' },
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

export default INSTAGRAM_WELCOME_PAGE;
