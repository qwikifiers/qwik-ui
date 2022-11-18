import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DividerProps extends WithClassesProp {
  label?: string;
  horizontal?: boolean;
}

export const Divider = component$(
  ({
    label,
    horizontal = false,
    class: classProp = '',
    className = '',
    ...props
  }: DividerProps) => {
    const cssClass = cn(
      'divider',
      {
        'divider-horizontal': horizontal,
        'divider-vertical': !horizontal,
      },
      classProp,
      className
    );
    return (
      <div className={cssClass} {...props}>
        {label}
      </div>
    );
  }
);
