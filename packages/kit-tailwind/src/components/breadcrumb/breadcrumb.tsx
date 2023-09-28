import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Breadcrumb as HeadlessBreadcrumb } from '@qwik-ui/headless';

type BreadcrumbProps = QwikIntrinsicElements['div'];

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  const { class: classNames, ...rest } = props;

  return (
    <HeadlessBreadcrumb class={`breadcrumbs ${classNames}`} {...rest}>
      <ul>
        <Slot />
      </ul>
    </HeadlessBreadcrumb>
  );
});
