import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import ImgQwikUiHeadlessHero from '../../../../../../public/images/qwik-ui-headless-hero.webp?jsx';

export default component$(() => {
  return (
    <>
      <h1 class="mx-auto w-fit text-6xl font-bold">Headless Kit</h1>
      <p class="mx-auto mb-6 w-fit text-3xl font-medium">
        Accessible, Unstyled Qwik UI Components
      </p>

      <p class="mb-10 mt-8 leading-relaxed">
        Welcome to the Headless Kit, a collection of accessible, unstyled components by
        Qwik UI. The Headless Kit is perfect for developers who want to build their web
        applications with custom styles while maintaining a strong focus on accessibility.
      </p>

      <h3 class="mb-4 text-2xl font-semibold">Why Choose the Headless Kit?</h3>
      <p class="mb-6 text-lg">
        The Headless Kit allows you to apply your own CSS, making it easy to achieve the
        look and feel you desire for your Qwik web applications. And you're getting all of
        the logic and behavior out of the box!
      </p>

      <h3 class="mb-4 text-2xl font-semibold">Accessibility at its Core</h3>
      <p class="mb-6 text-lg">
        Accessibility is at the heart of the Headless Kit. Each component in the library
        has been meticulously crafted to meet the highest accessibility standards,
        ensuring that your web applications are inclusive and cater to users of all
        abilities. By choosing the Headless Kit, you're taking an important step towards
        creating a more accessible web.
      </p>

      <h3 class="mb-4 text-2xl font-semibold">Seamless Integration with Qwik</h3>
      <p class="mb-6 text-lg">
        The Headless Kit is designed to work hand-in-hand with the Qwik framework. This
        means that, as a developer, you can enjoy the performance benefits and SEO
        advantages of Qwik while having complete control over the appearance of your web
        application. It's the best of both worlds!
      </p>
      <section>
        <ImgQwikUiHeadlessHero />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Headless Kit - Introduction',
};
