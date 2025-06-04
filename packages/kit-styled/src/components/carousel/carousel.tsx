import {
  useContext,
  component$,
  createContextId,
  PropsOf,
  Slot,
  useContextProvider,
  Signal,
} from '@builder.io/qwik';

import { Carousel as HCarousel } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { buttonVariants } from '../button/button';
import { VariantProps } from 'class-variance-authority';
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
} from '@qwikest/icons/lucide';

const styledCarouselContextId = createContextId<{
  orientation: 'horizontal' | 'vertical';
  progress?: Signal<number>;
}>('styled-carousel-context');

const Provider = component$<{
  orientation?: 'horizontal' | 'vertical';
}>(({ orientation = 'horizontal' }) => {
  const context = {
    orientation,
  };

  useContextProvider(styledCarouselContextId, context);
  return <Slot />;
});

const Root = ({
  orientation = 'horizontal',
  ...props
}: PropsOf<typeof HCarousel.Root> & {
  orientation?: 'horizontal' | 'vertical';
  progress?: Signal<number>;
}) => {
  return (
    <Provider orientation={orientation}>
      <HCarousel.Root
        {...props}
        orientation={orientation}
        slideComponent={Slide}
        bulletComponent={Bullet}
        titleComponent={Title}
        stepComponent={Step}
        class={cn('relative', props.class)}
      >
        {props.children}
      </HCarousel.Root>
    </Provider>
  );
};

const Scroller = component$<PropsOf<typeof HCarousel.Scroller>>(({ ...props }) => {
  const context = useContext(styledCarouselContextId);

  return (
    <HCarousel.Scroller
      {...props}
      class={cn('flex', context.orientation === 'horizontal' ? '-ml-4' : '-mt-4')}
    >
      <Slot />
    </HCarousel.Scroller>
  );
});

const Slide = component$<PropsOf<typeof HCarousel.Slide>>(({ ...props }) => {
  const context = useContext(styledCarouselContextId);
  return (
    <HCarousel.Slide
      {...props}
      class={cn(context.orientation === 'horizontal' ? 'pl-4' : 'pt-4')}
    >
      <Slot />
    </HCarousel.Slide>
  );
});

const Previous = component$<
  PropsOf<typeof HCarousel.Previous> & VariantProps<typeof buttonVariants>
>(({ look = 'ghost', size = 'icon', ...props }) => {
  const context = useContext(styledCarouselContextId);
  return (
    <div
      class={cn(
        'absolute',
        context.orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 right-1/2 translate-x-1/2',
      )}
    >
      <HCarousel.Previous
        {...props}
        class={cn(buttonVariants({ look, size }), 'group rounded-full', props.class)}
      >
        <div
          class={cn(
            context.orientation === 'horizontal'
              ? 'group-hover:-translate-x-px'
              : 'group-hover:-translate-y-px',
            'group-hover:transition-all group-hover:duration-300',
          )}
        >
          {context.orientation === 'horizontal' ? (
            <LuChevronLeft class="size-10" />
          ) : (
            <LuChevronUp class="size-10" />
          )}
        </div>
      </HCarousel.Previous>
    </div>
  );
});

const Next = component$<
  PropsOf<typeof HCarousel.Next> & VariantProps<typeof buttonVariants>
>(({ look = 'ghost', size = 'icon', ...props }) => {
  const context = useContext(styledCarouselContextId);
  return (
    <div
      class={cn(
        'absolute',
        context.orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 right-1/2 translate-x-1/2',
      )}
    >
      {/* moves content to the right on hover */}
      <HCarousel.Next
        {...props}
        class={cn(buttonVariants({ look, size }), 'group rounded-full', props.class)}
      >
        <div
          class={cn(
            context.orientation === 'horizontal'
              ? 'group-hover:translate-x-px'
              : 'group-hover:translate-y-px',
            'group-hover:transition-all group-hover:duration-300',
          )}
        >
          {context.orientation === 'horizontal' ? (
            <LuChevronRight class="size-10" />
          ) : (
            <LuChevronDown class="size-10" />
          )}
        </div>
      </HCarousel.Next>
    </div>
  );
});

const Pagination = component$<PropsOf<typeof HCarousel.Pagination>>(({ ...props }) => {
  return (
    <HCarousel.Pagination
      {...props}
      class={cn('absolute -bottom-10 flex w-full justify-center gap-4', props.class)}
    >
      <Slot />
    </HCarousel.Pagination>
  );
});

const Bullet = component$<PropsOf<typeof HCarousel.Bullet>>((props) => {
  return (
    <HCarousel.Bullet
      {...props}
      class={cn(
        'size-5 rounded-full border border-background bg-muted outline-0 outline-muted transition-all duration-300 ease-in-out hover:border-muted',
        'data-[active]:border-primary data-[active]:bg-primary data-[active]:text-primary-foreground',
        props.class,
      )}
    />
  );
});

const Title = component$<PropsOf<typeof HCarousel.Title>>((props) => {
  return (
    <HCarousel.Title {...props}>
      <Slot />
    </HCarousel.Title>
  );
});

const Stepper = (props: PropsOf<typeof HCarousel.Stepper>) => {
  return (
    <HCarousel.Stepper
      {...props}
      class={cn('flex w-full items-center justify-between', props.class)}
    >
      {props.children}
    </HCarousel.Stepper>
  );
};

const Step = component$<PropsOf<typeof HCarousel.Step>>((props) => {
  return (
    <HCarousel.Step
      {...props}
      class={cn(
        'flex items-center gap-1 [&[data-current]_span:first-child]:outline-2 [&[data-current]_span:first-child]:outline-offset-[-2px] [&[data-current]_span:first-child]:outline-primary',
        props.class,
      )}
    >
      <Slot />
    </HCarousel.Step>
  );
});

export const Carousel = {
  Root,
  Scroller,
  Slide,
  Previous,
  Next,
  Pagination,
  Bullet,
  Title,
  Stepper,
  Step,
};
