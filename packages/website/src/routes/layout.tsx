import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import Header from '../components/header/header';
import { APP_STATE } from '../constants';
import { AppState } from '../types';

export default component$(() => {
  const state = useStore<AppState>({ darkMode: false });
  useContextProvider(APP_STATE, state);
  return (
    <>
      <main>
        <Header />
        <div class="relative px-4 pt-16 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <footer></footer>
    </>
  );
});
