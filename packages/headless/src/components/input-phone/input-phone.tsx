import { $, component$, HTMLAttributes, useSignal } from '@builder.io/qwik';
import { AsYouType, CountryCode } from 'libphonenumber-js';

interface InputPhoneProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  countryCode?: CountryCode;
}

export const InputPhone = component$(
  ({ value = '', countryCode, onInput$ }: InputPhoneProps) => {
    const formatted = useSignal(value);

    return (
      <input
        placeholder="Phone number"
        type="text"
        value={formatted.value}
        onInput$={[
          $((_: Event, { value }: HTMLInputElement) => {
            formatted.value = new AsYouType(countryCode).input(value);
          }),
          onInput$,
        ]}
      />
    );
  }
);
