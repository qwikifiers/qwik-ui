import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { recmaProvideComponents } from './recma-provide-components';
import autoAPI from './auto-api';
import { ShikiTransformer } from 'shiki';
import tailwindcss from '@tailwindcss/vite';
import { qwikInsights } from '@builder.io/qwik-labs/vite';

export default defineConfig(async () => {
  const { default: shikiRehype } = await import('@shikijs/rehype');
  return {
    root: 'apps/website',
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
        debug: false,
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
      tailwindcss(),
      qwikInsights({ publicApiKey: 'j748wqs70n' }),
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
