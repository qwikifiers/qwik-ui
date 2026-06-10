import { NoSerialize, noSerialize } from '@qwik.dev/core';

export const useOrdinal: () => NoSerialize<(n: number) => string> = () => {
  return noSerialize((n) => {
    const pr = new Intl.PluralRules('en-GB', { type: 'ordinal' });
    const suffixes = new Map([
      ['one', 'st'],
      ['two', 'nd'],
      ['few', 'rd'],
      ['other', 'th'],
    ]);
    return `${n}${suffixes.get(pr.select(n))}`;
  });
};
