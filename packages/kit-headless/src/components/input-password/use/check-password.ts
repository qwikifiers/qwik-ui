import { useTask$ } from '@builder.io/qwik';
import { Context } from './input-password';
import checkpass, { Constraints } from 'checkpass';

export type Error = { message: string; name: keyof Constraints };

export type Rules = Partial<Constraints> | undefined;

const MIN_LENGTH = 0;
const CAPITAL_LETTERS = 0;
const MIN_NUMBERS = 0;
const MIN_SPECIAL_CHARS = 0;

/**
 *
 * @param service
 */
export const useCheckPassword = (service: Context) => {
  useTask$(({ track }) => {
    const value = track(() => service.value.value);
    const checks = checkPassword(value, service.rules);
    console.log({ checks });
    service.errors.value = checks;
  });
};

/**
 *
 * @param value
 * @param rules
 * @returns
 */
export const checkPassword = (value: string, rules: Rules) => {
  const checks = checkpass(value, constraints(rules));

  // if (rules) {
  //   console.log('----------------');
  //   console.log({ rules: constraints(rules) });
  //   console.log({ checks });
  //   console.log('----------------\n\n')
  // }

  return Object.entries(checks)
    .filter(([, { value }]) => value)
    .map(([name, { message }]) => ({
      name: name as keyof Constraints,
      message,
    }));
};

/**
 *
 * @param rules
 * @returns
 */
const constraints = (rules: Rules) => {
  return {
    minLength: rules?.minLength ?? MIN_LENGTH,
    minCapitalLetters: rules?.minCapitalLetters ?? CAPITAL_LETTERS,
    minNumbers: rules?.minNumbers ?? MIN_NUMBERS,
    minSpecialCharacters: rules?.minSpecialCharacters ?? MIN_SPECIAL_CHARS,
  };
};
