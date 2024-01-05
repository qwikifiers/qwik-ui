import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import { VisuallyHidden } from '../../utils/visually-hidden';

type ComboboxIcon = {
  svg?: JSX.Element;
} & QwikIntrinsicElements['svg'];

export const ComboboxIcon = component$<ComboboxIcon>(({ svg, ...iconProps }) => {
  if (svg) {
    return (
      <div aria-hidden="true">
        <Slot />
      </div>
    );
  }

  return !svg ? (
    <div>
      <VisuallyHidden>Listbox Trigger Icon</VisuallyHidden>
      <svg
        {...iconProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-width="2"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  ) : null;
});
