import { Signal } from '@builder.io/qwik';

interface ValueObject {
  [themeName: string]: string;
}

export type SystemTheme = 'dark' | 'light';

export type Theme = 'dark' | 'light' | string | string[] | undefined;

export interface UseThemeProps {
  // system or light
  defaultTheme: string;
  /** theme signal */
  themeSig: Signal<Theme>;
  /** Forced theme name for the current page */
  resolvedThemeSig: Signal<Theme>;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  forcedTheme: string | undefined;
  // localStorage key
  storageKey: string;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  systemTheme: SystemTheme | undefined;
  /** List of all available theme names */
  themes: string[] | string[][];
}

export interface ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[] | string[][] | undefined;
  /** Forced theme name for the current page */
  forcedTheme?: string | undefined;
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean | undefined;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean | undefined;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean | undefined;
  /** Key used to store theme setting in localStorage */
  storageKey?: string | undefined;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string | undefined;
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: 'class' | string | undefined;
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject | undefined;
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string | undefined;
}
