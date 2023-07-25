export interface AppState {
  mode: 'light' | 'dark';
  isSidebarOpened: boolean;
  featureFlags?: {
    showTailwind?: boolean;
  };
}
