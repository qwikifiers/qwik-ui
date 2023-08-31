import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1 class="text-6xl font-bold mx-auto w-fit">Headless Kit</h1>
      <p class="text-3xl font-medium mb-6 mx-auto w-fit">
        Accessible, Unstyled Qwik UI Components
      </p>

      <p class="mt-8 leading-relaxed mb-10">
        Welcome to the Headless Kit, a collection of accessible, unstyled components by
        Qwik UI. The Headless Kit is perfect for developers who want to build their web
        applications with custom styles while maintaining a strong focus on accessibility.
      </p>

      <h3 class="text-2xl font-semibold mb-4">Why Choose the Headless Kit?</h3>
      <p class="text-lg mb-6">
        The Headless Kit allows you to apply your own CSS, making it easy to achieve the
        look and feel you desire for your Qwik web applications. And you're getting all of
        the logic and behavior out of the box!
      </p>

      <h3 class="text-2xl font-semibold mb-4">Accessibility at its Core</h3>
      <p class="text-lg mb-6">
        Accessibility is at the heart of the Headless Kit. Each component in the library
        has been meticulously crafted to meet the highest accessibility standards,
        ensuring that your web applications are inclusive and cater to users of all
        abilities. By choosing the Headless Kit, you're taking an important step towards
        creating a more accessible web.
      </p>

      <h3 class="text-2xl font-semibold mb-4">Seamless Integration with Qwik</h3>
      <p class="text-lg mb-6">
        The Headless Kit is designed to work hand-in-hand with the Qwik framework. This
        means that, as a developer, you can enjoy the performance benefits and SEO
        advantages of Qwik while having complete control over the appearance of your web
        application. It's the best of both worlds!
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Headless Kit - Introduction',
};
