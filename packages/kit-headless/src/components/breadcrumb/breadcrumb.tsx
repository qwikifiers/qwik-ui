import { component$, PropsOf, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './breadcrumb.css?inline';

export type BreadcrumbProps = PropsOf<'div'>;

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  useStylesScoped$(styles);

  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
