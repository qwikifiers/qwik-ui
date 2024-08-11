import { isServer } from '@builder.io/qwik/build';
import type { SystemTheme } from './types';

export const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

export const getSystemTheme = (
  mq?: MediaQueryList | MediaQueryListEvent,
): SystemTheme => {
  const currMq = mq || window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = currMq.matches;
  const systemTheme = isDark ? 'dark' : 'light';
  return systemTheme;
};

export const disableAnimation = () => {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};
