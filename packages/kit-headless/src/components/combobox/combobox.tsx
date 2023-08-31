import {
  QRL,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
  useComputed$,
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import ComboboxContextId from './combobox-context-id';
import { ComboboxContext } from './combobox-context.type';
import { getOptionLabel } from './utils';

import { type Option } from './combobox-context.type';

type QrlType<T> = T extends QRL<infer U> ? U : never;

export type ComboboxProps<
  O extends Option = Option,
  Complex extends { option: O; key: number } = { option: O; key: number },
> = {
  // user's source of truth
  options: O[];
  optionComponent$?: QRL<(option: O, key: number, filteredIndex: number) => JSX.Element>;
  optionValue?: string;
  optionTextValue?: string;
  optionLabel?: string;
  filter$?: QRL<(labelInput: string, options: Complex[]) => Complex[]>;

  // option settings
  optionValueKey?: string;
  optionLabelKey?: string;
  optionDisabledKey?: string;

  // uncontrolled state
  defaultLabel?: string;

  // signal binds
  'bind:isListboxOpenSig'?: Signal<boolean | undefined>;
  'bind:isInputFocusedSig'?: Signal<boolean | undefined>;
  'bind:isTriggerFocusedSig'?: Signal<boolean | undefined>;
} & QwikIntrinsicElements['div'];

export type OptionInfo = {
  optionId: string;
  index: number;
};

export const Combobox = component$(
  <
    O extends Option = Option,
    Complex extends { option: O; key: number } = { option: O; key: number },
  >(
    props: ComboboxProps<O, Complex>,
  ) => {
    const {
      'bind:isListboxOpenSig': givenListboxOpenSig,
      'bind:isInputFocusedSig': givenInputFocusedSig,
      'bind:isTriggerFocusedSig': givenTriggerFocusedSig,
      options,
      optionComponent$,
      defaultLabel = '',
      optionValueKey = 'value',
      optionLabelKey = 'label',
      optionDisabledKey = 'disabled',
      filter$,
      ...rest
    } = props;

    const complexSig = useComputed$(() =>
      options.map((option, key) => ({ option, key } as Complex)),
    );
    const optionsSig = useSignal<Complex[]>([]);
    const inputValueSig = useSignal<string>(defaultLabel);
    useTask$(async ({ track }) => {
      const opts = track(() => complexSig.value);
      const inputValue = track(() => inputValueSig.value);
      let filterFunction: QrlType<ComboboxProps<O, Complex>['filter$']> | undefined =
        await track(() => filter$)?.resolve();

      if (!filterFunction) {
        const labelKey = track(() => optionLabelKey);

        filterFunction = (value: string, options: Complex[]) => {
          if (!options) return [];
          if (!value) return options;
          return options.filter(({ option }) => {
            if (typeof option === 'string')
              return option.toLowerCase().includes(value.toLowerCase());
            return getOptionLabel(option, labelKey)
              ?.toLowerCase()
              .includes(value.toLowerCase());
          });
        };
      }

      optionsSig.value = filterFunction(inputValue, opts);
    });

    const labelRef = useSignal<HTMLLabelElement>();
    const listboxRef = useSignal<HTMLUListElement>();
    const inputRef = useSignal<HTMLInputElement>();

    const triggerRef = useSignal<HTMLButtonElement>();

    const selectedOptionIndexSig = useSignal<number>(-1);

    const defaultListboxOpenSig = useSignal<boolean | undefined>(false);
    const isListboxOpenSig = givenListboxOpenSig || defaultListboxOpenSig;

    const defaultInputFocusedSig = useSignal<boolean | undefined>(false);
    const isInputFocusedSig = givenInputFocusedSig || defaultInputFocusedSig;

    const defaultTriggerFocusedSig = useSignal<boolean | undefined>(false);
    const isTriggerFocusedSig = givenTriggerFocusedSig || defaultTriggerFocusedSig;

    const highlightedIndexSig = useSignal<number>(-1);

    const optionIds = useSignal<string[]>([]);

    /**
     * Id for 1:1 items other than the options
     */
    const localId = useId();

    const context: ComboboxContext<O> = {
      optionsSig,
      optionComponent$,
      inputValueSig,
      labelRef,
      inputRef,
      localId,
      triggerRef,
      listboxRef,
      isInputFocusedSig,
      isTriggerFocusedSig,
      isListboxOpenSig,
      highlightedIndexSig,
      selectedOptionIndexSig,
      defaultLabel,
      optionIds,
      optionValueKey,
      optionLabelKey,
      optionDisabledKey,
    };

    useContextProvider<typeof context>(ComboboxContextId, context);

    return (
      <div {...rest}>
        <Slot />
      </div>
    );
  },
);
