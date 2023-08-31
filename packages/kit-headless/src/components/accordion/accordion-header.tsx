import {
  component$,
  Slot,
  useContext,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import { accordionItemContextId } from './accordion-context-id';

type HeadingUnion = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type AccordionHeaderProps = QwikIntrinsicElements[HeadingUnion] & {
  as?: HeadingUnion;
};

export const AccordionHeader = component$(
  ({ as = 'h3', ...props }: AccordionHeaderProps) => {
    const itemContext = useContext(accordionItemContextId);
    const itemId = itemContext.itemId;
    const headerId = `${itemId}-header`;

    const PolymorphicHeading = as;

    return (
      <PolymorphicHeading id={headerId} {...props}>
        <Slot />
      </PolymorphicHeading>
    );
  },
);
