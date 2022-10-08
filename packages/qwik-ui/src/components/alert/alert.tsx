import { component$, Slot } from '@builder.io/qwik';

interface AlertProps {
  class?: string;
  className?: string;
} 

export const Alert = component$((props: AlertProps) => {

  return (
    <div class="alert" {...props}><Slot/></div>
  );
});
