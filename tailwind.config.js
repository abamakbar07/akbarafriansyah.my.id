/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        accent: {
          lavender: 'var(--color-accent-1)',
          teal: 'var(--color-accent-2)',
          peach: 'var(--color-accent-3)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-plus)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        narrative: '68ch',
      },
      lineHeight: {
        narrative: '1.8',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '68ch',
            color: 'var(--color-foreground)',
            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-accent-1)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-quotes': 'var(--color-muted)',
            '--tw-prose-code': 'var(--color-accent-3)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
