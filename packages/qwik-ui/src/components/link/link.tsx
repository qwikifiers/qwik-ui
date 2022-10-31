import {component$, Slot} from '@builder.io/qwik';

interface LinkProps {
  class?: string;
  className?: string;
  type?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'info' | 'warning' | 'error' | 'hover';
}

export const Link = component$(({ type = 'primary', ...props }: LinkProps) => {
  return (
    <a className={`link link-${type}`} {...props}><Slot /></a>
  );
});
