import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { APP_STATE } from '../../constants';
import { CloseIcon } from '../icons/CloseIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

export default component$(() => {
  const appState = useContext(APP_STATE);
  const menuOpenSignal = useSignal(false);

  const toggleMenu = $(() => {
    menuOpenSignal.value = !menuOpenSignal.value;
  });

  const toggleDarkMode = $(() => {
    appState.darkMode = !appState.darkMode;
    document.documentElement.classList.toggle('dark');
  });

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
          <img src="/qwik-ui.png" class="w-24" />
        </div>
        <div class="flex w-full justify-end">
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick$={toggleDarkMode}
          >
            {appState.darkMode ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
});
