import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';

interface BreadcrumbProps {
  class?: string;
  className?: string;
}

export const Breadcrumb = component$(
  ({ class: classProp = '', className = '', ...props }: BreadcrumbProps) => {
    const cssClass = cn('text-sm', 'breadcrumbs', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <ul>
          <Slot />
        </ul>
      </div>
    );
  }
);
