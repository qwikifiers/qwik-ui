import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';

interface AlertProps {
  class?: string;
  className?: string;
}

export const Alert = component$((props: AlertProps) => {
  const cssClass = cn('alert', props.class, props.className);

  return (
    <div class={cssClass}>
      <Slot />
    </div>
  );
});
