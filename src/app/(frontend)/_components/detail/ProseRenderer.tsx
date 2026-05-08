/**
 * Render Lexical serialized state to React.
 * Handles: paragraphs, headings, lists, quotes, links, code, inline formatting.
 * Wrap output in `.prose-coderoach` for design-system styling.
 */
import * as React from 'react';

type LexicalNode = {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  url?: string;
  listType?: 'bullet' | 'number' | 'check';
  start?: number;
  language?: string;
  fields?: any;
  [k: string]: any;
};

type LexicalRoot = { root: LexicalNode };

const FMT_BOLD = 1;
const FMT_ITALIC = 1 << 1;
const FMT_STRIKETHROUGH = 1 << 2;
const FMT_UNDERLINE = 1 << 3;
const FMT_CODE = 1 << 4;

function renderInline(node: LexicalNode, key: string | number): React.ReactNode {
  if (node.type === 'text') {
    let el: React.ReactNode = node.text || '';
    const fmt = typeof node.format === 'number' ? node.format : 0;
    if (fmt & FMT_CODE) el = <code key={key}>{el}</code>;
    if (fmt & FMT_BOLD) el = <strong key={key}>{el}</strong>;
    if (fmt & FMT_ITALIC) el = <em key={key}>{el}</em>;
    if (fmt & FMT_UNDERLINE) el = <u key={key}>{el}</u>;
    if (fmt & FMT_STRIKETHROUGH) el = <s key={key}>{el}</s>;
    return el;
  }
  if (node.type === 'link' || node.type === 'autolink') {
    const url = node.fields?.url || node.url || '#';
    const isExternal = /^https?:\/\//.test(url);
    return (
      <a
        key={key}
        href={url}
        className="text-electric underline underline-offset-2 hover:no-underline"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {(node.children || []).map((c, i) => renderInline(c, `${key}-${i}`))}
      </a>
    );
  }
  if (node.type === 'linebreak') return <br key={key} />;
  return null;
}

function renderBlock(node: LexicalNode, key: string | number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key}>
          {(node.children || []).map((c, i) => renderInline(c, `${key}-${i}`))}
        </p>
      );
    case 'heading': {
      const tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const Tag = tag;
      return (
        <Tag key={key}>
          {(node.children || []).map((c, i) => renderInline(c, `${key}-${i}`))}
        </Tag>
      );
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <Tag key={key} start={node.start}>
          {(node.children || []).map((c, i) => renderBlock(c, `${key}-${i}`))}
        </Tag>
      );
    }
    case 'listitem':
      return (
        <li key={key}>
          {(node.children || []).map((c, i) => {
            if (c.type === 'text' || c.type === 'link' || c.type === 'linebreak') {
              return renderInline(c, `${key}-${i}`);
            }
            return renderBlock(c, `${key}-${i}`);
          })}
        </li>
      );
    case 'quote':
      return (
        <blockquote key={key}>
          {(node.children || []).map((c, i) => renderBlock(c, `${key}-${i}`))}
        </blockquote>
      );
    case 'code':
      return (
        <pre key={key}>
          <code className={node.language ? `language-${node.language}` : ''}>
            {(node.children || [])
              .map((c) => (c.type === 'text' ? c.text || '' : ''))
              .join('')}
          </code>
        </pre>
      );
    case 'horizontalrule':
      return <hr key={key} />;
    default:
      // Inline-ish nodes inside block context
      if ((node as any).text !== undefined || node.type === 'link' || node.type === 'linebreak') {
        return renderInline(node, key);
      }
      return null;
  }
}

export function ProseRenderer({ data }: { data: LexicalRoot | null | undefined }) {
  if (!data?.root?.children) return null;
  return (
    <div className="prose-coderoach">
      {data.root.children.map((node, i) => renderBlock(node, i))}
    </div>
  );
}
