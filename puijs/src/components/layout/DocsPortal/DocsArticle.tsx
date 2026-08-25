import React, { useState } from 'react';
import { Check, Copy, GraduationCap, Info, Terminal, ChevronRight } from 'lucide-react';
import type { DocGuide } from './types';
import { Table, Thead, Tbody, Tr, Th, Td } from '../../data-display/Table';
import { Badge } from '../../primitives/Badge';

interface DocsArticleProps {
  guide: DocGuide;
  prevGuide?: DocGuide;
  nextGuide?: DocGuide;
  onSelectGuide: (id: string) => void;
}

export const DocsArticle: React.FC<DocsArticleProps> = ({
  guide,
  prevGuide,
  nextGuide,
  onSelectGuide,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(guide.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main style={{
      padding: '2.5rem 3.5rem',
      maxWidth: '980px',
      width: '100%',
      margin: '0 auto',
    }}>
      {/* Breadcrumb / Category */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary, #818cf8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {guide.category}
        </span>
        <span style={{ color: 'var(--text-secondary, #94a3b8)' }}>/</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #94a3b8)' }}>
          {guide.badge}
        </span>
      </nav>

      {/* Article Title & Summary */}
      <header style={{ borderBottom: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <section style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--text-primary, #f8fafc)',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            margin: 0,
          }}>
            {guide.title}
          </h1>

          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md, 8px)',
              background: 'var(--gradient-card, rgba(14, 16, 38, 0.8))',
              border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
              color: 'var(--text-primary, #f8fafc)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
          >
            {copied ? <Check size={15} style={{ color: 'var(--color-success, #34d399)' }} /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy Guide'}</span>
          </button>
        </section>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6, margin: 0 }}>
          {guide.summary}
        </p>
      </header>

      {/* Academic References Callout */}
      {guide.citations && guide.citations.length > 0 && (
        <aside style={{
          background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
          border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
          borderRadius: '14px',
          overflow: 'hidden',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        }}>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-primary, #818cf8)',
            fontWeight: 700,
            fontSize: '0.875rem',
            margin: '0 0 0.4rem 0',
          }}>
            <GraduationCap size={18} /> Foundational Literature & Academic References:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-primary, #f8fafc)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            {guide.citations.map((cit, idx) => (
              <li key={idx}>{cit}</li>
            ))}
          </ul>
        </aside>
      )}

      {/* Rendered Guide Body */}
      <article style={{ lineHeight: '1.8', fontSize: '0.975rem' }}>
        <RichMarkdownContent content={guide.content} />
      </article>

      {/* Bottom Guide Pagination */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
        paddingTop: '2rem',
        marginTop: '3rem',
      }}>
        {prevGuide ? (
          <button
            onClick={() => onSelectGuide(prevGuide.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.25rem',
              background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
              border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
              borderRadius: '12px',
              overflow: 'hidden',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              textAlign: 'left',
              maxWidth: '45%',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #94a3b8)', fontWeight: 600 }}>← PREVIOUS</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-primary, #818cf8)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{prevGuide.title}</span>
          </button>
        ) : <span />}

        {nextGuide ? (
          <button
            onClick={() => onSelectGuide(nextGuide.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem',
              background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
              border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
              borderRadius: '12px',
              overflow: 'hidden',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              textAlign: 'right',
              maxWidth: '45%',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #94a3b8)', fontWeight: 600 }}>NEXT →</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-primary, #818cf8)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{nextGuide.title}</span>
          </button>
        ) : <span />}
      </footer>
    </main>
  );
};

/**
 * Rich Markdown parser supporting tables, callouts, lists, math, code blocks, and headings.
 */
function RichMarkdownContent({ content }: { content: string }) {
  const sections = parseMarkdownBlocks(content);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      {sections.map((sec, idx) => {
        switch (sec.type) {
          case 'code':
            return (
              <figure
                key={idx}
                style={{
                  background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
                  border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                  margin: '0.5rem 0',
                }}
              >
                <figcaption style={{
                  background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, transparent 100%)',
                  borderBottom: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
                  padding: '0.45rem 1rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary, #94a3b8)',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <Terminal size={13} />
                  <span>{sec.lang || 'text'}</span>
                </figcaption>
                <pre style={{
                  padding: '1.1rem',
                  margin: 0,
                  overflowX: 'auto',
                  fontFamily: 'Fira Code, Consolas, Monaco, monospace',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary, #f8fafc)',
                  lineHeight: '1.6',
                }}>
                  <code>{sec.content}</code>
                </pre>
              </figure>
            );

          case 'table':
            return (
              <div
                key={idx}
                style={{
                  overflowX: 'auto',
                  margin: '0.75rem 0',
                  border: '1px solid var(--border-color, rgba(129, 140, 248, 0.25))',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                  textAlign: 'left',
                }}>
                  <thead>
                    <tr style={{
                      background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.18) 0%, transparent 100%)',
                      borderBottom: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
                    }}>
                      {sec.headers.map((h, i) => (
                        <th
                          key={i}
                          style={{
                            padding: '0.75rem 1rem',
                            fontWeight: 700,
                            color: 'var(--text-primary, #f8fafc)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          <InlineFormattedText text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        style={{
                          borderBottom: rIdx < sec.rows.length - 1 ? '1px solid var(--border-color, rgba(129, 140, 248, 0.15))' : 'none',
                          background: rIdx % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                        }}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            style={{
                              padding: '0.75rem 1rem',
                              color: cIdx === 0 ? 'var(--color-primary, #818cf8)' : 'var(--text-primary, #f8fafc)',
                              fontWeight: cIdx === 0 ? 600 : 400,
                              fontFamily: cIdx === 0 && cell.startsWith('`') ? 'monospace' : 'inherit',
                            }}
                          >
                            <InlineFormattedText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'h2':
            return (
              <h2
                key={idx}
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: 'var(--text-primary, #f8fafc)',
                  marginTop: '1.5rem',
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                  borderBottom: '1px solid var(--border-color, rgba(129, 140, 248, 0.15))',
                  paddingBottom: '0.4rem',
                }}
              >
                <InlineFormattedText text={sec.content} />
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={idx}
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #f8fafc)',
                  marginTop: '1.25rem',
                  marginBottom: '0.35rem',
                  letterSpacing: '-0.01em',
                }}
              >
                <InlineFormattedText text={sec.content} />
              </h3>
            );

          case 'h4':
            return (
              <h4
                key={idx}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #f8fafc)',
                  marginTop: '1rem',
                  marginBottom: '0.25rem',
                }}
              >
                <InlineFormattedText text={sec.content} />
              </h4>
            );

          case 'blockquote':
            return (
              <aside
                key={idx}
                style={{
                  borderLeft: '4px solid var(--color-primary, #818cf8)',
                  background: 'linear-gradient(180deg, rgba(14, 16, 38, 0.85) 0%, transparent 100%)',
                  padding: '1rem 1.25rem',
                  borderRadius: '0 12px 12px 0',
                  overflow: 'hidden',
                  color: 'var(--text-primary, #f8fafc)',
                  fontStyle: 'italic',
                  margin: '0.5rem 0',
                }}
              >
                <InlineFormattedText text={sec.content} />
              </aside>
            );

          case 'list':
            return (
              <ul
                key={idx}
                style={{
                  margin: '0.5rem 0',
                  paddingLeft: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                }}
              >
                {sec.items.map((item, iIdx) => (
                  <li key={iIdx} style={{ color: 'var(--text-primary, #f8fafc)' }}>
                    <InlineFormattedText text={item} />
                  </li>
                ))}
              </ul>
            );

          case 'hr':
            return (
              <hr
                key={idx}
                style={{
                  border: 'none',
                  borderTop: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
                  margin: '1.5rem 0',
                }}
              />
            );

          case 'paragraph':
          default:
            return (
              <p
                key={idx}
                style={{
                  margin: 0,
                  color: 'var(--text-primary, #f8fafc)',
                  lineHeight: '1.8',
                }}
              >
                <InlineFormattedText text={sec.content} />
              </p>
            );
        }
      })}
    </div>
  );
}

