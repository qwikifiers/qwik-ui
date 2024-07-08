import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuChevronRight } from '@qwikest/icons/lucide';

export type BreadcrumbProps = PropsOf<'nav'>;
const Root = component$<BreadcrumbProps>(() => {
  return (
    <nav aria-label="breadcrumb">
      <Slot />
    </nav>
  );
});

const List = component$<PropsOf<'ol'>>((props) => {
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

const Item = component$<PropsOf<'li'>>((props) => {
  return (
    <li class={cn('inline-flex items-center gap-1.5', props.class)} {...props}>
      <Slot />
    </li>
  );
});

const Link = component$<PropsOf<'a'> & { asChild?: boolean }>((props) => {
  const Comp = props.asChild ? Slot : 'a';
  return (
    <Comp
      class={cn(
        'text-muted-foreground transition-colors hover:text-foreground',
        props.class,
      )}
      {...props}
    >
      {!props.asChild && <Slot />}
    </Comp>
  );
});

const Separator = component$<PropsOf<'li'>>((props) => {
  return (
    <li role="presentation" aria-hidden="true" {...props}>
      <LuChevronRight class="size-3.5 stroke-muted-foreground stroke-2" />
    </li>
  );
});

const Page = component$<PropsOf<'span'>>((props) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn('font-normal text-foreground', props.class)}
      {...props}
    >
      <Slot />
    </span>
  );
});

export const Breadcrumb = { Root, List, Item, Link, Separator, Page };
