import { PropsOf, Signal, type QRL } from '@builder.io/qwik';
export type TItemsMap = Map<
  number,
  {
    value: string;
    displayValue: string;
    disabled: boolean;
  }
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
  | {
      multiple: true;
      value?: never;
    }
  | {
      multiple?: false;
      value?: string;
    };
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
export {};
