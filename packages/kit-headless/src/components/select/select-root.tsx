import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useSignal,
  useContextProvider,
  useTask$,
  type QRL,
  useId,
  useComputed$,
} from '@builder.io/qwik';
import SelectContextId, { type SelectContext } from './select-context';
import { useSelect } from './use-select';

export type TItemsMap = Map<
  number,
  { value: string; displayValue: string; disabled: boolean }
>;

export type InternalSelectProps = {
  /** When a value is passed, we check if it's an actual item value, and get its index at pre-render time.
   **/
  _valuePropIndex?: number | null;

  /** Checks if the consumer added the label in their JSX */
  _label?: boolean;

  /** Our source of truth for the items. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _itemsMap: TItemsMap;
};

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

export type SelectProps<M extends boolean = boolean> = Omit<
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
} & TMultiValue &
  TStringOrArray;

/* root component in select-inline.tsx */
export const HSelectImpl = component$<SelectProps<boolean> & InternalSelectProps>(
  (props: SelectProps<boolean> & InternalSelectProps) => {
    const {
      _itemsMap,
      _valuePropIndex: givenValuePropIndex,
      onChange$,
      onOpenChange$,
      scrollOptions: givenScrollOptions,
      loop: givenLoop,
      multiple = false,
      _label,
      name,
      required,
      disabled,
      ...rest
    } = props;

    // refs
    const rootRef = useSignal<HTMLDivElement>();
    const triggerRef = useSignal<HTMLButtonElement>();
    const popoverRef = useSignal<HTMLElement>();
    const listboxRef = useSignal<HTMLUListElement>();
    const labelRef = useSignal<HTMLDivElement>();
    const groupRef = useSignal<HTMLDivElement>();
    const loop = givenLoop ?? false;

    // ids
    const localId = useId();
    const listboxId = `${localId}-listbox`;
    const labelId = `${localId}-label`;
    const valueId = `${localId}-value`;

    // source of truth
    const itemsMapSig = useComputed$(() => {
      return _itemsMap;
    });

    const selectedIndexSetSig = useSignal<Set<number>>(
      new Set(givenValuePropIndex ? [givenValuePropIndex] : []),
    );

    const highlightedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);

    const isListboxOpenSig = useSignal<boolean>(false);
    const scrollOptions = givenScrollOptions ?? {
      behavior: 'instant',
      block: 'nearest',
    };

    const currDisplayValueSig = useSignal<string | string[]>();

    const initialLoadSig = useSignal<boolean>(true);

    const context: SelectContext = {
      itemsMapSig,
      currDisplayValueSig,
      triggerRef,
      popoverRef,
      listboxRef,
      labelRef,
      groupRef,
      localId,
      highlightedIndexSig,
      selectedIndexSetSig,
      isListboxOpenSig,
      scrollOptions,
      loop,
      multiple,
      name,
      required,
      disabled,
    };

    useContextProvider(SelectContextId, context);

    const { getActiveDescendant$, selectionManager$ } = useSelect();

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
      track(() => isListboxOpenSig.value);

      if (!initialLoadSig.value) {
        onOpenChange$?.(isListboxOpenSig.value);
      }
    });

    const activeDescendantSig = useComputed$(() => {
      if (isListboxOpenSig.value) {
        return getActiveDescendant$(highlightedIndexSig.value ?? -1);
      } else {
        return '';
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

    useTask$(({ track }) => {
      context.disabled = track(() => disabled);
    });

    return (
      <div
        role="combobox"
        ref={rootRef}
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        data-disabled={context.disabled ? '' : undefined}
        aria-controls={listboxId}
        aria-expanded={context.isListboxOpenSig.value}
        aria-haspopup="listbox"
        aria-activedescendant={activeDescendantSig.value}
        aria-labelledby={_label ? labelId : valueId}
        aria-multiselectable={context.multiple ? 'true' : undefined}
        {...rest}
      >
        <Slot />
      </div>
    );
  },
);
