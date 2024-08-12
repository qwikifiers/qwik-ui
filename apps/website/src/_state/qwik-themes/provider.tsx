import {
  $,
  Fragment,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { disableAnimation, getSystemTheme } from './helper';
import { ThemeScript } from './theme-script';
import type { SystemTheme, Theme, ThemeProviderProps, UseThemeProps } from './types';
import { isServer } from '@builder.io/qwik/build';

const ThemeContext = createContextId<UseThemeProps>('theme-context');

export const useTheme = () => useContext(ThemeContext);

const defaultThemes = ['light', 'dark'];

export const ThemeProvider = component$<ThemeProviderProps>(
  ({
    forcedTheme,
    disableTransitionOnChange = false,
    enableSystem = true,
    enableColorScheme = true,
    storageKey = 'theme',
    themes = defaultThemes,
    defaultTheme = enableSystem ? 'system' : 'light',
    attribute = 'data-theme',
    value,
    nonce,
  }) => {
    const themeSig = useSignal<Theme>('');
    const resolvedThemeSig = useSignal<Theme>(storageKey);

    const attrs = !value ? themes.flat() : Object.values(value);

    const applyTheme = $((theme: Theme) => {
      let resolved = theme;
      if (!resolved) return;

      // If theme is system, resolve it before setting theme
      if (theme === 'system' && enableSystem) {
        resolved = getSystemTheme();
      }

      // Join the array of attr if the theme is an array
      const computedResolved = Array.isArray(resolved)
        ? resolved.join(attribute === 'class' ? ' ' : '-')
        : resolved;

      const name = value ? value[computedResolved] : computedResolved;

      disableTransitionOnChange ? disableAnimation() : null;
      const d = document.documentElement;

      if (attribute === 'class') {
        d.classList.remove(...attrs);

        if (name) d.classList.add(...name.split(' '));
      } else {
        if (name) {
          d.setAttribute(attribute, name);
        } else {
          d.removeAttribute(attribute);
        }
      }
    });

    useVisibleTask$(({ cleanup }) => {
      themeSig.value = localStorage.getItem(storageKey) || defaultTheme;
      const media = window.matchMedia('(prefers-color-scheme: dark)');

      const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
        const resolved = getSystemTheme(e);
        resolvedThemeSig.value = resolved;

        if (themeSig.value === 'system' && enableSystem && !forcedTheme) {
          applyTheme('system');
        }
      };

      media.addEventListener('change', handleMediaQuery);

      handleMediaQuery(media);

      cleanup(() => media.removeEventListener('change', handleMediaQuery));
    });

    // localStorage event handling

    useVisibleTask$(({ cleanup }) => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key !== storageKey) {
          return;
        }

        // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
        const theme = e.newValue || defaultTheme;
        themeSig.value = theme;
      };

      window.addEventListener('storage', handleStorage);
      cleanup(() => window.removeEventListener('storage', handleStorage));
    });

    useTask$(({ track }) => {
      track(() => themeSig.value);
      if (isServer) return;
      localStorage.setItem(
        storageKey,
        Array.isArray(themeSig.value) ? themeSig.value.join(' ') : themeSig.value || '',
      );
    });

    // Whenever theme or forcedTheme changes, apply it
    useTask$(({ track }) => {
      track(() => themeSig.value || forcedTheme);

      if (themeSig.value !== 'system') {
        resolvedThemeSig.value = themeSig.value;
      }

      applyTheme(forcedTheme ?? themeSig.value);
    });

    useContextProvider(ThemeContext, {
      themeSig,
      resolvedThemeSig,
      forcedTheme,
      systemTheme: (enableSystem ? resolvedThemeSig.value : undefined) as
        | SystemTheme
        | undefined,
      themes: enableSystem
        ? Array.isArray(themes[0])
          ? [...(themes as string[][]), ['system']]
          : [...(themes as string[]), 'system']
        : themes,
    });

    return (
      <Fragment>
        <ThemeScript
          {...{
            forcedTheme,
            disableTransitionOnChange,
            enableSystem,
            enableColorScheme,
            storageKey,
            themes,
            defaultTheme,
            attribute,
            value,
            attrs,
            nonce,
          }}
        />
        <Slot />
      </Fragment>
    );
  },
);
