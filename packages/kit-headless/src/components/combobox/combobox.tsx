import {
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
  type QRL,
  type Signal,
  type ContextId,
  PropsOf,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';

type QrlType<T> = T extends QRL<infer U> ? U : never;

export type ResolvedOption<
  O extends Option = Option,
  ValueKey extends string = 'value',
> = {
  option: O;
  key: number;
  value: O extends Record<string, unknown> ? O[ValueKey] : O;
  label: string;
  disabled: boolean;
  lcLabel?: string;
};

export type ComboboxProps<O extends Option = Option> = PropsOf<'div'> & {
  // user's source of truth
  options: O[];
  filter$?: QRL<
    (labelInput: string, options: ResolvedOption<O>[]) => ResolvedOption<O>[]
  >;

  // option settings
  optionValueKey?: string;
  optionLabelKey?: string;
  optionDisabledKey?: string;

  // uncontrolled state
  defaultLabel?: string;

  // signal binds
  'bind:isListboxOpen'?: Signal<boolean | undefined>;
  'bind:isInputFocused'?: Signal<boolean | undefined>;
  'bind:inputValue'?: Signal<string>;
  'bind:highlightedIndex'?: Signal<number>;
  'bind:selectedIndex'?: Signal<number>;
};

export const Combobox = component$(
  <O extends Option = Option>(props: ComboboxProps<O>) => {
    const {
      'bind:isListboxOpen': givenListboxOpenSig,
      'bind:isInputFocused': givenInputFocusedSig,
      'bind:inputValue': givenInputValueSig,
      'bind:highlightedIndex': givenHighlightedIndexSig,
      'bind:selectedIndex': givenSelectedIndexSig,
      options,
      defaultLabel = '',
      optionValueKey = 'value',
      optionLabelKey = 'label',
      optionDisabledKey = 'disabled',
      filter$,
      ...rest
    } = props;

    const resolvedSig = useComputed$(() => {
      const labelKey = optionLabelKey;
      const valueKey = optionValueKey;
      const disabledKey = optionDisabledKey;
      return options.map((option, key) => {
        let value, label, disabled, lcLabel;
        if (typeof option === 'string') {
          value = option;
          label = option;
          disabled = false;
        } else {
          value = option[valueKey];
          label = option[labelKey];
          disabled = !!option[disabledKey];
          if (typeof label !== 'string') {
            throw new Error(
              'Qwik UI: Combobox optionLabelKey was not provided, and the option was not a string. Please provide a value for optionLabelKey, use the property name "label", or ensure that the option is a string.',
            );
          }
        }
        // Note that we don't calc lcLabel but we put it in the object
        // so it's not polymorphic when adding lcLabel later
        return { option, key, value, label, disabled, lcLabel } as ResolvedOption<O>;
      });
    });

    const filteredOptionsSig = useSignal<ResolvedOption<O>[]>([]);

    const defaultInputValueSig = useSignal<string>(defaultLabel);
    const inputValueSig = givenInputValueSig || defaultInputValueSig;

    useTask$(async function filterAPITask({ track }) {
      const opts = track(() => resolvedSig.value);
      const inputValue = track(() => inputValueSig.value);
      let filterFunction: QrlType<ComboboxProps<O>['filter$']> | undefined = await track(
        () => filter$,
      )?.resolve();

      if (!filterFunction) {
        filterFunction = ((value: string, options: ResolvedOption[]) => {
          if (!options) return [];
          if (!value) return options;
          const lcValue = value.toLowerCase();
          return options.filter((option) => {
            let { lcLabel } = option;
            if (!lcLabel) {
              lcLabel = option.label.toLowerCase();
              option.lcLabel = lcLabel;
            }
            return lcLabel.includes(lcValue);
          });
        }) as QrlType<ComboboxProps<O>['filter$']>;
      }

      filteredOptionsSig.value = filterFunction(inputValue, opts);
    });

    const labelRef = useSignal<HTMLLabelElement>();
    const listboxRef = useSignal<HTMLUListElement>();
    const inputRef = useSignal<HTMLInputElement>();
    const popoverRef = useSignal<HTMLElement>();

    const triggerRef = useSignal<HTMLButtonElement>();

    const defaultSelectedOptionIndexSig = useSignal<number>(-1);
    const selectedOptionIndexSig = givenSelectedIndexSig || defaultSelectedOptionIndexSig;

    const defaultListboxOpenSig = useSignal<boolean | undefined>(false);
    const isListboxOpenSig = givenListboxOpenSig || defaultListboxOpenSig;

    const defaultInputFocusedSig = useSignal<boolean | undefined>(false);
    const isInputFocusedSig = givenInputFocusedSig || defaultInputFocusedSig;

    const defaultHighlightedIndexSig = useSignal<number>(-1);
    const highlightedIndexSig = givenHighlightedIndexSig || defaultHighlightedIndexSig;

    /**
     * Id for 1:1 items. Also used as a prefix for the options and then their key.
     */
    const localId = useId();

    const context: ComboboxContext<O> = {
      filteredOptionsSig,
      inputValueSig,
      labelRef,
      inputRef,
      popoverRef,
      localId,
      triggerRef,
      listboxRef,
      isInputFocusedSig,
      isListboxOpenSig,
      highlightedIndexSig,
      selectedOptionIndexSig,
      defaultLabel,
      optionValueKey,
      optionLabelKey,
      optionDisabledKey,
    };

    useContextProvider(ComboboxContextId as ContextId<ComboboxContext<O>>, context);

    return (
      <div {...rest}>
        <Slot />
      </div>
    );
  },
);
