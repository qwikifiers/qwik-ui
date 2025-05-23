import {
  component$,
  PropsOf,
  useContext,
  useId,
  $,
  useSignal,
  Slot,
} from '@builder.io/qwik';
import { SwitchContext } from './switch-context';

export interface SwitchInputProps extends PropsOf<'input'> {
  thumbClassName?: string;
}

export const SwitchInput = component$<SwitchInputProps>((props) => {
  const context = useContext(SwitchContext);
  const switchRef = useSignal<HTMLInputElement | undefined>();
  const id = useId();

  const handleClick$ = $(() => {
    if (context.disabled?.value) {
      return;
    }
    context.bindChecked.value = !context.bindChecked.value;
  });

  return (
    <div
      data-switch-track
      preventdefault:click
      preventdefault:change
      preventdefault:keypress
      onChange$={[handleClick$, context?.onChange$, props.onChange$]}
      onKeyPress$={[context?.onKeyPress$, props.onKeyPress$]}
      onClick$={[handleClick$, context?.onClick$, props.onClick$]}
    >
      <input
        {...props}
        aria-label={'switch'}
        data-checked={context.bindChecked?.value ? 'true' : 'false'}
        data-disabled={context.disabled?.value ? 'true' : 'false'}
        ref={context.switchRef || switchRef}
        aria-describedby={`${id}-switch`}
        disabled={context.disabled?.value}
        aria-checked={context.bindChecked?.value ? 'true' : 'false'}
        bind:checked={context.bindChecked}
        checked={context.bindChecked?.value}
        type="checkbox"
        role="switch"
        data-qui-switch-input
        autoFocus={context.autoFocus?.value}
      />
      <Slot />
    </div>
  );
});

export interface SwitchThumbProps {
  className?: string;
}

export const SwitchThumb = component$<SwitchThumbProps>(({ className }) => {
  return <span data-switch-thumb class={className}></span>;
});
