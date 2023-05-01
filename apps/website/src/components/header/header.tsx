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
    <header class="fixed w-full h-20 z-10 flex gap-8 p-4 items-center">
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
      <a href="/" class="lg:ml-8">
        <img src="/qwik-ui.png" class="h-12 w-auto object-contain" />
      </a>
      <div data-tip="Qwik-UI Version" class="mr-auto">
        v.{version}
      </div>
      <nav class="hidden sm:flex gap-4">
        <a href="/about">About</a>
        <a href="/docs">Docs</a>
        {/* <a href="/contact">Contact</a> */}
      </nav>
      {isDocsRoute && <SelectTheme />}
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick$={toggleDarkMode}
      >
        {appState.mode === 'dark' ? <MoonIcon /> : <SunIcon />}
      </button>
      <a
        target="_blank"
        href="https://github.com/qwikifiers/qwik-ui"
        aria-label="Qwik-UI GitHub repository"
        class="sm:mr-8"
      >
        <GitHubIcon />
      </a>
    </header>
  );
});
