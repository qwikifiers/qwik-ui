import type { FunctionComponent, JSXNode } from '@builder.io/qwik';
import { AccordionContent as InternalAccordionContent } from './accordion-content';
import {
  AccordionItemProps,
  AccordionItem as InternalAccordionItem,
} from './accordion-item';
import { AccordionRoot, AccordionRootProps } from './accordion-root';
import { AccordionTrigger as InternalAccordionTrigger } from './accordion-trigger';

export type AccordionProps = AccordionRootProps & {
  itemComponent?: typeof InternalAccordionItem;
  triggerComponent?: typeof InternalAccordionTrigger;
  contentComponent?: typeof InternalAccordionContent;
};

export const Accordion: FunctionComponent<AccordionProps> = (props) => {
  const {
    children,
    triggerComponent: UserTriggerComponent,
    contentComponent: UserContentComponent,
    itemComponent: UserItemComponent,
    ...rest
  } = props;

  const childrenToProcess = Array.isArray(children) ? [...children] : [children];
  const items: JSXNode[] = [];

  const AccordionTrigger = UserTriggerComponent || InternalAccordionTrigger;
  const AccordionContent = UserContentComponent || InternalAccordionContent;
  const AccordionItem = UserItemComponent || InternalAccordionItem;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift() as JSXNode;
    if (!child) {
      continue;
    }

    if (child.type === AccordionItem) {
      const { label } = child.props as AccordionItemProps;
      console.log('label', label);
      if (label) {
        const currentContent = child.children;
        child.props.children = child.children = [
          <AccordionTrigger key={child.key + 'trigger'}>{label}</AccordionTrigger>,
          <AccordionContent key={child.key + 'content'}>
            {currentContent}
          </AccordionContent>,
        ];
      }
      items.push(child);
    }
  }
  return <AccordionRoot {...rest}>{items}</AccordionRoot>;
};
