import {
  component$,
  Slot,
  useContext,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { OLD_APP_STATE_CONTEXT_ID } from '../constants';
import Header from './_components/header/header';

import { Footer } from './_components/footer/footer';

export default component$(() => {
  // useStyles$(globalStyles);

  const state = useContext(OLD_APP_STATE_CONTEXT_ID);

  const loc = useLocation();

  useVisibleTask$(() => {
    state.darkMode = localStorage.getItem('theme') === 'dark';
  });

  useTask$(() => {
    state.theme =
      loc.url.pathname.indexOf('/headless') !== -1
        ? 'HEADLESS'
        : loc.url.pathname.indexOf('/material') !== -1
        ? 'MATERIAL'
        : 'TAILWIND';
  });

  return (
    <>
      <Header />
      <main class="mx-auto pt-28 lg:pt-32 max-w-7xl px-4 md:px-8 mb-24">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
