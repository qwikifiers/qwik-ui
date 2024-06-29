import { PropsOf, component$, useContext, useSignal } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { VisuallyHidden } from '../../utils/visually-hidden';
import { ComboboxHiddenSelectOption } from './combobox-hidden-option';

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
};

export const HiddenNativeSelect = component$(
  (props: AriaHiddenSelectProps & PropsOf<'select'>) => {
    const { label, autoComplete, ref, ...rest } = props;
    const context = useContext(comboboxContextId);

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
              onFocus$={() => {
                // override modular forms focus event
                context.inputRef.value?.focus();
                return;
              }}
              multiple={context.multiple}
              tabIndex={-1}
              autocomplete={autoComplete}
              disabled={context.isDisabledSig.value ? true : undefined}
              required={context.required}
              name={context.name}
              // height is determined by its children
              style={{ height: '1px' }}
              {...rest}
            >
              <option />
              {Array.from(context.itemsMapSig.value.entries()).map(([index, item]) => (
                <ComboboxHiddenSelectOption
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
