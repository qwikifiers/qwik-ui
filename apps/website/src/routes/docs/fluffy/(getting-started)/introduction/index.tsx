import ImgQwikUiFluffyCreatureScreen from './../../../../../../public/images/qwik-ui-fluffy-creature-screen.webp?jsx';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1 class="mx-auto w-fit text-6xl font-bold">Fluffy (styled) Kit</h1>
      <p class="mx-auto mb-6 w-fit text-3xl font-medium">
        Beautifully Styled Qwik UI Components
      </p>

      <p class="mb-10 mt-8 text-lg leading-relaxed">
        Welcome to the Fluffy Kit, a collection of ready-to-use, beautifully styled
        components powered by{' '}
        <a
          target="_blank"
          href="https://tailwindcss.com"
          class="border-none text-blue-400"
        >
          Tailwind
        </a>{' '}
        and inspired by{' '}
        <a
          target="_blank"
          href="https://ui.shadcn.com/"
          class="border-none text-blue-400"
        >
          Shadcn UI
        </a>{' '}
        designed to work seamlessly with Qwik. The Fluffy Kit is perfect for developers
        who want to build their web applications with a consistent, modern design while
        maintaining a strong focus on accessibility.
      </p>

      <h3 class="mb-4 text-2xl font-semibold">Why Choose the Fluffy Kit?</h3>
      <p class="mb-6 text-lg">
        The Fluffy Kit offers a powerful solution for developers looking to create
        visually appealing, consistent designs without the need to write custom CSS. By
        utilizing the popular Tailwind CSS framework, the Fluffy Kit provides a set of
        pre-styled components that you can easily integrate into your Qwik web
        applications, saving you time and effort.
      </p>

      <h3 class="mb-4 text-2xl font-semibold">Seamless Integration with Qwik</h3>
      <p class="mb-6 text-lg">
        The Headless Kit is designed to work hand-in-hand with the Qwik framework. This
        means that, as a developer, you can enjoy the performance benefits and SEO
        advantages of Qwik while having a beautiful, consistent design out of the box.
        It's the perfect combination: the cutting-edge technology of Qwik, paired with the
        modern design aesthetics of Tailwind CSS.
      </p>
      <section>
        <ImgQwikUiFluffyCreatureScreen />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik UI | Fluffy (styled) Kit - Introduction',
};
