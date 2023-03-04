import { component$ } from '@builder.io/qwik';
import { Toast as HeadlessToast } from '@qwik-ui/primitives';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type DaisyToastVariants = 'info' | 'success' | 'warning' | 'error';
export type DaisyToastProps = {
  variant?: DaisyToastVariants;
  top?: boolean;
  end?: boolean;
  start?: boolean;
  middle?: boolean;
  bottom?: boolean;
  center?: boolean;
  class?: string;
  label?: string;
};

export type ToastProps = DaisyToastProps;
export const Toast = component$(
  ({
    class: classNames,
    label = 'New message',
    variant = 'info',
    top,
    start,
    center,
    end,
    middle,
    bottom,
    ...rest
  }: ToastProps) => {
    const { variants, positions } = daisyConfig;

    return (
      <div
        class={clsq(
          'toast absolute',
          {
            [positions.top]: top,
            [positions.middle]: middle,
            [positions.center]: center,
            [positions.bottom]: bottom,
            [positions.end]: end,
            [positions.start]: start,
          },
          classNames
        )}
      >
        <HeadlessToast
          label={label}
          class={clsq('alert', variants[variant])}
          {...rest}
        />
      </div>
    );
  }
);
