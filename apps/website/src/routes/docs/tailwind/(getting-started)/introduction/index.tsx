import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1 class="text-6xl font-bold mx-auto w-fit">Tailwind Kit</h1>
      <p class="text-3xl font-medium mb-6 mx-auto w-fit">
        Beautifully Styled Qwik UI Components
      </p>

      <p class="mt-8 leading-relaxed mb-10">
        Welcome to the Tailwind Kit, a collection of ready-to-use, beautifully
        styled components designed to work seamlessly with Qwik. The Tailwind
        Kit is perfect for developers who want to build their web applications
        with a consistent, modern design while maintaining a strong focus on
        accessibility.
      </p>

      <h3 class="text-2xl font-semibold mb-4">Why Choose the Tailwind Kit?</h3>
      <p class="text-lg mb-6">
        The Tailwind Kit offers a powerful solution for developers looking to
        create visually appealing, consistent designs without the need to write
        custom CSS. By utilizing the popular Tailwind CSS framework, the
        Tailwind Kit provides a set of pre-styled components that you can easily
        integrate into your Qwik web applications, saving you time and effort.
      </p>

      <h3 class="text-2xl font-semibold mb-4">
        Seamless Integration with Qwik
      </h3>
      <p class="text-lg mb-6">
        The Headless Kit is designed to work hand-in-hand with the Qwik
        framework. This means that, as a developer, you can enjoy the
        performance benefits and SEO advantages of Qwik while having a
        beautiful, consistent design out of the box. It's the perfect
        combination: the cutting-edge technology of Qwik, paired with the modern
        design aesthetics of Tailwind CSS.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Tailwind Kit - Introduction',
};
