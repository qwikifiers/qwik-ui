import {
  $,
  component$,
  HTMLAttributes,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import {
  AsYouType,
  parsePhoneNumberWithError,
  ParseError,
  parsePhoneNumber,
} from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { countries, type CountryListItemType } from 'country-list-json';
import styles from './input-phone.css?inline';
import { Button } from '@qwik-ui/primitives';

interface InputPhoneProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  countryCode?: CountryCode;
}

type CountryItem = Omit<CountryListItemType, 'code'> & {
  code: CountryCode;
};

export const find = (
  value: string | CountryCode | ((country: CountryItem) => boolean) | undefined,
  key?: keyof CountryItem
) => {
  let fn;

  if (typeof value === 'function') {
    fn = value;
  } else if (key) {
    fn = (country: CountryItem) => country[key] === value;
  } else {
    console.warn(`Ethier value is a function or key is not empty`);
    return;
  }

  return !value ? undefined : (countries as CountryItem[]).find(fn);
};

export const findBySelectValue = (value: string) => {
  return find(({ name, dial_code }) => value === `${name} (${dial_code})`);
};

export const InputPhone = component$(
  ({
    countryCode,
    placeholder = 'Phone number',
    value = '',
    onInput$,
  }: InputPhoneProps) => {
    useStylesScoped$(styles);

    const inputRef = useSignal<HTMLInputElement>();
    const selectRef = useSignal<HTMLSelectElement>();

    const defaultCountry = find(countryCode, 'code');

    const number = useSignal(value);
    const country = useSignal<CountryItem | undefined>(defaultCountry);
    const output = useSignal('');

    /**
     * Change number when the country changes
     */
    useTask$(({ track }) => {
      const phone = track(() => number.value);

      if (!phone) {
        return;
      }

      try {
        const phoneNumber = parsePhoneNumberWithError(
          phone,
          country.value?.code
        );

        if (!phoneNumber) {
          return;
        }

        if (phoneNumber.country) {
          country.value = find(phoneNumber.country, 'code');
        }

        output.value = phone;
      } catch (error) {
        if (error instanceof ParseError) {
          // TODO bubble up the error
          console.log(error.message);
        } else {
          throw error;
        }
      }
    });

    /**
     * Change country when the number changes
     * and replace the country code of the number
     * if it's already been set
     */
    useTask$(({ track }) => {
      const code = track(() => country.value?.code);

      if (!code) {
        return;
      }

      try {
        const phoneNumber = parsePhoneNumber(number.value, code);

        if (!phoneNumber) {
          return;
        }

        if (number.value.at(0) === '+') {
          const country = find(code, 'code');
          const { nationalNumber } = phoneNumber;

          if (!country) {
            return;
          }

          output.value = new AsYouType().input(
            `${country.dial_code}${nationalNumber}`
          );
        } else {
          output.value = new AsYouType(code).input(number.value);
        }
      } catch (error) {
        if (number.value.at(0) === '+') {
          const country = find(code, 'code');
          country && (output.value = country.dial_code);
        }
        if (error instanceof ParseError) {
          // TODO bubble up the error
          console.log(error.message);
        } else {
          throw error;
        }
      }
    });

    return (
      <div>
        <span>{country.value?.flag ? country.value?.flag : `🌐`}</span>
        <select
          ref={selectRef}
          title={country.value?.name}
          onChange$={(_, { value }) => {
            country.value = findBySelectValue(value);
            selectRef.value?.blur();
            inputRef.value?.focus();
          }}
        >
          <option>Select the country's phone code</option>
          {countries.map(({ code, dial_code, name }) => (
            <option selected={country.value?.code === code}>
              {`${name} (${dial_code})`}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          placeholder={placeholder}
          type="text"
          value={output.value}
          onInput$={[
            $((_: Event, { value }: HTMLInputElement) => {
              number.value = new AsYouType(country.value?.code).input(value);
            }),
            onInput$,
          ]}
        />
      </div>
    );
  }
);
