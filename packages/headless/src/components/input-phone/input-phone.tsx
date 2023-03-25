import {
  $,
  component$,
  type QRL,
  useSignal,
  useStylesScoped$,
  useTask$,
  QwikIntrinsicElements,
  useVisibleTask$,
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
import { timezoneCityToCountry } from './timezone-city-to-country';
import styles from './input-phone.css?inline';

export type InputPhoneProps = QwikIntrinsicElements['input'] & {
  value?: string;
  countryCode?: CountryCode | 'auto';
  wrapperProps?: QwikIntrinsicElements['div'];
  onCountryChange$?: QRL<(country?: InputPhoneCountry) => void>;
  onNumberChange$?: QRL<(phone: string) => void>;
  onValidChange$?: QRL<(validity: InputPhoneValidity) => void>;
};

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

/**
 * Retrieve the dial country code in CountryItem by using the user's timezone
 * @returns CountryItem | undefined
 */
export const findCountryByUserTimezone = () => {
  if (!Intl) {
    console.warn(
      'We cannot automatically retrieve the country of the user because Intl is not supported.'
    );
    return;
  }

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const city = userTimeZone.split('/').at(-1) as string;
  const country = timezoneCityToCountry[city];

  // look into the city and country's name,
  // e.g. Reunion (as city) the country's name is Réunion
  //      but only Reunion exists in country-list-json
  return countries.find(({ name }) => name === city || name === country) as
    | CountryItem
    | undefined;
};

export const InputPhone = component$(
  ({
    countryCode,
    placeholder = 'Phone number',
    value = '',
    wrapperProps,
    onCountryChange$,
    onNumberChange$,
    onValidChange$,
    ...props
  }: InputPhoneProps) => {
    useStylesScoped$(styles);
    const defaultCountry =
      countryCode === 'auto'
        ? findCountryByUserTimezone()
        : find(countryCode, 'code');

    const inputRefSignal = useSignal<HTMLInputElement>();
    const selectRefSignal = useSignal<HTMLSelectElement>();
    const numberSignal = useSignal(value);
    const countrySignal = useSignal(defaultCountry);
    const outputSignal = useSignal(value);

    const handleCountryChange = $((country: CountryItem | undefined) => {
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

    const handleNumberChange = $((number: string) => {
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
     * Emit the InputPhone's on initial render
     */
    useVisibleTask$(() => {
      handleCountryChange(countrySignal.value);
      handleNumberChange(outputSignal.value);
      handleValidChange(outputSignal.value);
    });

    /**
     * Change number when the country changes
     */
    useTask$(({ track }) => {
      const phone = track(() => numberSignal.value);

      if (!phone) {
        return;
      }

      try {
        const phoneNumber = parsePhoneNumberWithError(
          phone,
          countrySignal.value?.code
        );

        if (!phoneNumber) {
          return;
        }

        if (phoneNumber.country) {
          countrySignal.value = find(phoneNumber.country, 'code');
        }

        outputSignal.value = phone;
        handleValidChange(outputSignal.value);
      } catch (error) {
        if (error instanceof ParseError) {
          onValidChange$ && onValidChange$(error.message as InputPhoneValidity);
        } else {
          throw error;
        }
      } finally {
        handleCountryChange(countrySignal.value);
        handleNumberChange(outputSignal.value);
      }
    });

    /**
     * Changes country when the number changes
     * and replaces the country code when number
     * contains the country code (e.g. +330648)
     */
    useTask$(({ track }) => {
      const code = track(() => countrySignal.value?.code);

      if (!code) {
        return;
      }

      try {
        const phoneNumber = parsePhoneNumber(numberSignal.value, code);

        if (!phoneNumber) {
          return;
        }

        if (numberSignal.value.at(0) === '+') {
          const country = find(code, 'code');
          const { nationalNumber } = phoneNumber;

          if (!country) {
            return;
          }

          outputSignal.value = new AsYouType().input(
            `${country.dial_code}${nationalNumber}`
          );
        } else {
          outputSignal.value = new AsYouType(code).input(numberSignal.value);
        }

        handleValidChange(outputSignal.value);
      } catch (error) {
        if (numberSignal.value.at(0) === '+') {
          const country = find(code, 'code');
          country && (outputSignal.value = country.dial_code);
        }
        if (error instanceof ParseError) {
          onValidChange$ && onValidChange$(error.message as InputPhoneValidity);
        } else {
          throw error;
        }
      } finally {
        handleCountryChange(countrySignal.value);
        handleNumberChange(outputSignal.value);
      }
    });

    return (
      <div {...wrapperProps}>
        <button tabIndex={-1}>
          {countrySignal.value?.flag ? countrySignal.value?.flag : `🌐`}
        </button>
        <select
          tabIndex={1}
          ref={selectRefSignal}
          title={countrySignal.value?.name}
          aria-label="Country and dial code of your phone number"
          onChange$={(_, { value }) => {
            countrySignal.value = findBySelectValue(value);
            selectRefSignal.value?.blur();
            inputRefSignal.value?.focus();
          }}
        >
          <option>Select the country's phone code</option>
          {countries.map(({ code, dial_code, name }) => (
            <option key={code} selected={countrySignal.value?.code === code}>
              {`${name} (${dial_code})`}
            </option>
          ))}
        </select>
        <input
          {...props}
          tabIndex={2}
          ref={inputRefSignal}
          placeholder={placeholder}
          type="text"
          value={outputSignal.value}
          onInput$={[
            $((_: Event, { value }: HTMLInputElement) => {
              numberSignal.value = new AsYouType(
                countrySignal.value?.code
              ).input(value);
            }),
            props.onInput$,
          ]}
        />
      </div>
    );
  }
);
