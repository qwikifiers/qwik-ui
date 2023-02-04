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
    <header class="fixed w-full z-10">
      <div class="flex p-4">
        <div class="absolute inset-x-0 top-full h-px XXtransition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
        <button
          type="button"
          class="hover:bg-zinc-900/5 dark:hover:bg-white/5"
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
            class="hover:bg-zinc-900/5 dark:hover:bg-white/5"
            aria-label="Toggle dark mode"
            onClick$={toggleDarkMode}
          >
            {appState.darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
});
