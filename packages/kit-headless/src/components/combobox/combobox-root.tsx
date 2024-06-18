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
  PropsOf<'div'>,
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

  invalid?: boolean;
} & TMultiValue &
  TStringOrArray;

export const HComboboxRootImpl = component$<
  HComboboxRootImplProps<boolean> & InternalComboboxProps
>((props: HComboboxRootImplProps<boolean> & InternalComboboxProps) => {
  const isListboxOpenSig = useSignal(false);
  const {
    onChange$,
    onOpenChange$,
    _itemsMap,
    _valuePropIndex: givenValuePropIndex,
    loop: givenLoop,
    scrollOptions: givenScrollOptions,
    multiple = false,
    ...rest
  } = props;

  // refs
  const rootRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const popoverRef = useSignal<HTMLElement>();
  const listboxRef = useSignal<HTMLUListElement>();
  const labelRef = useSignal<HTMLDivElement>();
  const groupRef = useSignal<HTMLDivElement>();
  const scrollOptions = givenScrollOptions ?? {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  };

  const loop = givenLoop ?? false;
  // ids
  const localId = useId();

  // source of truth
  const itemsMapSig = useComputed$(() => {
    return _itemsMap ?? new Map();
  });
  const selectedIndexSetSig = useSignal<Set<number>>(
    new Set(givenValuePropIndex ? [givenValuePropIndex] : []),
  );
  const highlightedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);
  const initialLoadSig = useSignal<boolean>(true);

  useTask$(async function onChangeTask({ track }) {
    track(() => selectedIndexSetSig.value);

    const values = [];

    for (const index of selectedIndexSetSig.value) {
      const item = itemsMapSig.value.get(index);

      if (item) {
        values.push(item.value);
      }
    }

    if (!initialLoadSig.value) {
      await onChange$?.(multiple ? values : values[0]);
    }
  });

  useTask$(async function onOpenChangeTask({ track }) {
    track(() => isListboxOpenSig.value);

    if (!initialLoadSig.value) {
      onOpenChange$?.(isListboxOpenSig.value);
    }
  });

  const context: ComboboxContext = {
    isListboxOpenSig,
    itemsMapSig,
    triggerRef,
    inputRef,
    popoverRef,
    listboxRef,
    labelRef,
    groupRef,
    localId,
    highlightedIndexSig,
    selectedIndexSetSig,
    loop,
    multiple,
    scrollOptions,
  };

  useContextProvider(comboboxContextId, context);

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <div ref={rootRef} role="combobox" {...rest}>
      <Slot />
    </div>
  );
});
