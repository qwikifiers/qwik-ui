import {
  component$,
  HTMLAttributes,
  Slot,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './breadcrumb-item.css?inline';
import { clsq } from '@qwik-ui/shared';

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLElement> {
  divider?: string;
}

export const BreadcrumbItem = component$((props: BreadcrumbItemProps) => {
  const { style, ...rest } = props;

  useStylesScoped$(styles);

  return (
    <div
      style={clsq(`--breadcrumb-divider: "${props.divider || '/'}"`, style)}
      {...rest}
    >
      <Slot />
    </div>
  );
});
