import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { recmaProvideComponents } from './recma-provide-components';
import autoAPI from './auto-api';
import { ShikiTransformer } from 'shiki';

export default defineConfig(async () => {
  const { default: shikiRehype } = await import('@shikijs/rehype');

  return {
    plugins: [
      autoAPI(),
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
            [
              shikiRehype,
              {
                theme: 'poimandres',
                transformers: [transformerSourceAsPreProp()],
              },
            ],
          ],
        },
      }),
      qwikVite({
        lint: false,
        debug: true,
        tsconfigFileNames: ['tsconfig.app.json'],
        client: {
          outDir: '../../dist/apps/website/client',
        },
        ssr: {
          outDir: '../../dist/apps/website/server',
        },
      }),
      tsconfigPaths({ root: '../../' }),
      // Uncomment for debugging preview with http2 via https
      // basicSsl(),
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
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules') && id.includes('css-tree')) {
              return 'css-tree';
            }
            if (
              id.includes('node_modules') &&
              (id.includes('tailwind-merge') || id.includes('clsx'))
            ) {
              return 'cn';
            }
          },
        },
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});

function transformerSourceAsPreProp(): ShikiTransformer {
  return {
    pre(node) {
      node.properties.rawCodeString = this.source;
    },
  };
}
