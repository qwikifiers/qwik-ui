import {
  $,
  component$,
  QwikChangeEvent,
  Slot,
  useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Header from '../components/header/header';
import { Menu } from '../components/menu/menu';

export type Types = 'HEADLESS' | 'DAISY';

export default component$(() => {
  const location = useLocation();
  const librarySignal = useSignal<Types>(
    location.pathname.indexOf('/headless') !== -1 ? 'HEADLESS' : 'DAISY'
  );
  return (
    <>
      <main>
        <Header />
        <section class="layout">
          <div class="sidebar">
            <select
              onChange$={$((event: QwikChangeEvent<HTMLSelectElement>) => {
                if (window.location.pathname !== '/') {
                  window.location.pathname = window.location.pathname.replace(
                    librarySignal.value.toLowerCase(),
                    event.target.value.toLowerCase()
                  );
                }
                librarySignal.value = event.target.value as Types;
              })}
            >
              <option
                value="HEADLESS"
                selected={librarySignal.value === 'HEADLESS'}
              >
                HEADLESS
              </option>
              <option value="DAISY" selected={librarySignal.value === 'DAISY'}>
                DAISY
              </option>
            </select>
            <Menu library={librarySignal.value} />
          </div>
          <div class="content">
            <h1>{librarySignal.value}</h1>
            <Slot />
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
});
