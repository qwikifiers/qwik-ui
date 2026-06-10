import { component$, Slot } from '@qwik.dev/core';
import Header from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
