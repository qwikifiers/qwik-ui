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
import { isBrowser } from '@builder.io/qwik/build';
import SelectContextId, { type SelectContext } from './select-context';
import { Opt } from './select-inline';
import { getActiveDescendant } from './utils';
import { HiddenSelect } from './hidden-select';

export type InternalSelectProps = {
  /** Our source of truth for the options. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _options?: Opt[];

  /** When a value is passed, we check if it's an actual option value, and get its index at pre-render time.
   **/
  _valuePropIndex?: number | null;
};

export type SelectProps = PropsOf<'div'> & {
  /** The initial selected value (uncontrolled). */
  value?: string;

  /** A signal that contains the current selected value (controlled). */
  'bind:value'?: Signal<string>;

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
};

/* root component in select-inline.tsx */
export const SelectImpl = component$<SelectProps & InternalSelectProps>(
  (props: SelectProps & InternalSelectProps) => {
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
    const groupRef = useSignal<HTMLDivElement>();
    const loop = givenLoop ?? false;
    const localId = useId();
    const listboxId = `${localId}-listbox`;

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

    const optionsIndexMap = new Map(
      optionsSig.value?.map((option, index) => [option.value, index]),
    );

    // core state
    const selectedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);
    const highlightedIndexSig = useSignal<number | null>(givenValuePropIndex ?? null);
    const isListboxOpenSig = useSignal<boolean>(false);
    const scrollOptions = givenScrollOptions ?? {
      behavior: 'instant',
      block: 'nearest',
    };

    // we use a map here to efficiently access the matching index of the signal value
    useTask$(function reactiveValueTask({ track }) {
      const signalValue = track(() => props['bind:value']?.value);
      if (!signalValue) return;

      const matchingIndex = optionsIndexMap.get(signalValue) ?? -1;
      if (matchingIndex !== -1) {
        selectedIndexSig.value = matchingIndex;
        highlightedIndexSig.value = matchingIndex;
      }
    });

    useTask$(async function onChangeTask({ track }) {
      track(() => selectedIndexSig.value);
      if (isBrowser && selectedIndexSig.value !== null) {
        await onChange$?.(optionsSig.value[selectedIndexSig.value].value);
      }
    });

    useTask$(function onOpenChangeTask({ track }) {
      track(() => isListboxOpenSig.value);
      if (isBrowser) {
        onOpenChange$?.(isListboxOpenSig.value);
      }
    });

    const context: SelectContext = {
      triggerRef,
      popoverRef,
      listboxRef,
      groupRef,
      optionsSig,
      localId,
      highlightedIndexSig,
      selectedIndexSig,
      isListboxOpenSig,
      scrollOptions,
      loop,
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
        aria-activedescendant={
          context.isListboxOpenSig.value
            ? getActiveDescendant(
                context.highlightedIndexSig.value ?? -1,
                context.optionsSig.value,
                context.localId,
              )
            : ''
        }
        {...rest}
      >
        <Slot />
        <HiddenSelect
          options={_options}
          name={name}
          required={required}
          disabled={disabled}
        />
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
