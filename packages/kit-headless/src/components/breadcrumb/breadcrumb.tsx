import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './breadcrumb.css?inline';

export type BreadcrumbProps = QwikIntrinsicElements['div'];

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  useStylesScoped$(styles);

  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
