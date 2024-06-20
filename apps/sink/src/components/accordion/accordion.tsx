import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const items = [
    {
      trigger: 'Why?',
      content:
        'So that you can play with the components on your own - even with tailwind ✨',
    },
    {
      trigger: 'Does it run on every commit?',
      content: "Yes it does. How? I don't know.",
    },
    { trigger: 'How much does it cost?', content: "It's free!" },
    {
      trigger: 'Who made this?',
      content:
        'Mohammad Bagher and his team. I would follow them on twitter if I were you.',
    },
  ];

  useVisibleTask$(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles;

    console.log('mainColor', mainColor);
  });

  return (
    <Accordion.Root class="w-full max-w-sm">
      {items.map((item) => (
        <Accordion.Item class="border-b" key={item.trigger}>
          <Accordion.Header class="flex">
            <Accordion.Trigger class="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-open]>svg]:rotate-180">
              <span>{item.trigger}</span>
              <LuChevronDown class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="overflow-hidden text-sm data-[closed]:animate-accordion-up data-[open]:animate-accordion-down">
            <div class="pb-4 pt-0">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});
