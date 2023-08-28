import {
  JSXNode,
  QRL,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';

import { Option } from './combobox-context.type';

export type ComboboxProps = {
  // user's source of truth
  options: Signal<Array<Option>>;
  optionComponent$?: QRL<(option: any, index: number) => JSXNode>;
  optionValue?: string;
  optionTextValue?: string;
  optionLabel?: string;

  // option settings
  onInputChange$?: QRL<(value: string) => void>;
  optionValueKey?: string;
  optionLabelKey?: string;
  optionDisabledKey?: string;

  // input
  placeholder?: string;

  // signal binds
  'bind:isListboxOpenSig'?: Signal<boolean | undefined>;
  'bind:isInputFocusedSig'?: Signal<boolean | undefined>;
  'bind:isTriggerFocusedSig'?: Signal<boolean | undefined>;
} & QwikIntrinsicElements['div'];

export type OptionInfo = {
  optionId: string;
  index: number;
};

import ComboboxContextId from './combobox-context-id';
import { ComboboxContext } from './combobox-context.type';

export const Combobox = component$((props: ComboboxProps) => {
  const {
    'bind:isListboxOpenSig': givenListboxOpenSig,
    'bind:isInputFocusedSig': givenInputFocusedSig,
    'bind:isTriggerFocusedSig': givenTriggerFocusedSig,
    options,
    optionComponent$,
    onInputChange$,
    optionValueKey,
    optionLabelKey,
    optionDisabledKey,
    ...rest
  } = props;
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

  const context: ComboboxContext = {
    options,
    optionComponent$,

    inputRef,
    triggerRef,
    listboxRef,
    isInputFocusedSig,
    isTriggerFocusedSig,
    isListboxOpenSig,
    highlightedIndexSig,
    selectedOptionIndexSig,
    onInputChange$,
    optionValueKey,
    optionLabelKey,
    optionDisabledKey,
  };

  useContextProvider(ComboboxContextId, context);

  return (
    <div {...rest}>
      <Slot />
    </div>
  );
});
