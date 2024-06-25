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
import { useCombobox } from './use-combobox';

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

  /** QRL to customize the filter function. */
  filter$?: QRL<(displayValue: string, inputValue: string) => boolean>;

  /** Handler that runs when the input value changes. */
  onInput$?: QRL<(value: string) => void>;

  /** Handler that runs when there are no visible items in the listbox. */
  onEmpty$?: QRL<() => void>;

  /** Placeholder text for the input. */
  placeholder?: string;

  /** Checks if the Combobox.Empty component was added. */
  hasEmptyComp?: boolean;
} & TMultiValue &
  TStringOrArray;

export const HComboboxRootImpl = component$<
  HComboboxRootImplProps<boolean> & InternalComboboxProps
>((props: HComboboxRootImplProps<boolean> & InternalComboboxProps) => {
  const isListboxOpenSig = useSignal(false);
  const {
    onInput$,
    onChange$,
    onOpenChange$,
    _itemsMap,
    _valuePropIndex: givenValuePropIndex,
    loop: givenLoop,
    scrollOptions: givenScrollOptions,
    multiple = false,
    placeholder,
    filter$,
    hasEmptyComp,
    ...rest
  } = props;

  // source of truth
  const itemsMapSig = useComputed$(() => {
    return _itemsMap ?? new Map();
  });

  // refs
  const rootRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const panelRef = useSignal<HTMLUListElement>();
  const labelRef = useSignal<HTMLDivElement>();
  const groupRef = useSignal<HTMLDivElement>();
  const controlRef = useSignal<HTMLDivElement>();
  const loop = givenLoop ?? false;
  const localId = useId();
  const selectedIndexSetSig = useSignal<Set<number>>(
    new Set(givenValuePropIndex ? [givenValuePropIndex] : []),
  );
  const disabledIndexSetSig = useSignal<Set<number>>(new Set());
  const highlightedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);
  const initialLoadSig = useSignal<boolean>(true);
  const currDisplayValueSig = useSignal<string | string[]>();
  const scrollOptions = givenScrollOptions ?? {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  };
  const inputValueSig = useSignal<string>(inputRef.value?.value ?? '');

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
    listboxRef: panelRef,
    labelRef,
    groupRef,
    controlRef,
    localId,
    highlightedIndexSig,
    selectedIndexSetSig,
    disabledIndexSetSig,
    currDisplayValueSig,
    filter$,
    loop,
    multiple,
    scrollOptions,
    placeholder,
    hasVisibleItemsSig,
  };

  useContextProvider(comboboxContextId, context);

  const { selectionManager$ } = useCombobox();

  useTask$(async function reactiveUserValue({ track }) {
    const bindValueSig = props['bind:value'];
    if (!bindValueSig) return;
    track(() => bindValueSig.value);

    for (const [index, item] of itemsMapSig.value) {
      if (bindValueSig.value?.includes(item.value)) {
        await selectionManager$(index, 'add');

        if (initialLoadSig.value) {
          // for both SSR and CSR, we need to set the initial index
          context.highlightedIndexSig.value = index;
        }
      } else {
        await selectionManager$(index, 'remove');
      }
    }
  });

  useTask$(function reactiveUserOpen({ track }) {
    const bindOpenSig = props['bind:open'];
    if (!bindOpenSig) return;
    track(() => bindOpenSig.value);

    isListboxOpenSig.value = bindOpenSig.value ?? isListboxOpenSig.value;
  });

  useTask$(function onOpenChangeTask({ track }) {
    const bindOpenSig = props['bind:open'];
    track(() => isListboxOpenSig.value);

    if (!initialLoadSig.value) {
      onOpenChange$?.(isListboxOpenSig.value);
    }

    // sync the user's given signal for the open state
    if (bindOpenSig && bindOpenSig.value !== isListboxOpenSig.value) {
      bindOpenSig.value = isListboxOpenSig.value;
    }
  });

  useTask$(function onInputTask({ track }) {
    track(() => context.inputValueSig.value);

    if (!initialLoadSig.value) {
      onInput$?.(context.inputValueSig.value);
    }
  });

  useTask$(async function updateConsumerProps({ track }) {
    const bindValueSig = props['bind:value'];
    const bindDisplayTextSig = props['bind:displayValue'];
    track(() => selectedIndexSetSig.value);

    const values = [];
    const displayValues = [];

    for (const index of context.selectedIndexSetSig.value) {
      const item = context.itemsMapSig.value.get(index);

      if (item) {
        values.push(item.value);
        displayValues.push(item.displayValue);
      }
    }

    if (onChange$ && selectedIndexSetSig.value.size > 0) {
      await onChange$(context.multiple ? values : values[0]);
    }

    // sync the user's given signal when an option is selected
    if (bindValueSig && bindValueSig.value) {
      const currUserSigValues = JSON.stringify(bindValueSig.value);
      const newUserSigValues = JSON.stringify(values);

      if (currUserSigValues !== newUserSigValues) {
        if (context.multiple) {
          bindValueSig.value = values;
        } else {
          bindValueSig.value = values[0];
        }
      }
    }

    context.currDisplayValueSig.value = displayValues;

    // sync the user's given signal for the display value
    if (bindDisplayTextSig && context.currDisplayValueSig.value) {
      bindDisplayTextSig.value = context.multiple
        ? context.currDisplayValueSig.value
        : context.currDisplayValueSig.value[0];
    }
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <div ref={rootRef} role="group" data-combobox-root {...rest}>
      <Slot />
    </div>
  );
});
