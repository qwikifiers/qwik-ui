import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <article class="max-w-prose">
      <h1 class="text-xl">Installation</h1>
      <p class="mb-6 text-lg">
        To get started with the Headless Kit for Qwik UI, run the following command to
        install the Headless Kit via npm:
      </p>

      <div class="mt-4">
        <pre class="max-w-prose border border-white bg-black p-8 text-white">
          npm install -D @qwik-ui/headless
        </pre>
      </div>

      <p class="mb-6 mt-6 text-lg">
        That's it! The Headless Kit is now installed and ready for use in your Qwik
        project.
      </p>

      <p class="mb-6 text-lg">
        Now you can start building your custom-designed, accessible Qwik web applications
        using the Qwik UIHeadless Kit.
      </p>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Headless Kit - Installation',
};
