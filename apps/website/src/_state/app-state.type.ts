import type { Highlighter } from 'shiki';

export interface AppState {
  mode: 'light' | 'dark';
  highlighter?: Highlighter;
  isSidebarOpened: boolean;
  featureFlags?: {
    showFluffy?: boolean;
  };
}
