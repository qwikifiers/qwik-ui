import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <article class="max-w-prose">
      <h1 class="text-xl">Installation</h1>
      <p class="text-lg mb-6">
        To get started with the Headless Kit for Qwik UI, run the following command to
        install the Headless Kit via npm:
      </p>

      <div class="mt-4">
        <pre class="bg-black max-w-prose p-8 border-white border text-white">
          npm install -D @qwik-ui/headless
        </pre>
      </div>

      <p class="text-lg mt-6 mb-6">
        That's it! The Headless Kit is now installed and ready for use in your Qwik
        project.
      </p>

      <p class="text-lg mb-6">
        Now you can start building your custom-designed, accessible Qwik web applications
        using the Qwik UIHeadless Kit.
      </p>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Headless Kit - Installation',
};
