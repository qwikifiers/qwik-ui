import { component$, useSignal, QwikIntrinsicElements } from '@builder.io/qwik';

export type ToggleProps = {
  disabled?: boolean;
  pressed?: boolean;
  defaultPressed?: boolean;
} & QwikIntrinsicElements['input'];

export const Toggle = component$(
  ({
    onClick$,
    pressed,
    defaultPressed = false,
    disabled,
    ...toggleProps
  }: ToggleProps) => {
    const pressedState = useSignal(pressed || defaultPressed);

    // event handlers seem to break toggle when exported from qwik-ui primitive
    return (
      <input
        type="checkbox"
        role="switch"
        aria-pressed={pressedState.value}
        data-state={pressedState.value ? 'on' : 'off'}
        data-disabled={disabled ? '' : undefined}
        checked={pressedState.value}
        // onClick$={[
        //   () => {
        //     if (!disabled) {
        //       pressedState.value = !pressedState.value;
        //     }
        //   },
        //   onClick$,
        // ]}
        {...toggleProps}
      />
    );
  },
);
