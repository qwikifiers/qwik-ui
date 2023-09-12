import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

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
    <div aria-hidden="true">
      <svg
        {...iconProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-width="2"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  ) : null;
});
