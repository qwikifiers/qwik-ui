import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { isDev } from '@builder.io/qwik/build';
import { recmaProvideComponents } from './recma-provide-components';

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import('rehype-pretty-code');
  const { visit } = await import('unist-util-visit');
  let output: any = {};
  if (!isDev) {
    // Client-specific configuration
    output = {
      // Customize the client build structure
      entryFileNames: ({ name }: any) => {
        if (name.startsWith('entry')) {
          return '[name].js';
        }
        return `build/[name]-[hash].js`;
      },
      chunkFileNames: () => {
        return `build/[name]-[hash].js`;
      },
      assetFileNames: `build/[name]-[hash].[ext]`,
    };
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
                theme: 'poimandres',
              },
            ],
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === 'element' && node?.tagName === 'figure') {
                  if (!('data-rehype-pretty-code-figure' in node.properties)) {
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
    build: {
      target: 'es2022',
      rollupOptions: {
        output,
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
