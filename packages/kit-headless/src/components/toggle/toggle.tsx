import type { PropsOf, QRL, Signal } from '@builder.io/qwik';
import { $, component$, Slot, useSignal, useTask$ } from '@builder.io/qwik';

export type ToggleProps = PropsOf<'button'> & {
  /**
   * The controlled state of the toggle.
   */
  disabled?: boolean;
  pressed?: boolean;
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean;
  /**
   * The callback that fires when the state of the toggle changes.
   */
  onPressedChange$?: QRL<(pressed: boolean) => void>;
  /**
   * Controlling the pressed state with a bounded value.
   */
  'bind:pressed'?: Signal<boolean>;
  /**
   * Reference to the button element.
   */
  // ref?: Signal<Element | undefined>;
  /**
   * Any additional props for the button
   */
  // [key: string]: unknown;
};

export const HToggle = component$<ToggleProps>((props) => {
  const {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange$,
    // 'bind:pressed': givenValueSig,
    ...buttonProps
  } = props;

  // const pressedSig = useBoundSignal(givenValueSig, defaultPressed);

  const pressedSig = useSignal<boolean>(defaultPressed);

  useTask$(({ track }) => {
    if (pressedProp === undefined) return;
    track(() => pressedProp);
    pressedSig.value = pressedProp;
  });

  const handleClick$ = $(() => {
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
      {...buttonProps}
      class={props.class}
      onClick$={[props.onClick$, handleClick$]}
    >
      <Slot />
    </button>
  );
});
