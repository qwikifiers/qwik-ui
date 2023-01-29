import {
  $,
  component$,
  QwikChangeEvent,
  Slot,
  useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { MaterialTheme } from '../../components/material-theme/material-theme';
import { Menu } from '../../components/menu/menu';

export type Types = 'HEADLESS' | 'DAISY' | 'MATERIAL';

export default component$(() => {
  const location = useLocation();
  const librarySignal = useSignal<Types>(
    location.pathname.indexOf('/headless') !== -1
      ? 'HEADLESS'
      : location.pathname.indexOf('/material') !== -1
      ? 'MATERIAL'
      : 'DAISY'
  );
  return (
    <>
      <section class="layout">
        <div class="sidebar">
          <select
            onChange$={$((event: QwikChangeEvent<HTMLSelectElement>) => {
              if (window.location.pathname !== '/docs/') {
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
            <option
              value="MATERIAL"
              selected={librarySignal.value === 'MATERIAL'}
            >
              MATERIAL
            </option>
            <option value="DAISY" selected={librarySignal.value === 'DAISY'}>
              DAISY
            </option>
          </select>
          <Menu library={librarySignal.value} />
        </div>
        <div class="content">
          <h1>{librarySignal.value}</h1>
          {librarySignal.value === 'MATERIAL' ? (
            <MaterialTheme>
              <Slot />
            </MaterialTheme>
          ) : (
            <Slot />
          )}
        </div>
      </section>
    </>
  );
});
