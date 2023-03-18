import {
  $,
  component$,
  HTMLAttributes,
  type QRL,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import {
  AsYouType,
  parsePhoneNumberWithError,
  ParseError,
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { countries, type CountryListItemType } from 'country-list-json';
import styles from './input-phone.css?inline';

interface InputPhoneProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  countryCode?: CountryCode;
  onCountryChange$?: QRL<(country?: InputPhoneCountry) => void>;
  onNumberChange$?: QRL<(phone: string) => void>;
  onValidChange$?: QRL<(validity: InputPhoneValidity) => void>;
}

export type InputPhoneValidity =
  | 'INVALID_COUNTRY'
  | 'NOT_A_NUMBER'
  | 'TOO_SHORT'
  | 'TOO_LONG'
  | 'INVALID_LENGTH'
  | 'MAYBE_VALID'
  | 'NOT_VALID'
  | 'VALID';

type CountryItem = Omit<CountryListItemType, 'code'> & {
  code: CountryCode;
};

export type InputPhoneCountry = {
  name: string;
  'alpha-2': CountryCode;
  countryCode: string;
  flag: string;
};

/**
 * Returns the country of type CountryItem, or undefined.
 * Looks into the list of countries against the key or a function.
 * @param value string | CountryCode | ((country: CountryItem) => boolean) | undefined,
 * @param key keyof CountryItem
 * @returns CountryItem | undefined
 */
export const find = (
  value: string | CountryCode | ((country: CountryItem) => boolean) | undefined,
  key?: keyof CountryItem
) => {
  if (!value) {
    return undefined;
  }

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
    onCountryChange$,
    onNumberChange$,
    onValidChange$,
  }: InputPhoneProps) => {
    useStylesScoped$(styles);
    const defaultCountry = find(countryCode, 'code');

    const inputRef = useSignal<HTMLInputElement>();
    const selectRef = useSignal<HTMLSelectElement>();
    const number = useSignal(value);
    const country = useSignal<CountryItem | undefined>(defaultCountry);
    const output = useSignal('');

    const handleCountry = $((country: CountryItem | undefined) => {
      if (!country) {
        onCountryChange$ && onCountryChange$(undefined);
      } else {
        const outputCountry: InputPhoneCountry = {
          'alpha-2': country.code,
          countryCode: country.dial_code.replace('+', ''),
          flag: country.flag,
          name: country.name,
        };
        onCountryChange$ && onCountryChange$(outputCountry);
      }
    });

    const handleNumber = $((number: string) => {
      onNumberChange$ && onNumberChange$(number);
    });

    const handleValidChange = $((phone: string) => {
      if (!onValidChange$) {
        return;
      }

      if (isValidPhoneNumber(phone)) {
        return onValidChange$('VALID');
      }

      if (isPossiblePhoneNumber(phone)) {
        return onValidChange$('MAYBE_VALID');
      }

      return onValidChange$('NOT_VALID');
    });

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
        handleValidChange(output.value);
      } catch (error) {
        if (error instanceof ParseError) {
          onValidChange$ && onValidChange$(error.message as InputPhoneValidity);
        } else {
          throw error;
        }
      } finally {
        handleCountry(country.value);
        handleNumber(output.value);
      }
    });

    /**
     * Changes country when the number changes
     * and replaces the country code of the number
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

        handleValidChange(output.value);
      } catch (error) {
        if (number.value.at(0) === '+') {
          const country = find(code, 'code');
          country && (output.value = country.dial_code);
        }
        if (error instanceof ParseError) {
          onValidChange$ && onValidChange$(error.message as InputPhoneValidity);
        } else {
          throw error;
        }
      } finally {
        handleCountry(country.value);
        handleNumber(output.value);
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
          onInput$={(_, { value }) => {
            number.value = new AsYouType(country.value?.code).input(value);
          }}
        />
      </div>
    );
  }
);
