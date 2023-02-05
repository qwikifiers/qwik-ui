import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { version } from '../../../../../package.json';
import { APP_STATE } from '../../constants';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { SelectTheme } from '../selectTheme/selectTheme';

export default component$(() => {
  const location = useLocation();
  const appState = useContext(APP_STATE);
  const menuOpenSignal = useSignal(false);

  const toggleMenu = $(() => {
    menuOpenSignal.value = !menuOpenSignal.value;
  });

  const toggleDarkMode = $(() => {
    appState.darkMode = !appState.darkMode;
    document.documentElement.classList.toggle('dark');
  });

  const isDocsRoute = location.pathname.indexOf('/docs/') !== -1;

  return (
    <header class="fixed w-full z-10 border-b border-slate-600 dark:border-white">
      <div class="flex p-4">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick$={toggleMenu}
        >
          {menuOpenSignal.value ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div class="pl-6">
          <a href="/">
            <img src="/qwik-ui.png" class="w-32" />
          </a>
        </div>
        <div class="flex w-full justify-end">
          <div
            data-tip="Qwik-UI Version"
            class="pt-2.5 px-2 text-black dark:text-white"
          >
            v.{version}
          </div>
          {isDocsRoute && <SelectTheme />}
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick$={toggleDarkMode}
          >
            {appState.darkMode ? <MoonIcon /> : <SunIcon />}
          </button>
          <div class="px-2 pt-2 text-black dark:text-white">
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
