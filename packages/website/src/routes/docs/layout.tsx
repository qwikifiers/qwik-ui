import { component$, Slot, useContext } from '@builder.io/qwik';
import { MaterialProvider } from '../../components/material';
import { Menu } from '../../components/menu/menu';
import { APP_STATE } from '../../constants';

export default component$(() => {
  const appState = useContext(APP_STATE);
  return (
    <>
      <section class="layout">
        <div class="sidebar">
          <Menu library={appState.theme} />
        </div>
        <div class="content">
          <h1>{appState.theme}</h1>
          {appState.theme === 'MATERIAL' ? (
            <MaterialProvider>
              <Slot />
            </MaterialProvider>
          ) : (
            <Slot />
          )}
        </div>
      </section>
    </>
  );
});
