import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
