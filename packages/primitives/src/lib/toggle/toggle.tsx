import { component$, useSignal, QwikIntrinsicElements } from '@builder.io/qwik';

export type ToggleProps = QwikIntrinsicElements['input'] & {
  disabled?: boolean;
  pressed?: boolean;
  defaultPressed?: boolean;
};

export const Toggle = component$<ToggleProps>(
  ({ pressed, defaultPressed = false, disabled, ...props }) => {
    const pressedState = useSignal(pressed || defaultPressed);

    return (
      <input
        type="checkbox"
        {...props}
        role="switch"
        aria-pressed={pressedState.value}
        data-state={pressedState.value ? 'on' : 'off'}
        data-disabled={disabled ? '' : undefined}
        checked={pressedState.value}
      />
    );
  },
);
