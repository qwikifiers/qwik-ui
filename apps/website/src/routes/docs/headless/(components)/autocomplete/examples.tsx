import { component$, Slot } from '@builder.io/qwik';
import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteButton,
  AutocompleteListbox,
  AutocompleteOption,
} from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

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
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <AutocompleteRoot style="width: fit-content">
          <AutocompleteLabel>Personal Trainers ⚡</AutocompleteLabel>
          <AutocompleteTrigger>
            <AutocompleteInput />
            <AutocompleteButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 20px; height: 20px;"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </AutocompleteButton>
          </AutocompleteTrigger>
          <AutocompleteListbox class="listboxStyle">
            {trainers.map((trainer, index) => (
              <AutocompleteOption optionValue={trainer} key={index}>
                {trainer}
              </AutocompleteOption>
            ))}
          </AutocompleteListbox>
        </AutocompleteRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return <PreviewCodeExample></PreviewCodeExample>;
});

export const Example03 = component$(() => {
  return <PreviewCodeExample></PreviewCodeExample>;
});
