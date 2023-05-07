import { useSignal, type Signal, useStore } from '@builder.io/qwik';

const AUTOCOMPLETE = 'current-password';
const VALUE = '';
const VISIBLE = false;

type PasswordAutocomplete = 'on' | 'off' | 'current-password' | 'new-password';

export type Params = {
  autoComplete: PasswordAutocomplete | Signal<PasswordAutocomplete>;
  value: string | Signal<string>;
  visible: boolean | Signal<boolean>;
};

export type Context = {
  autoComplete: Signal<PasswordAutocomplete>;
  value: Signal<string>;
  visible: Signal<boolean>;
};

export const useInputPassword = (params: Partial<Params> | void): Context => {
  return useStore({
    autoComplete: inferParam(params?.autoComplete, AUTOCOMPLETE),
    value: inferParam(params?.value, VALUE),
    visible: inferParam(params?.visible, VISIBLE),
  });
};

const inferParam = <T>(value: T | Signal<T> | undefined, defaultValue: T) => {
  if (value === undefined) {
    return useSignal<T>(defaultValue);
  }

  if (value?.constructor?.name !== 'SignalImpl') {
    return useSignal<T>(value as T);
  }

  return value as Signal<T>;
};
