/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/5c1920e50d4b2b80c826ca91aff55c97350bf9f9/packages/@react-aria/select/src/HiddenSelect.tsx
 */

import { PropsOf, component$ } from '@builder.io/qwik';

export interface AriaHiddenSelectProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;

  /** The text label for the select. */
  label?: PropsOf<'label'>;

  /** HTML form input name. */
  name?: string;

  /** Sets the disabled state of the select and input. */
  disabled?: boolean;
}

// export function useHiddenSelect(props: AriaHiddenSelectProps) {
//   const { autoComplete, name, disabled } = props;
// }

export const HiddenSelect = component$((props: AriaHiddenSelectProps) => {
  const { name, disabled } = props;

  return (
    <>
      <div>
        <input />
      </div>
      {name && <input type="hidden" name={name} disabled={disabled} />}
    </>
  );
});
