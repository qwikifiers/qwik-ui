import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { recmaProvideComponents } from './recma-provide-components';

import { getHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter;

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import('rehype-pretty-code');
  const { visit } = await import('unist-util-visit');

  async function getOrCreateHighlighter() {
    if (highlighter) {
      return highlighter;
    }
    highlighter = await getHighlighter({ theme: 'poimandres' });
    return highlighter;
  }
  return {
    plugins: [
      qwikNxVite(),
      qwikCity({
        mdxPlugins: {
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
          rehypeAutolinkHeadings: true,
        },
        mdx: {
          providerImportSource: '~/_state/MDXProvider',
          recmaPlugins: [recmaProvideComponents],
          rehypePlugins: [
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === 'element' && node?.tagName === 'pre') {
                  const [codeEl] = node.children;
                  if (codeEl.tagName !== 'code') {
                    return;
                  }

                  node.__rawString__ = codeEl.children?.[0].value;
                }
              });
            },
            [
              rehypePrettyCode,
              {
                getHighlighter: getOrCreateHighlighter,
                onVisitLine(node: any) {
                  // Prevent lines from collapsing in `display: grid` mode, and allow empty
                  // lines to be copy/pasted
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  // Each line node by default has `class="line"`.
                  if (node.properties.className) {
                    node.properties.className.push('line--highlighted');
                  }
                },
                onVisitHighlightedWord(node: any) {
                  if (node.properties.className) {
                    node.properties.className = ['word--highlighted'];
                  }
                },
              },
            ],
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === 'element' && node?.tagName === 'div') {
                  if (!('data-rehype-pretty-code-fragment' in node.properties)) {
                    return;
                  }

                  const preElement = node.children.at(-1);
                  if (preElement.tagName !== 'pre') {
                    return;
                  }

                  preElement.properties['__rawString__'] = node.__rawString__;
                }
              });
            },
          ],
        },
      }),
      qwikVite({
        tsconfigFileNames: ['tsconfig.app.json'],
        client: {
          outDir: '../../dist/apps/website/client',
        },
        ssr: {
          outDir: '../../dist/apps/website/server',
        },
      }),
      tsconfigPaths({ root: '../../' }),
    ],
    server: {
      fs: {
        // Allow serving files from the project root
        allow: ['../../'],
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'node',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
