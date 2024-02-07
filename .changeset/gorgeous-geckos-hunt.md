---
'@qwik-ui/headless': patch
---

FEAT: added shorthand syntax for Accordion

Now you can do:

```tsx
<Accordion>
  <AccordionItem label="Trigger 1">Content 1</AccordionItem>
  <AccordionItem label="Trigger 2">Content 2</AccordionItem>
</Accordion>
```

And it will get translated to:

```tsx
<AccordionRoot>
  <AccordionItem>
    <AccordionTrigger>Trigger 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Trigger 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</AccordionRoot>
```
