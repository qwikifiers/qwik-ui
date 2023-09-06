import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

type ComboboxIcon = {
  svg?: HTMLOrSVGElement;
} & QwikIntrinsicElements['svg'];

export const ComboboxIcon = component$<ComboboxIcon>(({ svg, ...iconProps }) => {
  if (svg) {
    return (
      <span aria-hidden="true">
        <Slot />
      </span>
    );
  }

  return !svg ? (
    <span aria-hidden="true">
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
    </span>
  ) : null;
});
