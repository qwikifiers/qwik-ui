import { component$, PropsOf, Slot } from '@builder.io/qwik';

type HeadingUnion = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type AccordionHeaderProps = PropsOf<HeadingUnion> & {
  as?: HeadingUnion;
};

export const HAccordionHeader = component$(
  ({ as = 'h3', ...props }: AccordionHeaderProps) => {
    const PolymorphicHeading = as;

    return (
      <PolymorphicHeading {...props}>
        <Slot />
      </PolymorphicHeading>
    );
  },
);
