import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';

interface ButtonGroupProps {
  class?: string;
  className?: string;
  vertical?: boolean;
}

export const ButtonGroup = component$(
  ({
    class: classProp = '',
    className = '',
    vertical,
    ...props
  }: ButtonGroupProps) => {
    const cssClass = cn(
      'btn-group',
      { 'btn-group-vertical': vertical },
      classProp,
      className
    );
    return (
      <div class={cssClass} aria-label="outlined button group" {...props}>
        <Slot />
      </div>
    );
  }
);