/**
 * Parses inline formatting: **bold**, *italic*, `code`, and $math$
 */
function InlineFormattedText({ text }: { text: string }) {
  if (!text) return null;

  // Split by inline code, bold, math
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\$[^\$]+\$)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
          return (
            <code
              key={i}
              style={{
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                fontFamily: 'Fira Code, Consolas, Monaco, monospace',
                fontSize: '0.85em',
                color: 'var(--color-primary, #818cf8)',
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
          return (
            <strong key={i} style={{ fontWeight: 700, color: 'var(--text-primary, #f8fafc)' }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
          return (
            <span
              key={i}
              style={{
                fontFamily: 'KaTeX_Math, Cambria Math, Times New Roman, serif',
                fontStyle: 'italic',
                color: 'var(--color-primary, #818cf8)',
                padding: '0 0.2rem',
              }}
            >
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

type MarkdownBlock =
  | { type: 'code'; lang: string; content: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'h2'; content: string }
  | { type: 'h3'; content: string }
  | { type: 'h4'; content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'hr' }
  | { type: 'paragraph'; content: string };

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace('```', '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'code',
        lang,
        content: codeLines.join('\n'),
      });
      continue;
    }

    // 2. Horizontal divider
    if (trimmed === '---' || trimmed === '***') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 3. Headings
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', content: trimmed.replace(/^##\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', content: trimmed.replace(/^###\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      blocks.push({ type: 'h4', content: trimmed.replace(/^####\s+/, '') });
      i++;
      continue;
    }

    // 4. Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join(' ') });
      continue;
    }

    // 5. Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerRow = tableLines[0];
        const headers = headerRow.split('|').slice(1, -1).map(s => s.trim());
        // filter out delimiter row (|---|---|)
        const dataRows = tableLines.slice(1).filter(l => !/^[\|\s\-:]+$/.test(l));
        const rows = dataRows.map(r => r.split('|').slice(1, -1).map(s => s.trim()));
        blocks.push({
          type: 'table',
          headers,
          rows,
        });
        continue;
      }
    }

    // 6. Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* ') || /^\d+\.\s/.test(lines[i].trim()))) {
        listItems.push(lines[i].trim().replace(/^[-*]|\d+\.\s*/, '').trim());
        i++;
      }
      blocks.push({ type: 'list', items: listItems });
      continue;
    }

    // 7. Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      lines[i].trim() !== '---'
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'paragraph', content: paraLines.join(' ') });
  }

  return blocks;
}
