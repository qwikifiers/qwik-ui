import { PropsOf, Slot, component$, sync$, $ } from '@qwik.dev/core';

type LabelProps = PropsOf<'label'>;

export const HLabel = component$<LabelProps>((props) => {
  const handleMouseDownSync$ = sync$((event: MouseEvent) => {
    if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
  });

  const handleMouseDown$ = $((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button, input, select, textarea')) return;
  });

  return (
    <label
      {...props}
      onMouseDown$={[handleMouseDownSync$, handleMouseDown$, props.onMouseDown$]}
    >
      <Slot />
    </label>
  );
});
