import { component$ } from '@builder.io/qwik';
import cn from 'classnames';

interface BreadcrumbItemProps {
  class?: string;
  className?: string;
  navigationUrl?: string;
  label?: string;
}

export const BreadcrumbItem = component$(
  ({
    navigationUrl,
    label,
    class: classProp = '',
    className = '',
    ...props
  }: BreadcrumbItemProps) => {
    const cssClass = cn(classProp, className);
    return (
      <li>
        <a class={cssClass} href={navigationUrl} {...props}>
          {label}
        </a>
      </li>
    );
  }
);
