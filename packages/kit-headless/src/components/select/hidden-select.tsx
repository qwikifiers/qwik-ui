import { PropsOf, component$, useContext, useSignal } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { HiddenSelectOption } from './hidden-select-option';
import { VisuallyHidden } from '../../utils/visually-hidden';

export type AriaHiddenSelectProps = {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: AutoFill;

  /** The text label for the select. */
  label?: string;

  /** HTML form input name. */
  name?: string;

  /** Sets the disabled state of the select and input. */
  disabled?: boolean;

  required?: boolean;

  // from modular forms
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: any;
};

export const HHiddenNativeSelect = component$(
  (props: AriaHiddenSelectProps & PropsOf<'select'>) => {
    const { label, autoComplete, ref, ...rest } = props;
    const context = useContext(SelectContextId);

    // modular forms does something with refs, doesn't seem we need it, and it overrides the ref we define here.
    const nativeSelectRef = useSignal<HTMLSelectElement>();

    // TODO: make conditional logic to show either input or select based on the size of the options.
    return (
      <VisuallyHidden>
        <div aria-hidden="true">
          <label>
            {label}
            <select
              ref={(element: HTMLSelectElement) => {
                nativeSelectRef.value = element;
                // @ts-expect-error modular forms ref function
                ref?.(element);
              }}
              multiple={context.multiple}
              tabIndex={-1}
              autocomplete={autoComplete}
              disabled={context.disabled}
              required={context.required}
              name={context.name}
              // height is determined by its children
              style={{ height: '1px' }}
              {...rest}
            >
              <option />
              {Array.from(context.itemsMapSig.value.entries()).map(([index, item]) => (
                <HiddenSelectOption
                  key={item.value}
                  value={item.value}
                  displayValue={item.displayValue}
                  nativeSelectRef={nativeSelectRef}
                  index={index}
                />
              ))}
            </select>
          </label>
        </div>
      </VisuallyHidden>
    );
  },
);
