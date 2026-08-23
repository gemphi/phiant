import { describe, it, expect } from 'vitest';
import { ICON_REGISTRY } from '../iconRegistry';

describe('ICON_REGISTRY', () => {
  it('contains expected core icons', () => {
    expect(ICON_REGISTRY.Home).toBeDefined();
    expect(ICON_REGISTRY.Search).toBeDefined();
    expect(ICON_REGISTRY.Bell).toBeDefined();
    expect(ICON_REGISTRY.User).toBeDefined();
    expect(ICON_REGISTRY.Heart).toBeDefined();
    expect(ICON_REGISTRY.MessageCircle).toBeDefined();
    expect(ICON_REGISTRY.Share2).toBeDefined();
  });

  it('contains Play and Layers icons', () => {
    expect(ICON_REGISTRY.Play).toBeDefined();
    expect(ICON_REGISTRY.Layers).toBeDefined();
  });

  it('contains MoreHorizontal icon', () => {
    expect(ICON_REGISTRY.MoreHorizontal).toBeDefined();
  });

  it('contains YouTube-specific icons', () => {
    expect(ICON_REGISTRY.ThumbsUp).toBeDefined();
    expect(ICON_REGISTRY.ThumbsDown).toBeDefined();
    expect(ICON_REGISTRY.Cast).toBeDefined();
  });

  it('all entries are valid React components', () => {
    for (const [name, Comp] of Object.entries(ICON_REGISTRY)) {
      expect(Comp).toBeDefined();
      expect(typeof Comp).toBe('object' as any);
    }
  });
});
