// noinspection JSUnusedGlobalSymbols

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    disabled: true,
    matchers: {
      color: /color|background/i,
      date: /date/i,
    },
  },
  layout: 'centered',
};
