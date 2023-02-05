import { component$, Slot, useContext } from '@builder.io/qwik';
import { MaterialProvider } from '../../components/material';
import { Menu } from '../../components/menu/menu';
import { APP_STATE } from '../../constants';

export default component$(() => {
  const appState = useContext(APP_STATE);
  return (
    <>
      <section class="layout block lg:grid">
        <div class="sidebar hidden lg:block">
          <Menu />
        </div>
        {appState.theme !== 'NOT_DEFINED' && (
          <div class="px-8 py-4">
            <div class="text-xl">{appState.theme}</div>
            {appState.theme === 'MATERIAL' ? (
              <MaterialProvider>
                <Slot />
              </MaterialProvider>
            ) : (
              <Slot />
            )}
          </div>
        )}
      </section>
    </>
  );
});
