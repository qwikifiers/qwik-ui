import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <article class="max-w-prose">
      <h1 class="text-xl">Installation</h1>
      <p class="mb-6 text-lg">
        To get started with the Fluffy (styled) Kit for Qwik UI, run the following command
        to install the Fluffy Kit via npm:
      </p>

      <div class="mt-4">
        <pre class="max-w-prose border border-white bg-black p-8 text-white">
          npm install -D @qwik-ui/fluffy
        </pre>
      </div>

      <p class="mb-6 mt-6 text-lg">
        Which should install DasiyUI as part of its dependencies. Then you can add daisyUI
        to your <code class="bg-black">tailwind.config.js</code> file:
      </p>

      <div class="mt-4">
        <pre class="max-w-prose border border-white bg-black p-8 text-white">
          {`module.exports = {
  //...
    plugins: [require("daisyui")],
  //...
}`}
        </pre>
      </div>

      <p class="mb-6 mt-6 text-lg">
        This will install That's it! The Fluffy Kit is now installed and ready for use in
        your Qwik project.
      </p>

      <p class="mb-6 text-lg">
        Now you can start building your fully designed, accessible Qwik web applications
        using the Qwik UI Fluffy Kit.
      </p>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Fluffy (styled) Kit - Installation',
};
