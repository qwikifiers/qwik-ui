import { PropsOf, Slot, component$, useContext, $, sync$ } from '@builder.io/qwik';
import SelectContextId from './select-context';

export const SelectLabel = component$((props: PropsOf<'div'>) => {
  const context = useContext(SelectContextId);
  const labelId = `${context.localId}-label`;

  const handleClick$ = $(() => {
    if (context.disabled) return;

    context.triggerRef.value?.focus();
  });

  const handleMouseDownSync$ = sync$((e: MouseEvent) => {
    if (!e.defaultPrevented && e.detail > 1) e.preventDefault();
  });

  return (
    <div
      data-disabled={context.disabled ? '' : undefined}
      ref={context.labelRef}
      id={labelId}
      onClick$={[handleClick$, props.onClick$]}
      onMouseDown$={[handleMouseDownSync$, props.onMouseDown$]}
      {...props}
    >
      <Slot />
    </div>
  );
});
