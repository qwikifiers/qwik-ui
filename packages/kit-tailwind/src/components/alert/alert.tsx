import { component$, Slot } from '@builder.io/qwik';

import { clsq } from '@qwik-ui/shared';
import { Button, ButtonProps } from '../button/button';
import { daisyConfig } from './daisy.config';

export interface TailwindAlertProps {
  class?: string;
  variant?: TailwindAlertVariants;
  size?: TailwindAlertSizes;
  rounding?: TailwindAlertRoundings;
  action?: TailwindAlertAction;
  title?: string;
}

export type TailwindAlertVariants = 'error' | 'warning' | 'info' | 'success';
export type TailwindAlertSizes = 'sm' | 'md' | 'lg';
export type TailwindAlertRoundings = 'sm' | 'md' | 'lg';
export interface TailwindAlertAction extends ButtonProps {
  label: string;
}

export const Alert = component$((props: TailwindAlertProps) => {
  const {
    variant = 'primary',
    size = 'md',
    rounding = 'md',
    class: classNames,
    action,
    title,
    ...rest
  } = props;
  const { variants, sizes, radius } = daisyConfig;

  return (
    <div
      {...rest}
      class={clsq(
        variants[variant],
        sizes[size],
        radius[rounding],
        'flex gap-4',
        classNames,
      )}
    >
      <Slot name="icon" />
      <div class="flex-1">
        {title ? <b>{title}</b> : null}
        <p>
          <Slot />
        </p>
      </div>
      {action ? (
        <Button variant={variant} size="xs" {...action}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
});
