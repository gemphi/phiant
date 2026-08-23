import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageRenderer } from '../PageRenderer';
import type { PageData } from '../types';

const simplePage: PageData = {
  id: 'test',
  name: 'Test',
  layoutType: 'test',
  sections: [
    {
      id: 'sec-1',
      body: [
        { type: 'Title', props: { variant: 'h2' }, children: 'Hello World' },
        { type: 'Text', props: { variant: 'default' }, children: 'This is test content' },
      ],
    },
  ],
};

describe('PageRenderer', () => {
  it('renders page sections and components', () => {
    render(<PageRenderer page={simplePage} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });

  it('calls onSelect with the correct path when a component is clicked', () => {
    const onSelect = vi.fn();
    render(<PageRenderer page={simplePage} onSelect={onSelect} />);

    const title = screen.getByText('Hello World');
    fireEvent.click(title);
    expect(onSelect).toHaveBeenCalledWith('sections.0.body.0');
  });

  it('calls onSelect for nested children', () => {
    const nestedPage: PageData = {
      id: 'nested',
      name: 'Nested',
      layoutType: 'test',
      sections: [
        {
          id: 'sec-0',
          body: [
            {
              type: 'Card',
              props: {},
              children: [
                {
                  type: 'CardBody',
                  children: [{ type: 'Text', props: {}, children: 'Nested text' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const onSelect = vi.fn();
    render(<PageRenderer page={nestedPage} onSelect={onSelect} />);

    const nestedText = screen.getByText('Nested text');
    fireEvent.click(nestedText);
    expect(onSelect).toHaveBeenCalledWith('sections.0.body.0.children.0.children.0');
  });

  it('renders without onSelect without errors', () => {
    render(<PageRenderer page={simplePage} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
