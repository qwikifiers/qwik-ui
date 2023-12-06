import { component$ } from '@builder.io/qwik';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@qwik-ui/headless';

export default component$(() => {
  return (
    <AccordionRoot>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Title</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Content</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
});
