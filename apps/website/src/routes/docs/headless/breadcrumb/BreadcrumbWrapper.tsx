import { component$, HTMLAttributes, Slot, useStyles$ } from '@builder.io/qwik';
import style from './BreadcrumbWrapper.css?inline';

interface BreadcrumbWrapperProps extends HTMLAttributes<HTMLElement> {
  title?: string;
}

export default component$(({ title, ...rest }: BreadcrumbWrapperProps) => {
  useStyles$(style);

  return (
    <div {...rest}>
      {title && <h1 class="wrapper__title">{title}</h1>}
      <div class="wrapper__content">
        <Slot />
      </div>
    </div>
  );
});
