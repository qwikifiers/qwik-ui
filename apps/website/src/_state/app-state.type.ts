export interface AppState {
  mode: 'light' | 'dark';
  featureFlags?: {
    showTailwind?: boolean;
  };
}
