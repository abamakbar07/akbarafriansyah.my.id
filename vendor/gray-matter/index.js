const NEWLINE = /\r?\n/;

function coerceValue(value) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (!Number.isNaN(Number(trimmed)) && trimmed !== '') {
    return Number(trimmed);
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
      .filter((entry) => entry.length > 0);
  }
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function matter(input) {
  if (typeof input !== 'string') {
    throw new TypeError('gray-matter expects a string');
  }

  if (!input.startsWith('---')) {
    return { data: {}, content: input, excerpt: '' };
  }

  const lines = input.split(NEWLINE);
  if (lines.length === 0 || lines[0].trim() !== '---') {
    return { data: {}, content: input, excerpt: '' };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }

  if (end === -1) {
    return { data: {}, content: input, excerpt: '' };
  }

  const frontmatterLines = lines.slice(1, end);
  const data = {};
  let currentKey = null;

  frontmatterLines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;
    if (line.startsWith('#')) return;

    if (line.startsWith('-') && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      const entry = line.replace(/^-[\s]*/, '');
      if (entry) {
        data[currentKey].push(entry.replace(/^['"]|['"]$/g, ''));
      }
      return;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1);
    currentKey = key;

    if (!rawValue.trim()) {
      data[key] = '';
      return;
    }

    data[key] = coerceValue(rawValue);
  });

  const content = lines.slice(end + 1).join('\n');
  return { data, content, excerpt: '' };
}

matter.stringify = function stringify(data, content = '') {
  const keys = Object.keys(data || {});
  if (keys.length === 0) return content;

  const header = keys
    .map((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        return `${key}: [${value.map((entry) => JSON.stringify(entry)).join(', ')}]`;
      }
      if (typeof value === 'string') {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');

  return `---\n${header}\n---\n${content}`;
};

module.exports = matter;
module.exports.default = matter;
