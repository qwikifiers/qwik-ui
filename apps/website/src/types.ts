import { Theme } from './components/selectTheme/selectTheme';

export type AppState = {
  darkMode: boolean;
  theme: Theme;
};

export type AppPath = { label: string; path: string };
