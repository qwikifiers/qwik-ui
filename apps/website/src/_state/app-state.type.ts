import { NoSerialize } from '@builder.io/qwik';
import type { Highlighter } from 'shiki';

export interface AppState {
  mode: 'light' | 'dark';
  highlighter?: NoSerialize<Highlighter>;
  isSidebarOpened: boolean;
  featureFlags?: {
    showFluffy?: boolean;
  };
}
