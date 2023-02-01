import { component$, Slot } from '@builder.io/qwik';

interface BreadcrumbProps {
  class?: string;
  className?: string;
}

export const Breadcrumb = component$((props: BreadcrumbProps) => {
  return (
    <div class="text-sm breadcrumbs" {...props}>
      <ul>
        <Slot />
      </ul>
    </div>
  );
});
