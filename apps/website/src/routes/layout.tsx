import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import { DocsNavigation } from '../components/navigation-docs/navigation-docs';
import prismStyles from './prism.css?inline';
import docsStyles from './docs.css?inline';

export default component$(() => {
  useStyles$(prismStyles);
  useStyles$(docsStyles);
  return (
    <>
      <header class="fixed w-full h-20 z-20 border-b-2 border-gray-700 flex gap-8 p-4 items-center">
        <a href="/" class="lg:ml-8">
          <img src="/qwik-ui.png" class="w-32" />
        </a>
        <div data-tip="Qwik-UI Version" class="mr-auto">
          v.0.0.0
        </div>
        <nav class="hidden sm:flex gap-4">
          <a href="/docs">Docs</a>
          <a href="/contact">Contact</a>
        </nav>
        <a
          target="_blank"
          href="https://github.com/qwikifiers/qwik-ui"
          aria-label="Qwik-UI GitHub repository"
          class="sm:mr-8"
        >
          <GitHubIcon />
        </a>
      </header>
      <DocsNavigation />
      <main class="docs">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
