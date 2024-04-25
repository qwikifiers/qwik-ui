/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/5c1920e50d4b2b80c826ca91aff55c97350bf9f9/packages/@react-aria/select/src/HiddenSelect.tsx
 */

import { component$, useContext } from '@builder.io/qwik';
import { Opt } from './select-inline';
import SelectContextId from './select-context';
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
  options: Opt[] | undefined;
};

export const HiddenSelect = component$(
  (props: AriaHiddenSelectProps & SelectDataProps) => {
    const { label, options, autoComplete, name, required, disabled } = props;
    const context = useContext(SelectContextId);

    // TODO: make conditional logic to show either input or select based on the size of the options.
    return (
      <VisuallyHidden>
        <div aria-hidden="true">
          <label>
            {label}
            <select
              tabIndex={-1}
              autocomplete={autoComplete}
              disabled={disabled}
              required={required}
              name={name}
            >
              <option />
              {options?.map((opt: Opt) => (
                <option
                  value={opt.value}
                  selected={context.selectedIndexesSig.value.includes(opt.index)}
                  key={opt.value}
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
