import { component$, PropsOf, Slot, useStyles$ } from '@builder.io/qwik';
import style from './BreadcrumbWrapper.css?inline';

type BreadcrumbWrapperProps = PropsOf<'div'> & {
  title?: string;
};

export const BreadcrumWrapper = component$(
  ({ title, ...rest }: BreadcrumbWrapperProps) => {
    useStyles$(style);

    return (
      <div {...rest}>
        {title && <h1 class="wrapper__title">{title}</h1>}
        <div class="wrapper__content">
          <Slot />
        </div>
      </div>
    );
  },
);
