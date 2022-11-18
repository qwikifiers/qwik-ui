import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface StepProps extends WithClassesProp {
  isPrimary?: boolean;
  dataContent?: string;
}

export const Step = component$(
  ({
    isPrimary = false,
    dataContent,
    class: classProp = '',
    className = '',
    ...props
  }: StepProps) => {
    const cssClass = cn(
      'step',
      { 'step-primary': isPrimary },
      classProp,
      className
    );
    return (
      <li data-content={dataContent} className={cssClass} {...props}>
        <Slot />
      </li>
    );
  }
);
