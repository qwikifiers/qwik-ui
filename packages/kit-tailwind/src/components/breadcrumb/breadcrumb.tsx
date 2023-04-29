import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Breadcrumb as HeadlessBreadcrumb } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

type BreadcrumbProps = HTMLAttributes<HTMLElement>;

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  const { class: classNames, ...rest } = props;

  return (
    <HeadlessBreadcrumb class={clsq('breadcrumbs ', classNames)} {...rest}>
      <ul>
        <Slot />
      </ul>
    </HeadlessBreadcrumb>
  );
});
