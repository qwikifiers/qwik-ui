import { component$, PropsOf, sync$, useContext, useId, $, useSignal } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'> & {thumbClassName?: string}>((rest) => {
  const context = useContext(SwitchContext);
  const switchRef = useSignal<HTMLInputElement | undefined>();
  const id = useId();

  if (context.autoFocus && !context.switchRef?.value) {
    context.switchRef?.value?.focus();
  }

  const handleClick$ = $((e: MouseEvent | KeyboardEvent) => {
    if (context.disabled) {
      return;
    }
    const keys = ['Enter', ' '];
    if (
      (e as KeyboardEvent)?.key !== undefined &&
      !keys.includes((e as KeyboardEvent).code)
    ) {
      return;
    }
    // keycode

    context.switchRef?.value?.focus();
    context.bindChecked.value = !context.bindChecked.value;
    if (context.onChange$) {
      context.onChange$(context.bindChecked.value, e);
    }

    if (context.onClick$) {
      context.onClick$(context.bindChecked.value, e);
    }
  });
  const handleClickSync$ = sync$((e: MouseEvent) => {
    e.preventDefault();
  });

  const handleKeyPressSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['Enter', ' '];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  });

  return (
    <div
      data-switch-track
      onChange$={[handleClickSync$, handleClick$]}
      onKeyPress$={[handleClick$, handleKeyPressSync$]}
      onClick$={[handleClickSync$, handleClick$]}
    >
      <input
        {...rest}
        aria-label={'switch'}
        data-checked={context.bindChecked?.value ? 'true' : 'false'}
        data-disabled={context.disabled ? 'true' : 'false'}
        ref={context.switchRef || switchRef}
        aria-describedby={`${id}-switch`}
        disabled={context.disabled}
        aria-checked={context.bindChecked?.value ? 'true' : 'false'}
        bind:checked={context.bindChecked}
        checked={context.bindChecked?.value}
        type="checkbox"
        role="switch"
        data-value
        />
      <span data-switch-thumb class={rest.thumbClassName}></span>
    </div>
  );
});
