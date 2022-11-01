import {component$, Slot} from '@builder.io/qwik';
import {ColorTypes} from "../../types/types";

interface LinkProps {
  class?: string;
  className?: string;
  type?: ColorTypes | 'neutral' | 'hover';
}

export const Link = component$(({ type = 'primary', ...props }: LinkProps) => {
  return (
    <a className={`link link-${type}`} {...props}><Slot /></a>
  );
});
