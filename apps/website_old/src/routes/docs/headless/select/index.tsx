import { component$, useStyles$, useId } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <Select.Root class="qui-SelectRoot">
        <Select.Label class="qui-SelectLabel">
          Headless Select implementation (minimally styled)
        </Select.Label>
        <Select.Trigger class="qui-SelectTrigger">
          <Select.Value placeholder="Select an option! ⚡" />
          <Select.Marker class="qui-SelectMarker">
            {/* chevron-down from lucide.dev */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Select.Marker>
        </Select.Trigger>
        <Select.ListBox class="qui-SelectListBox">
          <Select.Option value="🚀 Qwik" class="qui-SelectOption" />
          <Select.Group class="qui-SelectGroup">
            <Select.Label class="qui-SelectLabel">Fruits</Select.Label>
            {[
              { value: '🍎 Apple', disabled: false },
              { value: '🍌 Banana', disabled: false },
              { value: '🍒 Cherry', disabled: false },
              { value: '🐲 Dragonfruit', disabled: true },
            ].map((option) => {
              return (
                <Select.Option
                  key={useId()}
                  value={option.value}
                  disabled={option.disabled}
                  class="qui-SelectOption"
                />
              );
            })}
          </Select.Group>
        </Select.ListBox>
      </Select.Root>
    </>
  );
});
