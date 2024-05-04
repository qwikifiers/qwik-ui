import { PropsOf, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { Opt } from './select-inline';
import SelectContextId from './select-context';
import { isServer } from '@builder.io/qwik/build';
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
};

export type SelectDataProps = {
  options?: Opt[] | undefined;
};

export const HiddenNativeSelect = component$(
  (props: AriaHiddenSelectProps & SelectDataProps & PropsOf<'select'>) => {
    const { label, autoComplete, ref, ...rest } = props;
    const context = useContext(SelectContextId);

    // modular forms does something with refs, doesn't seem we need it, and it overrides the ref we define here.
    ref;

    const nativeSelectRef = useSignal<HTMLSelectElement>();

    useTask$(({ track }) => {
      track(() => context.selectedIndexesSig.value);

      if (isServer) return;

      const inputEvent = new Event('input', { bubbles: false });
      nativeSelectRef.value?.dispatchEvent(inputEvent);
    });

    // TODO: make conditional logic to show either input or select based on the size of the options.
    return (
      <VisuallyHidden>
        <div aria-hidden="true">
          <label>
            {label}
            <select
              ref={nativeSelectRef}
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
              {context.optionsSig.value?.map((opt: Opt) => (
                <option
                  value={opt.value}
                  selected={context.selectedIndexesSig.value.includes(opt.index - 1)}
                  key={opt.index}
                >
                  {opt.displayValue}
                </option>
              ))}
            </select>
          </label>
        </div>
      </VisuallyHidden>
    );
  },
);
