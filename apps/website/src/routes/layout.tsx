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
      <header class="fixed w-full h-20 z-10 flex gap-8 p-4 items-center backdrop-blur">
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
      <main class="docs sm:ml-80 py-28 px-4 sm:px-28">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
