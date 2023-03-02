import {
  component$,
  PropFunction,
  QwikMouseEvent,
  useSignal,
} from '@builder.io/qwik';

export interface ToggleProps {
  disabled?: boolean;
  /**
   * The controlled state of the toggle.
   */
  pressed?: boolean;
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean;

  onClick$: PropFunction<(evt: QwikMouseEvent) => void>;
}

export const Toggle = component$((props: ToggleProps) => {
  const {
    pressed: pressedProp,
    defaultPressed = false,
    onClick$,
    disabled,
    ...toggleProps
  } = props;

  const pressedState = useSignal(pressedProp || defaultPressed);

  return (
    <input
      type="checkbox"
      role="switch"
      aria-pressed={pressedState.value}
      data-state={pressedState.value ? 'on' : 'off'}
      data-disabled={disabled ? '' : undefined}
      checked={pressedState.value}
      onClick$={(event: QwikMouseEvent<HTMLInputElement>) => {
        if (!disabled) {
          pressedState.value = !pressedState.value;
          if (onClick$) {
            // REPORT MISSING QwikMouseEvent to Qwik github
            onClick$(event);
          }
        }
      }}
      {...toggleProps}
    />
  );
});
