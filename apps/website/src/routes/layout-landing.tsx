import { component$, Slot, useSignal } from '@builder.io/qwik';
import Header from '~/components/header/header';
import { Footer } from '~/components/footer/footer';
import { DocSearch } from '~/components/doc-search/doc-search';
export default component$(() => {
  const searchOpen = useSignal(false);
  return (
    <>
      <Header searchOpen={searchOpen} />
      <main>
        <Slot />
      </main>
      <Footer />
      <DocSearch open={searchOpen} />
    </>
  );
});
