import {component$, Slot} from '@builder.io/qwik';

interface StackProps {
  class?: string;
  className?: string;
}

export const Stack = component$((props: StackProps) => {
  return (
    <a className="stack" {...props}><Slot /></a>
  );
});
