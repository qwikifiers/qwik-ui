import { PropsOf, Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

export const VisuallyHidden = component$((props: PropsOf<'span'>) => {
  /* Visually hide text while keeping it accessible */
  /* Source: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
  useStylesScoped$(`
  
  .visually-hidden:not(:focus):not(:active) {
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`);

  return (
    <span class="visually-hidden" {...props}>
      <Slot />
    </span>
  );
});
