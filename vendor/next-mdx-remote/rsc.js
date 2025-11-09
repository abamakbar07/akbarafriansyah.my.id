const React = require('react');
const matter = require('gray-matter');

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

function parseAttributes(attributeString = '') {
  const attributes = {};
  const regex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
  let match = regex.exec(attributeString);
  while (match) {
    attributes[match[1]] = match[2];
    match = regex.exec(attributeString);
  }
  return attributes;
}

function extractFootnotes(text) {
  const footnotes = [];
  const replaced = text.replace(/<Footnote([^>]*)>([\s\S]*?)<\/Footnote>/g, (full, attributeString, inner) => {
    const attributes = parseAttributes(attributeString);
    footnotes.push({
      label: attributes.label,
      index: attributes.index ? Number(attributes.index) : undefined,
      content: inner.trim(),
    });
    return `[[FOOTNOTE_${footnotes.length - 1}]]`;
  });

  return { footnotes, replaced };
}

function renderInline(text, footnotes, components, keyPrefix) {
  if (!text) return [];
  const FootnoteComponent = components.Footnote;
  const parts = [];
  let remaining = text;
  let localIndex = 0;

  const patterns = [
    { type: 'link', regex: /\[([^\]]+)\]\(([^)]+)\)/ },
    { type: 'strong', regex: /\*\*(.+?)\*\*/ },
    { type: 'em', regex: /\*(.+?)\*/ },
    { type: 'code', regex: /`([^`]+)`/ },
    { type: 'footnote', regex: /\[\[FOOTNOTE_(\d+)\]\]/ },
  ];

  while (remaining.length > 0) {
    let earliestIndex = -1;
    let matchedPattern = null;
    let matchedGroups = null;

    patterns.forEach((pattern) => {
      const match = pattern.regex.exec(remaining);
      if (!match) return;
      if (earliestIndex === -1 || match.index < earliestIndex) {
        earliestIndex = match.index;
        matchedPattern = pattern;
        matchedGroups = match;
      }
    });

    if (matchedPattern === null || matchedGroups === null) {
      parts.push(remaining);
      break;
    }

    if (earliestIndex > 0) {
      parts.push(remaining.slice(0, earliestIndex));
    }

    const [full, ...groups] = matchedGroups;
    remaining = remaining.slice(earliestIndex + full.length);

    switch (matchedPattern.type) {
      case 'link': {
        const [label, href] = groups;
        parts.push(
          React.createElement(
            'a',
            {
              key: `${keyPrefix}-link-${localIndex}`,
              href,
              className: 'text-[#c8a2c8] underline decoration-dotted decoration-2 underline-offset-4',
            },
            renderInline(label, footnotes, components, `${keyPrefix}-link-${localIndex}`)
          )
        );
        localIndex += 1;
        break;
      }
      case 'strong': {
        parts.push(
          React.createElement(
            'strong',
            { key: `${keyPrefix}-strong-${localIndex}` },
            renderInline(groups[0], footnotes, components, `${keyPrefix}-strong-${localIndex}`)
          )
        );
        localIndex += 1;
        break;
      }
      case 'em': {
        parts.push(
          React.createElement(
            'em',
            { key: `${keyPrefix}-em-${localIndex}` },
            renderInline(groups[0], footnotes, components, `${keyPrefix}-em-${localIndex}`)
          )
        );
        localIndex += 1;
        break;
      }
      case 'code': {
        parts.push(
          React.createElement(
            'code',
            { key: `${keyPrefix}-code-${localIndex}`, className: 'rounded bg-zinc-800 px-1 py-0.5 text-sm text-[#ffd7b5]' },
            groups[0]
          )
        );
        localIndex += 1;
        break;
      }
      case 'footnote': {
        const index = Number(groups[0]);
        const footnote = footnotes[index] || { content: '', label: undefined };
        if (FootnoteComponent) {
          parts.push(
            React.createElement(
              FootnoteComponent,
              {
                key: `${keyPrefix}-footnote-${localIndex}`,
                index: footnote.index ?? index + 1,
                label: footnote.label,
              },
              footnote.content
            )
          );
        } else {
          parts.push(
            React.createElement('sup', { key: `${keyPrefix}-footnote-${localIndex}` }, `${footnote.index ?? index + 1}`)
          );
        }
        localIndex += 1;
        break;
      }
      default:
        parts.push(full);
    }
  }

  return parts;
}

function renderBlocks(text, footnotes, components, keyPrefix = 'md') {
  const lines = text.split(/\r?\n/);
  const nodes = [];
  let paragraph = [];
  let blockquote = [];
  let listState = null;
  let codeBlock = null;
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const content = paragraph.join(' ').trim();
    if (content) {
      nodes.push(
        React.createElement(
          'p',
          { key: `${keyPrefix}-p-${key}` },
          renderInline(content, footnotes, components, `${keyPrefix}-p-${key}`)
        )
      );
      key += 1;
    }
    paragraph = [];
  };

  const flushBlockquote = () => {
    if (!blockquote.length) return;
    const inner = renderBlocks(blockquote.join('\n'), footnotes, components, `${keyPrefix}-bq-${key}`);
    nodes.push(
      React.createElement(
        'blockquote',
        {
          key: `${keyPrefix}-bq-${key}`,
          className: 'border-l-2 border-[#c8a2c8] pl-4 italic text-[#bdbbbb]',
        },
        inner
      )
    );
    blockquote = [];
    key += 1;
  };

  const flushList = () => {
    if (!listState) return;
    const Tag = listState.type === 'ol' ? 'ol' : 'ul';
    const className = listState.type === 'ol' ? 'list-decimal space-y-2 pl-6' : 'list-disc space-y-2 pl-6';
    nodes.push(
      React.createElement(
        Tag,
        { key: `${keyPrefix}-${listState.type}-${key}`, className },
        listState.items.map((item, index) =>
          React.createElement(
            'li',
            { key: `${keyPrefix}-li-${key}-${index}` },
            renderInline(item, footnotes, components, `${keyPrefix}-li-${key}-${index}`)
          )
        )
      )
    );
    listState = null;
    key += 1;
  };

  const flushCode = () => {
    if (!codeBlock) return;
    nodes.push(
      React.createElement(
        'pre',
        { key: `${keyPrefix}-code-${key}`, className: 'overflow-x-auto rounded-lg bg-zinc-900/80 p-4 text-sm text-zinc-100' },
        React.createElement('code', null, codeBlock.lines.join('\n'))
      )
    );
    codeBlock = null;
    key += 1;
  };

  lines.forEach((rawLine) => {
    const line = rawLine.replace(/\t/g, '    ');

    if (codeBlock) {
      if (line.trim().startsWith('```')) {
        flushCode();
      } else {
        codeBlock.lines.push(line);
      }
      return;
    }

    if (line.trim().startsWith('```')) {
      flushParagraph();
      flushBlockquote();
      flushList();
      codeBlock = { lang: line.trim().slice(3).trim(), lines: [] };
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushBlockquote();
      flushList();
      return;
    }

    if (line.trim().startsWith('>')) {
      flushParagraph();
      flushList();
      blockquote.push(line.replace(/^>\s?/, ''));
      return;
    }

    if (blockquote.length) {
      blockquote.push(line);
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushBlockquote();
      flushList();
      const level = Math.min(headingMatch[1].length, 3);
      const textContent = headingMatch[2].trim();
      const id = slugify(textContent);
      nodes.push(
        React.createElement(
          `h${level}`,
          { key: `${keyPrefix}-h-${key}`, id },
          renderInline(textContent, footnotes, components, `${keyPrefix}-h-${key}`)
        )
      );
      key += 1;
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      flushBlockquote();
      if (!listState || listState.type !== 'ul') {
        flushList();
        listState = { type: 'ul', items: [] };
      }
      listState.items.push(unorderedMatch[1]);
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      flushBlockquote();
      if (!listState || listState.type !== 'ol') {
        flushList();
        listState = { type: 'ol', items: [] };
      }
      listState.items.push(orderedMatch[1]);
      return;
    }

    if (line.trim() === '---') {
      flushParagraph();
      flushBlockquote();
      flushList();
      nodes.push(React.createElement('hr', { key: `${keyPrefix}-hr-${key}`, className: 'my-12 border-[#2f2f2f]' }));
      key += 1;
      return;
    }

    paragraph.push(line.trim());
  });

  flushParagraph();
  flushBlockquote();
  flushList();
  flushCode();

  return nodes;
}

async function compileMDX(options) {
  const { source, components = {} } = options;
  const parsed = matter(source);
  const { footnotes, replaced } = extractFootnotes(parsed.content);
  const content = renderBlocks(replaced, footnotes, components);
  return {
    frontmatter: parsed.data,
    content: React.createElement(React.Fragment, null, content),
  };
}

module.exports = {
  compileMDX,
};
