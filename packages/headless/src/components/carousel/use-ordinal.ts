import { $ } from '@builder.io/qwik';

export const useOrdinal = () => {
  return $((n: number) => {
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
