import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const highlightedIndexSig = useSignal(2);

  const highlightedExample = [
    'not highlighted',
    'not highlighted',
    'highlighted by default!',
    'not highlighted',
  ];

  return (
    <>
      <p class="text-center">Third option highlighted! 🚨</p>
      <Combobox.Root
        class="w-fit"
        options={highlightedExample}
        bind:highlightedIndex={highlightedIndexSig}
      >
        <Combobox.Control class="relative flex items-center rounded-base border">
          <Combobox.Input class="px-d2 w-fit rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground" />
          <Combobox.Trigger class="group absolute right-0 h-6 w-6">
            <Combobox.Icon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover hide="escaped" gutter={8} size={true}>
          <Combobox.Listbox
            class="w-fit rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <Combobox.Option
                key={option.key}
                class="group cursor-pointer rounded-base px-2 aria-selected:bg-accent"
                index={index}
                resolved={option}
              >
                {option.label}
              </Combobox.Option>
            )}
          />
        </Combobox.Popover>
      </Combobox.Root>
    </>
  );
});
