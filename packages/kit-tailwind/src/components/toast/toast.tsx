import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { Toast as HeadlessToast } from '@qwik-ui/primitives';
import { OmitSignalClass } from '@qwik-ui/utils';
import { daisyConfig } from './daisy.config';

export type TailwindToastVariants = 'info' | 'success' | 'warning' | 'error';
export type TailwindToastProps = OmitSignalClass<QwikIntrinsicElements['div']> & {
  variant?: TailwindToastVariants;
  top?: boolean;
  end?: boolean;
  start?: boolean;
  middle?: boolean;
  bottom?: boolean;
  center?: boolean;
  label?: string;
};

export type ToastProps = TailwindToastProps;
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
        class={[
          'toast absolute',
          {
            [positions.top]: top,
            [positions.middle]: middle,
            [positions.center]: center,
            [positions.bottom]: bottom,
            [positions.end]: end,
            [positions.start]: start,
          },
          classNames,
        ]}
      >
        {/* @ts-expect-error ignore because deprecated */}
        <HeadlessToast label={label} class={['alert', variants[variant]]} {...rest} />
      </div>
    );
  },
);
