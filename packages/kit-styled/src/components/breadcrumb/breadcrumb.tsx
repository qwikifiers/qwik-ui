import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuChevronRight } from '@qwikest/icons/lucide';

export type BreadcrumbProps = PropsOf<'nav'>;
const Breadcrumb = component$<BreadcrumbProps>(() => {
  return (
    <nav aria-label="breadcrumb">
      <Slot />
    </nav>
  );
});

type BreadcrumbListProps = PropsOf<'ol'>;
const BreadcrumbList = component$<BreadcrumbListProps>((props) => {
  return (
    <ol
      class={cn(
        ' flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
        props.class,
      )}
      {...props}
    >
      <Slot />
    </ol>
  );
});

type BreadcrumbItemProps = PropsOf<'li'>;
const BreadcrumbItem = component$<BreadcrumbItemProps>((props) => {
  return (
    <li class={cn('inline-flex items-center gap-1.5', props.class)} {...props}>
      <Slot />
    </li>
  );
});

type BreadcrumbLinkProps = PropsOf<'a'> & { asChild?: boolean };
const BreadcrumbLink = component$<BreadcrumbLinkProps>((props) => {
  const Comp = props.asChild ? Slot : 'a';
  return (
    <Comp
      class={cn(
        'text-muted-foreground hover:text-foreground transition-colors',
        props.class,
      )}
      {...props}
    >
      {!props.asChild && <Slot />}
    </Comp>
  );
});

type BreadcrumbSeparatorProps = PropsOf<'li'>;
const BreadcrumbSeparator = component$<BreadcrumbSeparatorProps>((props) => {
  return (
    <li role="presentation" aria-hidden="true" {...props}>
      <LuChevronRight class="stroke-muted-foreground size-3.5 stroke-2" />
    </li>
  );
});

type BreadcrumbPageProps = PropsOf<'span'>;
const BreadcrumbPage = component$<BreadcrumbPageProps>((props) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn('text-foreground font-normal', props.class)}
      {...props}
    >
      <Slot />
    </span>
  );
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
};
