import {
  component$,
  Slot,
  useContext,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Header from '../components/header/header';
import { OLD_APP_STATE_CONTEXT_ID } from '../constants';

import { Footer } from '../components/footer/footer';

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

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
