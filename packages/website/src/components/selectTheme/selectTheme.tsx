import {
  $,
  component$,
  useClientEffect$,
  useContext,
  useId,
  useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { APP_STATE } from '../../constants';
import { ThemeIcon } from '../icons/ThemeIcon';

export type Theme = 'HEADLESS' | 'DAISY' | 'MATERIAL';

export const SelectTheme = component$(() => {
  const location = useLocation();
  const appState = useContext(APP_STATE);
  const openThemeSignal = useSignal<boolean>(false);

  useClientEffect$(() => {
    appState.theme =
      location.pathname.indexOf('/headless') !== -1
        ? 'HEADLESS'
        : location.pathname.indexOf('/material') !== -1
        ? 'MATERIAL'
        : 'DAISY';
  });

  const themes: Theme[] = ['HEADLESS', 'DAISY', 'MATERIAL'];
  return (
    <div
      title="Change Theme"
      class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
    >
      <div
        class="flex pt-1 pb-2 ppr-2"
        onClick$={$(() => {
          openThemeSignal.value = !openThemeSignal.value;
        })}
      >
        <ThemeIcon />
        <div class="px-1">Theme</div>
      </div>
      {openThemeSignal.value && (
        <div class="absolute w-40 right-10 z-10 bg-white dark:bg-slate-800 outline-base-content rounded-lg outline">
          {themes.map((theme) => (
            <div
              key={useId()}
              class="flex pl-3"
              onClick$={$(() => {
                openThemeSignal.value = false;
                if (location.pathname !== '/docs/') {
                  window.location.pathname = window.location.pathname.replace(
                    appState.theme,
                    theme
                  );
                }
                appState.theme = theme;
              })}
            >
              <div class="pt-2 pl-2">
                <ThemeIcon />
              </div>
              <div class="py-3 px-4 text-sm font-bold cursor-pointer">
                {theme}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
