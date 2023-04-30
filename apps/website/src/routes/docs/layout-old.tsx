import { component$, Slot, useContext } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { MaterialProvider } from '../../components/material';
import { Menu } from '../../components/menu/menu';
import { OLD_APP_STATE_CONTEXT_ID } from '../../constants';

export default component$(() => {
  const appState = useContext(OLD_APP_STATE_CONTEXT_ID);
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

export const head: DocumentHead = ({ url }) => {
  const UrlPathList = url.pathname.split('/').filter((path) => path !== '');
  if (UrlPathList.length === 3) {
    const Component =
      UrlPathList[2].charAt(0).toUpperCase() + UrlPathList[2].slice(1);
    const ComponentTheme =
      UrlPathList[1].charAt(0).toUpperCase() + UrlPathList[1].slice(1);
    return {
      title: `QwikUI | ${ComponentTheme} | ${Component}`,
    };
  }
  return {
    title: `QwikUI | Docs`,
  };
};
