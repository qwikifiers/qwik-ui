export interface AppState {
  mode: 'light' | 'dark';
  isSidebarOpened: boolean;
  featureFlags?: {
    showFluffy?: boolean;
    showTailwind?: boolean;
  };
}
