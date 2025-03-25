import { component$, PropsOf, sync$, useContext, useId, $, useSignal } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'> & {thumbClassName?: string}>((rest) => {
  const context = useContext(SwitchContext);
  const switchRef = useSignal<HTMLInputElement | undefined>();
  const id = useId();

  const handleClick$ = $(() => {
    if (context.disabled) {
      return;
    }
    context.bindChecked.value = !context.bindChecked.value;
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
      preventdefault:click
      preventdefault:change
      preventdefault:keypress
      onChange$={[handleClick$, context?.onChange$]}
      onKeyPress$={[handleKeyPressSync$, context?.onKeyPress$]}
      onClick$={[handleClick$, context?.onClick$]}
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
        data-qui-switch-input
        autoFocus={context.autoFocus}
        />
      <span data-switch-thumb class={rest.thumbClassName}></span>
    </div>
  );
});
