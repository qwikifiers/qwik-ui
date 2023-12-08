import { component$, Slot, useSignal } from '@builder.io/qwik';
import {
  AutocompleteControl,
  AutocompleteInput,
  AutocompleteLabel,
  AutocompleteListbox,
  AutocompleteOption,
  AutocompleteRoot,
  AutocompleteTrigger,
} from '@qwik-ui/headless';
import { PreviewCodeExampleTabsDeprecated } from '~/components/preview-code-example/preview-code-example-tabs-deprecated';

const trainers = [
  'Caleb',
  'Olivia',
  'James',
  'Ava',
  'Noah',
  'Emma',
  'Oliver',
  'Amelia',
  'Theodore',
  'Elizabeth',
];

export const Example01 = component$(() => {
  const trainersSig = useSignal(trainers);
  const Showcase = useSignal(true);
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex flex-col gap-4" q:slot="actualComponent">
        <button
          onClick$={() => {
            Showcase.value = !Showcase.value;
          }}
        >
          Show them
        </button>
        {Showcase.value === true && (
          <AutocompleteRoot class="relative">
            <AutocompleteLabel class=" font-semibold text-[#333333] dark:text-white">
              Personal Trainers ⚡
            </AutocompleteLabel>
            <AutocompleteControl class="relative flex items-center rounded-sm border border-[#7d95b3] bg-[#1f2532]">
              <AutocompleteInput class="w-44 bg-inherit px-2 pr-6 text-white" />
              <AutocompleteTrigger class="group absolute right-0 h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </AutocompleteTrigger>
            </AutocompleteControl>
            <AutocompleteListbox class="mt-2 w-full rounded-sm border border-[#7d95b3] bg-[#1f2532] px-4 py-2 text-white">
              {trainersSig.value.map((trainer) => (
                <AutocompleteOption
                  optionValue={trainer}
                  key={trainer}
                  class="rounded-sm px-2 hover:bg-[#496080] focus:bg-[#496080]"
                >
                  {trainer}
                </AutocompleteOption>
              ))}
            </AutocompleteListbox>
          </AutocompleteRoot>
        )}
        <button
          onClick$={() => {
            trainersSig.value = ['One', 'Two', 'Three', 'Four', 'Five'];
          }}
        >
          Change them
        </button>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const Example02 = component$(() => {
  return <PreviewCodeExampleTabsDeprecated></PreviewCodeExampleTabsDeprecated>;
});

export const Example03 = component$(() => {
  return <PreviewCodeExampleTabsDeprecated></PreviewCodeExampleTabsDeprecated>;
});
