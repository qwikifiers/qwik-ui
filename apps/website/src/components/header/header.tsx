import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { version } from '../../../../../package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Menu } from '../menu/menu';
import { SelectTheme } from '../selectTheme/selectTheme';
import { APP_STATE_CONTEXT_ID } from '../../_state/app-state-context-id';
import { useCSSTheme } from '../../_state/use-css-theme';

export default component$(() => {
  const location = useLocation();
  const appState = useContext(APP_STATE_CONTEXT_ID);
  const menuOpenSignal = useSignal(false);

  const toggleMenu$ = $(() => {
    menuOpenSignal.value = !menuOpenSignal.value;
  });

  const toggleDarkMode = $(() => {
    appState.mode = appState.mode === 'light' ? 'dark' : 'light';
  });

  const isDocsRoute = location.url.pathname.indexOf('/docs/') !== -1;

  return (
    <header class="fixed w-full z-10 border-b border-slate-600">
      <div class="flex p-4">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick$={toggleMenu$}
          class="block lg:hidden"
        >
          {menuOpenSignal.value ? <CloseIcon /> : <MenuIcon />}
        </button>
        {menuOpenSignal.value && (
          <aside class="fixed top-0 left-0">
            <div class="fixed h-screen w-screen bg-gray-900/20 backdrop-blur-sm"></div>
            <div class="fixed h-screen w-80 overflow-y-scroll bg-white">
              <Menu onClose$={toggleMenu$} />
            </div>
          </aside>
        )}
        <div class="pl-6">
          <a href="/">
            <img src="/qwik-ui.png" class="w-32" />
          </a>
        </div>
        <div class="flex gap-2 w-full justify-end">
          <div data-tip="Qwik-UI Version" class="pt-2.5 px-2">
            v.{version}
          </div>
          {isDocsRoute && <SelectTheme />}
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick$={toggleDarkMode}
          >
            {appState.mode === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div class="px-2 pt-2">
            <a
              target="_blank"
              href="https://github.com/qwikifiers/qwik-ui"
              aria-label="Qwik-UI GitHub repository"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
});
