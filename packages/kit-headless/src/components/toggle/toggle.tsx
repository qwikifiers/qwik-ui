import type { PropsOf, QRL, Signal } from '@builder.io/qwik';
import { $, component$, Slot, sync$, useTask$ } from '@builder.io/qwik';
import { useBoundSignal } from '../../utils/bound-signal';

export type ToggleProps = PropsOf<'button'> & {
  /**
   * When true, prevents the user from interacting with the toggle group and all its items.
   */
  disabled?: boolean;
  /**
   * The initial value of the toggle.
   * Can be used in conjunction with `onPressedChange` to have more control.
   */
  pressed?: boolean;
  /**
   * The callback that fires when the state of the toggle changes.
   */
  onPressedChange$?: QRL<(pressed: boolean) => void>;
  /**
   * The reactive value (a signal) of the toggle (the signal is the controlled value).
   * Controlling the pressed state with a bounded value.
   */
  'bind:pressed'?: Signal<boolean>;
};

export const HToggle = component$<ToggleProps>((props) => {
  const {
    pressed: pressedProp,
    onPressedChange$,
    'bind:pressed': givenValueSig,
    ...buttonProps
  } = props;

  const pressedSig = useBoundSignal(givenValueSig, pressedProp ? pressedProp : false);

  const handleKeyDownSync$ = sync$((event: KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;

    event.preventDefault();
  });

  useTask$(async ({ track }) => {
    if (pressedProp === undefined) return;
    track(() => pressedProp);
    pressedSig.value = pressedProp;
  });

  const handleClick$ = $(async () => {
    if (!props.disabled) {
      pressedSig.value = !pressedSig.value;
      if (onPressedChange$) {
        onPressedChange$(pressedSig.value);
      }
    }
  });

  return (
    <button
      type="button"
      aria-pressed={pressedSig.value}
      aria-disabled={props.disabled ? true : false}
      data-disabled={props.disabled ? '' : undefined}
      onKeyDown$={[handleKeyDownSync$, props.onKeyDown$]}
      {...buttonProps}
      class={props.class}
      onClick$={[props.onClick$, handleClick$]}
    >
      <Slot />
    </button>
  );
});
