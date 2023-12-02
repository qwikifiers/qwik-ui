import { component$, Slot, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { OLD_APP_STATE_CONTEXT_ID } from '~/constants';
import Header from '~/components/header/header';
import { useAppState } from '~/_state/use-app-state';
import { Footer } from '~/components/footer/footer';
import { DocsNavigation } from '~/components/navigation-docs/navigation-docs';

export default component$(() => {
  // useStyles$(globalStyles);

  const state = useContext(OLD_APP_STATE_CONTEXT_ID);
  const rootStore = useAppState();
  useVisibleTask$(() => {
    state.darkMode = localStorage.getItem('theme') === 'dark';
  });

  return (
    <>
      <Header />
      {rootStore.isSidebarOpened && <DocsNavigation />}
      <main class="mx-auto mb-24 max-w-7xl px-4 pt-28 md:px-8 lg:pt-32">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
