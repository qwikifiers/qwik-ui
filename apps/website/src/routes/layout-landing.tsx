import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      <Header />
      <main class="mx-auto mb-24 max-w-7xl px-2 pt-28 md:px-8 lg:pt-32">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
