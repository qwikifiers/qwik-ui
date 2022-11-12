import { component$, Slot } from '@builder.io/qwik';

interface AlertProps {
  class?: string;
  className?: string;
}

export const Alert = component$((props: AlertProps) => {
  const cssClass = `alert ${props.class ? props.class : ''} ${
    props.className ? props.className : ''
  }`;

  return (
    <div class={cssClass}>
      <Slot />
    </div>
  );
});
