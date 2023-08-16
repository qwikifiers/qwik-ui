import { component$, Slot, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { OLD_APP_STATE_CONTEXT_ID } from '../constants';
import Header from './_components/header/header';

import { useRootStore } from '../_state/use-root-store';
import { Footer } from './_components/footer/footer';
import { DocsNavigation } from './docs/_components/navigation-docs/navigation-docs';

export default component$(() => {
  // useStyles$(globalStyles);

  const state = useContext(OLD_APP_STATE_CONTEXT_ID);
  const rootStore = useRootStore();
  useVisibleTask$(() => {
    state.darkMode = localStorage.getItem('theme') === 'dark';
  });

  return (
    <>
      <Header />
      {rootStore.isSidebarOpened && <DocsNavigation />}
      <main class="mx-auto pt-28 lg:pt-32 max-w-7xl px-4 md:px-8 mb-24">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
