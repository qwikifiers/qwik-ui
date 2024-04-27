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
import { isBrowser, isServer } from '@builder.io/qwik/build';
import SelectContextId, { type SelectContext } from './select-context';
import { Opt } from './select-inline';
import { HiddenSelect } from './hidden-select';
import { useSelect } from './use-select';

export type InternalSelectProps = {
  /** Our source of truth for the options. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _options?: Opt[];

  /** When a value is passed, we check if it's an actual option value, and get its index at pre-render time.
   **/
  _valuePropIndex?: number | null;

  /** Checks if the consumer added the label in their JSX */
  _label?: boolean;
};

type TMultiple<M> = M extends true ? string[] : string;

/**
 *  Value sets an initial value for the select. If multiple is true, value is disabled
 *
 */
type TMultiValue =
  | { multiple: true; value?: never }
  | { multiple?: false; value?: string };

export type SelectProps<M extends boolean = boolean> = PropsOf<'div'> & {
  /** A signal that controls the current selected value (controlled). */
  'bind:value'?: Signal<TMultiple<M>>;

  /** A signal that controls the current open state (controlled). */
  'bind:open'?: Signal<boolean>;

  /**
   * QRL handler that runs when a select value changes.
   * @param value The new value as a string.
   */
  onChange$?: QRL<(value: string) => void>;

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
} & TMultiValue;

/* root component in select-inline.tsx */
export const SelectImpl = component$<SelectProps<boolean> & InternalSelectProps>(
  (props: SelectProps<boolean> & InternalSelectProps) => {
    const {
      _options,
      _valuePropIndex: givenValuePropIndex,
      onChange$,
      onOpenChange$,
      scrollOptions: givenScrollOptions,
      loop: givenLoop,
      name,
      required,
      disabled,
      multiple = false,
      _label,
      ...rest
    } = props;

    const { getActiveDescendant } = useSelect();

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

    /**
     * Updates the options when the options change
     * (for example, when a new option is added)
     **/
    const optionsSig = useComputed$(() => {
      if (_options === undefined || _options.length === 0) {
        return [];
      }
      return _options;
    });

    // core state
    const selectedIndexesSig = useSignal<Array<number | null>>([
      givenValuePropIndex ?? null,
    ]);
    const highlightedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);
    const isListboxOpenSig = useSignal<boolean>(false);
    const scrollOptions = givenScrollOptions ?? {
      behavior: 'instant',
      block: 'nearest',
    };

    const optionsIndexMap = useComputed$(() => {
      return new Map(optionsSig.value?.map((option, index) => [option.value, index]));
    });

    useTask$(function reactiveValueTask({ track }) {
      track(() => props['bind:value']?.value);
      if (!props['bind:value']) return;

      const values = Array.isArray(props['bind:value']?.value)
        ? props['bind:value']?.value
        : [props['bind:value']?.value];

      const matchingIndexes = values.map(
        (value) => optionsIndexMap.value.get(value) ?? null,
      );

      if (matchingIndexes) {
        selectedIndexesSig.value = matchingIndexes.filter((index) => index !== -1);

        if (multiple) return;
        highlightedIndexSig.value = matchingIndexes[0];
      }
    });

    useTask$(function reactiveOpenTask({ track }) {
      const signalValue = track(() => props['bind:open']?.value);

      isListboxOpenSig.value = signalValue ?? isListboxOpenSig.value;
    });

    useTask$(async function onChangeTask({ track }) {
      track(() => selectedIndexesSig.value);
      const firstOption = selectedIndexesSig.value[0];
      if (isBrowser && firstOption !== null) {
        await onChange$?.(optionsSig.value[firstOption].value);
      }

      if (!props['bind:value'] || !props['bind:value'].value) return;
      if (isServer) return;

      const newValue = multiple
        ? selectedIndexesSig.value.map((index) => optionsSig.value[index!].value)
        : optionsSig.value[firstOption!]?.value;

      if (JSON.stringify(props['bind:value'].value) !== JSON.stringify(newValue)) {
        props['bind:value'].value = newValue;
      }
    });

    useTask$(function onOpenChangeTask({ track }) {
      track(() => isListboxOpenSig.value);
      if (isBrowser) {
        onOpenChange$?.(isListboxOpenSig.value);
      }
    });

    const activeDescendantSig = useComputed$(() => {
      if (isListboxOpenSig.value) {
        return getActiveDescendant(
          highlightedIndexSig.value ?? -1,
          optionsSig.value,
          localId,
        );
      } else {
        return '';
      }
    });

    const context: SelectContext = {
      triggerRef,
      popoverRef,
      listboxRef,
      labelRef,
      groupRef,
      optionsSig,
      localId,
      highlightedIndexSig,
      selectedIndexesSig,
      isListboxOpenSig,
      scrollOptions,
      loop,
      multiple,
    };

    useContextProvider(SelectContextId, context);

    return (
      <div
        role="combobox"
        ref={rootRef}
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        aria-controls={listboxId}
        aria-expanded={context.isListboxOpenSig.value}
        aria-haspopup="listbox"
        aria-activedescendant={activeDescendantSig.value}
        aria-labelledby={_label ? labelId : valueId}
        {...rest}
      >
        <Slot />
        <HiddenSelect
          options={_options}
          name={name}
          required={required}
          disabled={disabled}
        />
      </div>
    );
  },
);
