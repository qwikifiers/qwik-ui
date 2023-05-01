import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Header from '../components/header/header';
import { OLD_APP_STATE_CONTEXT_ID } from '../constants';
import { OldAppState } from '../types';
import { Footer } from '../components/footer/footer';
import globalStyles from './global.css?inline';

export default component$(() => {
  useStyles$(globalStyles);

  const state = useStore<OldAppState>({
    darkMode: false,
    theme: 'NOT_DEFINED',
  });
  const loc = useLocation();
  useContextProvider(OLD_APP_STATE_CONTEXT_ID, state);

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
