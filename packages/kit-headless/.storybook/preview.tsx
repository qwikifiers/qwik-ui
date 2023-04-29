// import { qwikCityDecorator } from 'storybook-framework-qwik/qwik-city-decorator';
import { Parameters } from 'storybook-framework-qwik';
import type { Preview } from '@storybook/types';
// export const decorators: Decorator[] = [qwikCityDecorator];

// const preview: Preview = {
//   parameters: {
//     backgrounds: {
//       default: 'light'
//     },
//     actions: { argTypesRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/
//       }
//     }
//   }
// }

// export default preview

export const parameters: Parameters = {
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    showRoots: true,
  },
  docs: {
    iframeHeight: '200px',
  },
};
