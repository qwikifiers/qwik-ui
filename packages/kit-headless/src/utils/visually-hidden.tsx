import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

export const VisuallyHidden = component$(() => {
  /* Visually hide text while keeping it accessible */
  /* Source: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
  useStylesScoped$(`
  
  .visually-hidden:not(:focus):not(:active) {
      /* shrink to a 1px square */
      width: 1px;
      height: 1px;
  
      /* hide any resulting overflow */
      overflow: hidden;
  
      /* clip the element to remove any visual trace */
      clip: rect(0 0 0 0); /* for IE only */
      clip-path: inset(50%);
  
      /* remove from page flow so it doesn't affect surrounding layout */
      position: absolute;
  
      /* ensure proper text announcement by screen readers */
      white-space: nowrap;  
  }
`);

  return (
    <span class="visually-hidden">
      <Slot />
    </span>
  );
});
