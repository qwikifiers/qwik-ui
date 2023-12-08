import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { BreadcrumbItem as HeadlessBreadcrumbItem } from '@qwik-ui/headless';

type BreadcrumbProps = HTMLAttributes<HTMLElement>;

export const BreadcrumbItem = component$((props: BreadcrumbProps) => {
  return (
    <li>
      {/* @ts-expect-error ignore because deprecated */}
      <HeadlessBreadcrumbItem {...props}>
        <Slot />
      </HeadlessBreadcrumbItem>
    </li>
  );
});
