import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <article class="max-w-prose">
      <h1 class="text-xl">Contributing </h1>
      <p class="text-lg mb-6">
        We welcome and appreciate contributions from the community! Whether
        you're looking to submit bug fixes, improve documentation, or add new
        features, your efforts can make a significant impact on the project. By
        contributing, you'll also be joining our vibrant and supportive
        community of developers.
      </p>

      <p class="text-lg mb-6">
        Our team will review your pull request and, if approved, merge it into
        the main repository.
      </p>

      <section class="flex flex-col">
        <a
          href="https://github.com/qwikifiers/qwik-ui/blob/main/CONTRIBUTING.md"
          target="_blank"
        >
          <h3 class="underline text-2xl font-semibold mb-4 inline-block">
            Read our contributing guidelines
          </h3>
        </a>

        <a href="https://discord.gg/PVWUUejrez" target="_blank">
          <h3 class="underline text-2xl font-semibold mb-4 inline-block">
            Join Our Discord Community
          </h3>
        </a>
      </section>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI - Contributing',
};
