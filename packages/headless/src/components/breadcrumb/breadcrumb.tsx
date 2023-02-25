import {
  component$,
  HTMLAttributes,
  Slot,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './breadcrumb.css?inline';

export type BreadcrumbProps = HTMLAttributes<HTMLElement>;

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  useStylesScoped$(styles);
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
