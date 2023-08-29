import {
  JSXNode,
  QRL,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
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
    defaultLabel: defaultLabel,
    optionValueKey,
    optionLabelKey,
    optionDisabledKey,
    ...rest
  } = props;
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

  const context: ComboboxContext = {
    options,
    optionComponent$,
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
    onInputChange$,
    defaultLabel,
    optionIds,
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
