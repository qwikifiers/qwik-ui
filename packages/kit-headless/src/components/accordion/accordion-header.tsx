import { QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';

type HeadingUnion = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type AccordionHeaderProps = QwikIntrinsicElements[HeadingUnion] & {
  as: HeadingUnion;
};

export const AccordionHeader = component$(
  ({ as, ...props }: AccordionHeaderProps) => {
    const PolymorphicHeading = as;

    return (
      <PolymorphicHeading {...props}>
        <Slot />
      </PolymorphicHeading>
    );
  }
);
