import {
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { ComboboxContext, comboboxContextId } from './combobox-context';
import { InternalComboboxProps } from './combobox-inline';
import { useCombinedRef } from '../../hooks/combined-refs';
import { useBoundSignal } from '../../utils/bound-signal';

export type TMultiple<M> = M extends true ? string[] : string;

/**
 *  Value sets an initial value for the select. If multiple is true, value is disabled
 *
 */
type TMultiValue =
  | { multiple: true; value?: never }
  | { multiple?: false; value?: string };

type TStringOrArray =
  | {
      multiple?: true;
      onChange$?: QRL<(value: string[]) => void>;
    }
  | {
      multiple?: false;
      onChange$?: QRL<(value: string) => void>;
    };

export type HComboboxRootImplProps<M extends boolean = boolean> = Omit<
  Omit<PropsOf<'div'>, 'onInput$'>,
  'onChange$'
> & {
  /** A signal that controls the current selected value (controlled). */
  'bind:value'?: Signal<TMultiple<M>>;

  /** A signal that controls the current open state (controlled). */
  'bind:open'?: Signal<boolean>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'bind:displayValue'?: Signal<TMultiple<M>>;

  /**
   * QRL handler that runs when a select value changes.
   * @param value The new value as a string.
   */
  onChange$?: QRL<(value: TMultiple<M>) => void>;
  /**
   * QRL handler that runs when the listbox opens or closes.
   * @param open The new state of the listbox.
   *
   */
  onOpenChange$?: QRL<(open: boolean) => void>;

  /**
   *  The native scrollIntoView method is used to scroll the options into view when the user highlights an option. This allows customization of the scroll behavior.
   */
  scrollOptions?: ScrollIntoViewOptions;

  /**
   *  Enables looped behavior when the user navigates through the options using the arrow keys.
   */
  loop?: boolean;

  /**
   * The name of the select element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#name).
   */
  name?: string;

  /**
   * Specifies that the user must select a value before submitting the form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#required).
   */
  required?: boolean;

  /**
   * If `true`, prevents the user from interacting with the select.
   */
  disabled?: boolean;

  /**
   * If `true`, allows multiple selections.
   */
  multiple?: M;

  /** If true, the combobox is invalid. */
  invalid?: boolean;

  /** If true, the combobox will filter the items based on the input value based on the include */
  filter?: boolean;

  /** Handler that runs when the input value changes. */
  onInput$?: QRL<(value: string) => void>;

  /** Handler that runs when there are no visible items in the listbox. */
  onEmpty$?: QRL<() => void>;

  /** Placeholder text for the input. */
  placeholder?: string;

  /** Checks if the Combobox.Empty component was added. */
  hasEmptyComp?: boolean;

  /** Checks if the Combobox.ErrorMessage component was added. */
  hasErrorComp?: boolean;

  removeOnBackspace?: boolean;
} & TMultiValue &
  TStringOrArray;

export const HComboboxRootImpl = component$<
  HComboboxRootImplProps<boolean> & InternalComboboxProps
>((props: HComboboxRootImplProps<boolean> & InternalComboboxProps) => {
  const {
    onInput$,
    onChange$,
    onOpenChange$,
    'bind:value': givenValueSig,
    'bind:open': givenOpenSig,
    initialIndex,
    initialValue,
    loop: givenLoop,
    scrollOptions: givenScrollOptions,
    multiple = false,
    placeholder,
    filter = true,
    _itemsMap,
    hasEmptyComp,
    removeOnBackspace = false,
    name,
    required,
    ...rest
  } = props;

  // source of truth
  const isListboxOpenSig = useBoundSignal(givenOpenSig, false);
  const selectedValuesSig = useBoundSignal(
    givenValueSig,
    multiple ? (initialValue ? [initialValue] : []) : initialValue || '',
  );

  const itemsMapSig = useComputed$(() => {
    return props._itemsMap ?? new Map();
  });
  const rootRef = useCombinedRef(props.ref);
  const triggerRef = useSignal<HTMLButtonElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const panelRef = useSignal<HTMLDivElement>();
  const labelRef = useSignal<HTMLDivElement>();
  const groupRef = useSignal<HTMLDivElement>();
  const controlRef = useSignal<HTMLDivElement>();
  const loop = givenLoop ?? false;
  const localId = useId();
  /** We use selected values to preserve the item state when the consumer filters the items. */
  const selectedValueSetSig = useSignal<Set<string>>(
    new Set(initialValue ? [initialValue] : []),
  );

  const disabledIndexSetSig = useSignal<Set<number>>(new Set());
  const isMouseOverPopupSig = useSignal<boolean>(false);
  const highlightedIndexSig = useSignal<number | null>(initialIndex ?? null);
  const initialLoadSig = useSignal<boolean>(true);
  const currDisplayValueSig = useSignal<string | string[]>();
  const scrollOptions = givenScrollOptions ?? {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  };
  const inputValueSig = useSignal<string>(inputRef.value?.value ?? '');
  const isDisabledSig = useComputed$(() => props.disabled ?? false);
  const isInvalidSig = useComputed$(() => props.hasErrorComp ?? false);

  // check any initial disabled items before the computed read below
  useTask$(() => {
    // initial disabled indices
    const disabledIndices = new Set<number>();
    for (const [index, item] of itemsMapSig.value) {
      if (item.disabled) {
        disabledIndices.add(index);
      }
    }
    disabledIndexSetSig.value = disabledIndices;
  });

  const hasVisibleItemsSig = useComputed$(() => {
    return itemsMapSig.value.size !== disabledIndexSetSig.value.size;
  });

  useTask$(function closeIfEmptyComp({ track }) {
    track(() => disabledIndexSetSig.value);

    // automatically closes the listbox if there are no visible items AND the combobox does not have an empty component
    if (!hasEmptyComp && !hasVisibleItemsSig.value) {
      isListboxOpenSig.value = false;
    }
  });

  const context: ComboboxContext = {
    isListboxOpenSig,
    inputValueSig,
    itemsMapSig,
    triggerRef,
    inputRef,
    panelRef,
    labelRef,
    groupRef,
    controlRef,
    localId,
    highlightedIndexSig,
    selectedValuesSig,
    selectedValueSetSig,
    disabledIndexSetSig,
    currDisplayValueSig,
    isMouseOverPopupSig,
    initialLoadSig,
    removeOnBackspace,
    filter,
    loop,
    multiple,
    initialValue,
    scrollOptions,
    placeholder,
    hasVisibleItemsSig,
    name,
    required,
    isDisabledSig,
    isInvalidSig,
  };

  useContextProvider(comboboxContextId, context);

  useTask$(async function handleOpenChange({ track }) {
    track(() => isListboxOpenSig.value);

    if (!initialLoadSig.value) {
      await onOpenChange$?.(isListboxOpenSig.value);
    }
  });

  useTask$(async function handleInput({ track }) {
    track(() => context.inputValueSig.value);

    if (!initialLoadSig.value) {
      await onInput$?.(context.inputValueSig.value);
    }
  });

  useTask$(async function handleChange({ track }) {
    track(() => selectedValuesSig.value);

    if (!initialLoadSig.value && selectedValuesSig.value.length > 0) {
      await onChange$?.(selectedValuesSig.value);
    }
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <div
      role="group"
      ref={rootRef}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-disabled={isDisabledSig.value}
      data-invalid={context.isInvalidSig.value ? '' : undefined}
      aria-invalid={context.isInvalidSig.value}
      data-combobox-root
      {...rest}
    >
      <Slot />
    </div>
  );
});
