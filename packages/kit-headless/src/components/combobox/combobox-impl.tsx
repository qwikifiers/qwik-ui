import {
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import comboboxContextId, { ComboboxContext } from './combobox-context';
import { Opt } from './combobox-root';

export type InternalComboboboxRootProps = {
  /** Our source of truth for the options. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _options?: Opt[];

  /** When a value is passed, we check if it's an actual option value, and get its index at pre-render time.
   **/
  _valuePropIndex?: number | null;
};

export type ComboboxRootProps = PropsOf<'div'> & {
  /** The initial selected value (uncontrolled). */
  value?: string;

  /** A signal that controls the current selected value (controlled). */
  'bind:value'?: Signal<string>;

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
   * The name of the hidden select element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#name).
   */
  name?: string;

  /**
   * Specifies that the user must select a value before submitting the form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#required).
   */
  required?: boolean;

  /**
   * If `true`, prevents the user from interacting with the combobox.
   */
  disabled?: boolean;
};

export const ComboboxImpl = component$(
  (props: ComboboxRootProps & InternalComboboboxRootProps) => {
    const { onOpenChange$, ...rest } = props;

    // refs
    const rootRef = useSignal<HTMLElement | undefined>();
    const inputRef = useSignal<HTMLInputElement | undefined>();
    const popoverRef = useSignal<HTMLElement | undefined>();
    const triggerRef = useSignal<HTMLButtonElement | undefined>();

    // core state
    const isListboxOpenSig = useSignal<boolean>(false);

    onOpenChange$;

    const context: ComboboxContext = {
      rootRef,
      triggerRef,
      inputRef,
      popoverRef,
      isListboxOpenSig,
    };

    useContextProvider(comboboxContextId, context);

    return (
      <div ref={rootRef} {...rest}>
        <Slot />
      </div>
    );
  },
);
