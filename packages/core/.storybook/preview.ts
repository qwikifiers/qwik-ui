import { JSXNode, render } from '@builder.io/qwik';
import { QWIK_LOADER } from '@builder.io/qwik/loader';

import '../src/index.css';

eval(QWIK_LOADER);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

export const decorators = [
  (Story: () => JSXNode) => {
    const parent = document.createElement('div');
    const jsxNode = Story();
    render(parent, jsxNode);
    return parent;
  },
];
