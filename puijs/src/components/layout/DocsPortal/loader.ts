import type { DocGuide } from './types';

/**
 * Cleanly formats a raw file path or slug into a human readable category.
 */
function inferCategory(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/');
  const filename = normalized.split('/').pop() || '';

  if (filename.startsWith('62_') || filename.startsWith('63_') || filename.toLowerCase().includes('quickstart') || filename.toLowerCase().includes('readme')) {
    return 'Getting Started';
  }
  if (filename.startsWith('01_') || filename.startsWith('02_') || filename.startsWith('03_') || filename.startsWith('04_') || filename.startsWith('05_') || filename.startsWith('06_') || filename.startsWith('07_') || filename.startsWith('08_') || filename.startsWith('09_') || filename.startsWith('11_') || filename.startsWith('12_')) {
    return 'Architecture & Physics';
  }
  if (filename.startsWith('46_') || filename.startsWith('47_') || filename.startsWith('48_') || filename.startsWith('49_') || filename.startsWith('50_') || filename.startsWith('51_') || filename.startsWith('52_') || filename.startsWith('53_') || filename.startsWith('54_') || filename.startsWith('55_') || filename.startsWith('56_') || filename.startsWith('57_') || filename.startsWith('58_') || filename.startsWith('59_') || filename.startsWith('60_') || filename.startsWith('61_') || filename.startsWith('33_') || filename.startsWith('45_')) {
    return 'Comparative Architecture (vs Transformers)';
  }
  if (filename.includes('API') || filename.includes('file_map') || filename.includes('repl')) {
    return 'API & Developer Specs';
  }
  if (filename.includes('PAPER') || normalized.includes('papers/')) {
    return 'Theoretical Whitepapers';
  }
  if (filename.includes('MASTER') || filename.includes('DYNAMIC') || filename.startsWith('42_') || filename.startsWith('43_') || filename.startsWith('44_')) {
    return 'Deep Manifold Research';
  }
  return 'Core Principles';
}

/**
 * Automatically parses a raw Markdown document into a structured DocGuide.
 */
export function parseMarkdownDoc(rawMarkdown: string, filePathOrId: string): DocGuide {
  const normalized = filePathOrId.replace(/\\/g, '/');
  const filename = (normalized.split('/').pop() || filePathOrId).replace(/\.md$/i, '');
  const id = filename.toLowerCase().replace(/[^a-z0-9_-]/g, '-');

  const lines = rawMarkdown.split('\n');
  let title = '';
  let summary = '';
  const citations: string[] = [];
  const bodyLines: string[] = [];
  let inCitations = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Extract title from first # Header
    if (!title && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^#\s+/, '').trim();
      continue;
    }

    // Extract citations
    if (trimmed.toLowerCase().startsWith('## references') || trimmed.toLowerCase().startsWith('### references') || trimmed.toLowerCase().startsWith('## literature')) {
      inCitations = true;
      continue;
    }

    if (inCitations) {
      if (trimmed.startsWith('#')) {
        inCitations = false;
        bodyLines.push(line);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
        citations.push(trimmed.replace(/^[-*]|\d+\.\s*/, '').trim());
      }
      continue;
    }

    // Extract summary from first non-empty paragraph after title
    if (title && !summary && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && !trimmed.startsWith('>')) {
      summary = trimmed;
    }

    bodyLines.push(line);
  }

  // Fallbacks if title or summary were not explicit
  if (!title) {
    title = filename
      .replace(/^\d+[-_]/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  if (!summary) {
    summary = `Comprehensive Phiano architectural specification and continuous phase dynamical proof for ${title}.`;
  }

  const category = inferCategory(filePathOrId);
  const badge = category.split(' ')[0];

  return {
    id,
    category,
    title,
    badge,
    summary,
    citations,
    content: bodyLines.join('\n').trim(),
  };
}

/**
 * Automates the creation of a full DocGuide catalog from a map of raw Markdown files.
 * Works natively with Vite's `import.meta.glob(..., { query: '?raw', eager: true, import: 'default' })`.
 */
export function createDocsCatalog(rawDocsMap: Record<string, string>): DocGuide[] {
  const guides: DocGuide[] = [];

  for (const [filePath, rawContent] of Object.entries(rawDocsMap)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      guides.push(parseMarkdownDoc(rawContent, filePath));
    }
  }

  // Sort: Getting Started first, then Architecture, Comparative, Whitepapers, etc.
  const categoryOrder: Record<string, number> = {
    'Getting Started': 1,
    'Architecture & Physics': 2,
    'Deep Manifold Research': 3,
    'Comparative Architecture (vs Transformers)': 4,
    'API & Developer Specs': 5,
    'Theoretical Whitepapers': 6,
    'Core Principles': 7,
  };

  return guides.sort((a, b) => {
    const orderA = categoryOrder[a.category] || 99;
    const orderB = categoryOrder[b.category] || 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });
}
