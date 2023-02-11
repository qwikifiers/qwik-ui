import {
  component$,
  Slot,
  useClientEffect$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import Header from '../components/header/header';
import { APP_STATE } from '../constants';
import { AppState } from '../types';

export default component$(() => {
  const state = useStore<AppState>({
    darkMode: false,
    theme: 'NOT_DEFINED',
  });
  useContextProvider(APP_STATE, state);

  useClientEffect$(() => {
    state.darkMode = localStorage.getItem('theme') === 'dark';
    state.theme =
      location.pathname.indexOf('/headless') !== -1
        ? 'HEADLESS'
        : location.pathname.indexOf('/material') !== -1
        ? 'MATERIAL'
        : 'DAISY';
  });

  return (
    <>
      <main>
        <Header />
        <div class="relative px-4 pt-24 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <footer></footer>
    </>
  );
});
