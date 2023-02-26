import { component$, Slot } from '@builder.io/qwik';
import { Alert as HeadlessAlert, HeadlessAlertProps } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';
import { Button, ButtonProps } from '@qwik-ui/theme-daisy';
import { daisyConfig } from './daisy.config';

export interface DaisyAlertProps extends HeadlessAlertProps {
  variant?: DaisyAlertVariants;
  size?: DaisyAlertSizes;
  rounding?: DaisyAlertRoundings;
  action?: DaisyAlertAction;
  title?: string;
}

export type DaisyAlertVariants = 'error' | 'warning' | 'info' | 'success';
export type DaisyAlertSizes = 'sm' | 'md' | 'lg';
export type DaisyAlertRoundings = 'sm' | 'md' | 'lg';
export interface DaisyAlertAction extends ButtonProps {
  label: string;
}

export const Alert = component$((props: DaisyAlertProps) => {
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
    <HeadlessAlert
      {...rest}
      class={clsq(
        variants[variant],
        sizes[size],
        radius[rounding],
        'flex gap-4',
        classNames
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
    </HeadlessAlert>
  );
});
