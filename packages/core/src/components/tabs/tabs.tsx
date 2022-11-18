import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface TabsProps extends WithClassesProp {
  boxed?: boolean;
}

export const Tabs = component$(
  ({
    boxed = false,
    class: classProp = '',
    className = '',
    ...props
  }: TabsProps) => {
    const cssClass = cn('tabs', { 'tabs-boxed': boxed }, classProp, className);
    return (
      <div class={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
