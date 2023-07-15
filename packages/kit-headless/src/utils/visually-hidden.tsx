import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

export const VisuallyHidden = component$(() => {
  useStylesScoped$(`
    .visually-hidden {
        display: inline-block;
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0px;
        border: 0px;
    }
`);

  return (
    <span class="visually-hidden">
      <Slot />
    </span>
  );
});
