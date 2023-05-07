import { useSignal, type Signal, useStore } from '@builder.io/qwik';
import { CheckError } from 'checkpass';
import { type Rules, checkPassword } from './check-password';

const DEFAULT_AUTOCOMPLETE: PasswordAutocomplete = 'current-password';
const DEFAULT_VALUE = '';
const DEFAULT_VISIBLE = false;

type PasswordAutocomplete = 'on' | 'off' | 'current-password' | 'new-password';

export type Params = {
  autoComplete: PasswordAutocomplete | Signal<PasswordAutocomplete>;
  errors: Signal<CheckError[]>;
  rules: Partial<Rules> | undefined;
  value: string | Signal<string>;
  visible: boolean | Signal<boolean>;
};

export type Context = {
  autoComplete: Signal<PasswordAutocomplete>;
  errors: Signal<CheckError[]>;
  rules: Rules;
  value: Signal<string>;
  visible: Signal<boolean>;
};

/**
 *
 * @param params
 * @returns
 */
export const useInputPassword = (params: Partial<Params> | void): Context => {
  const rules = params?.rules;
  const value = inferParam(params?.value, DEFAULT_VALUE);

  const autoComplete = inferParam(params?.autoComplete, DEFAULT_AUTOCOMPLETE);
  const errors = inferParam(
    params?.errors,
    checkPassword(value.value, params?.rules)
  );
  const visible = inferParam(params?.visible, DEFAULT_VISIBLE);

  return useStore({
    autoComplete,
    errors,
    rules,
    value,
    visible,
  });
};

/**
 *
 * @param value
 * @param defaultValue
 * @returns
 */
const inferParam = <T>(value: T | Signal<T> | undefined, defaultValue: T) => {
  if (value === undefined) {
    return useSignal<T>(defaultValue);
  }

  if (value?.constructor?.name !== 'SignalImpl') {
    return useSignal<T>(value as T);
  }

  return value as Signal<T>;
};
