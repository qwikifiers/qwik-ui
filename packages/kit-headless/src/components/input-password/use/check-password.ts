import { useTask$ } from '@builder.io/qwik';
import { Context } from './input-password';
import checkpass, { Constraints } from 'checkpass';

export type Rules = Partial<Constraints> | undefined;

const DEFAULT_MIN_LENGTH = 0;
const DEFAULT_CAPITAL_LETTERS = 0;
const DEFAULT_MIN_NUMBERS = 0;
const DEFAULT_MIN_SPECIAL_CHARS = 0;

/**
 *
 * @param service
 */
export const useCheckPassword = (service: Context) => {
  useTask$(({ track }) => {
    const value = track(() => service.value.value);
    const checks = checkPassword(value, service.rules);
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

  return Object.entries(checks)
    .filter(([, { value }]) => value)
    .map(([, error]) => error);
};

/**
 *
 * @param rules
 * @returns
 */
const constraints = (rules: Rules) => {
  return {
    minLength: rules?.minLength ?? DEFAULT_MIN_LENGTH,
    minCapitalLetters: rules?.minCapitalLetters ?? DEFAULT_CAPITAL_LETTERS,
    minNumbers: rules?.minNumbers ?? DEFAULT_MIN_NUMBERS,
    minSpecialCharacters:
      rules?.minSpecialCharacters ?? DEFAULT_MIN_SPECIAL_CHARS,
  };
};
