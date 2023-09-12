import { component$, HTMLAttributes, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './breadcrumb-item.css?inline';

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLElement> {
  divider?: string;
}

export const BreadcrumbItem = component$((props: BreadcrumbItemProps) => {
  const { style, ...rest } = props;

  useStylesScoped$(styles);

  return (
    <div style={`--breadcrumb-divider: "${props.divider || '/'}" ${style}}`} {...rest}>
      <Slot />
    </div>
  );
});
