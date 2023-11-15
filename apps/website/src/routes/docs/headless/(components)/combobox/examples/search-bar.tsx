import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { QwikIntrinsicElements, component$, useSignal } from '@builder.io/qwik';
import { StatusBadge } from '~/components/component-status-badge/component-status-badge';
import { statusByComponent } from '~/_state/component-statuses';

export default component$(() => {
  const inputValueSig = useSignal('');
  const highlightedIndexSig = useSignal(0);
  const isListboxOpenSig = useSignal(false);

  type MyComponents = {
    component: string;
    label: string;
  };

  const docsPrefix = '/docs/headless';
  const components = [
    { component: 'accordion', label: 'Accordion' },
    { component: 'combobox', label: 'Combobox' },
    { component: 'popover', label: 'Popover' },
    { component: 'select', label: 'Select' },
    { component: 'separator', label: 'Separator' },
    { component: 'tabs', label: 'Tabs' },
    { component: 'toggle', label: 'Toggle' },
    { component: 'tooltip', label: 'Tooltip' },
  ];

  return (
    <Combobox
      bind:inputValueSig={inputValueSig}
      bind:highlightedIndexSig={highlightedIndexSig}
      bind:isListboxOpenSig={isListboxOpenSig}
      optionValueKey="component"
      class="w-fit"
      options={components}
    >
      <ComboboxLabel class="text-white">Qwik UI ⚡</ComboboxLabel>
      <ComboboxControl class="relative rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
        <ComboboxInput
          onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
          class="px-d2 w-44 bg-slate-900 pl-6 pr-6 text-white placeholder:text-slate-500"
          onKeyDown$={(e) => {
            if (e.key === 'Enter') {
              const inputElement = e.target as HTMLInputElement;
              window.location.href = `${docsPrefix}/${inputElement.value.toLowerCase()}`;
            }
          }}
        />
        <ComboboxTrigger class="group absolute left-[4px] h-6 w-6">
          <SearchIcon />
        </ComboboxTrigger>
        {inputValueSig.value.length > 0 && (
          // give separate id if two triggers
          <button
            id="close-button"
            aria-label="clear search"
            onMouseDown$={() => {
              inputValueSig.value = '';
            }}
            class="absolute right-0 top-0 flex h-6 w-6 items-center justify-center"
          >
            <ClearIcon class="h-4 w-4" />
          </button>
        )}
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          gutter={8}
          class="w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-1 py-2"
          hide="escaped"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const searchOption = option.option as MyComponents;
            return (
              <a
                href={`${docsPrefix}/${searchOption.component}`}
                aria-label={option.label}
              >
                <ComboboxOption
                  key={option.key}
                  class="group flex items-start justify-between gap-4 rounded-sm border-2  border-transparent px-2 text-white hover:bg-slate-500 aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 aria-selected:border-slate-200 aria-selected:bg-slate-500"
                  index={index}
                  resolved={option}
                >
                  <span>{searchOption.label}</span>
                  <span class="scale-[0.9]">
                    <StatusBadge status={statusByComponent.headless[option.label]} />
                  </span>
                </ComboboxOption>
              </a>
            );
          }}
        />
      </ComboboxPortal>
    </Combobox>
  );
});

export function SearchIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48ZM38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74Z"
      ></path>
    </svg>
  );
}

export function ClearIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
      ></path>
    </svg>
  );
}
