import { THEME_STORAGE_KEY } from '../../../_state/use-css-theme';

export const CSSThemeScript = () => {
  const themeScript = `
        document.documentElement
            .setAttribute('class',
                localStorage.getItem('${THEME_STORAGE_KEY}') ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            )`;
  return <script dangerouslySetInnerHTML={themeScript} />;
};
