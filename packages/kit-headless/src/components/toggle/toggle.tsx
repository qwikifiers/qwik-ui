import type { PropsOf, QRL } from '@builder.io/qwik';
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
   * Any additional props for the button
   */
  //   [key: string]: any;
};

export const HToggle = component$<ToggleProps>((props) => {
  const {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange$,
    ...buttonProps
  } = props;

  const pressedSig = useSignal<boolean>(defaultPressed);

  useTask$(({ track }) => {
    if (!pressedProp) return;
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
