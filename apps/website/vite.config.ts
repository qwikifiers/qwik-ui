import { qwikRouter } from '@qwik.dev/router/vite';
import { qwikVite } from '@qwik.dev/core/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { recmaProvideComponents } from './recma-provide-components';
import autoAPI from './auto-api';
import { ShikiTransformer } from 'shiki';
import tailwindcss from '@tailwindcss/vite';
// import { qwikInsights } from '@builder.io/qwik-labs/vite';

export default defineConfig(async () => {
  const { default: shikiRehype } = await import('@shikijs/rehype');
  return {
    root: 'apps/website',
    ssr: {
      noExternal: ['@qwikest/icons','@builder.io/qwik-city'],
    },
    plugins: [
      autoAPI(),
      qwikRouter({
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
      // qwikInsights({ publicApiKey: 'j748wqs70n' }),
      // basicSsl(),
    ],
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      // exclude: ['@builder.io/qwik-city','@qwikest/icons','@modular-forms/qwik'],
    },
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
