import { component$, useStyles$, useId } from '@builder.io/qwik';
import { AltSelect } from '@qwik-ui/headless';
import styles from './alt-select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <AltSelect.Root class="qui-SelectRoot">
        <AltSelect.Label class="qui-SelectLabel">
          Alternate Headless Select implementation (minimally styled)
        </AltSelect.Label>
        <AltSelect.Trigger class="qui-SelectTrigger">
          <AltSelect.Value placeholder="Select an option! ⚡" />
          <AltSelect.Marker class="qui-SelectMarker">
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
          </AltSelect.Marker>
        </AltSelect.Trigger>
        <AltSelect.ListBox class="qui-SelectListBox">
          <AltSelect.Option
            label="🚀 Qwik"
            value="🚀 Qwik"
            class="qui-SelectOption"
          />
          <AltSelect.Group class="qui-SelectGroup">
            <AltSelect.Label class="qui-SelectLabel">Fruits</AltSelect.Label>
            {[
              { label: '🍎 Apple', value: '🍎 Apple', disabled: false },
              { label: '🍌 Banana', value: '🍌 Banana', disabled: false },
              { label: '🍒 Cherry', value: '🍒 Cherry', disabled: false },
              {
                label: '🐲 Dragonfruit',
                value: '🐲 Dragonfruit',
                disabled: true,
              },
            ].map((option) => {
              return (
                <AltSelect.Option
                  key={useId()}
                  label={option.label}
                  value={option.value}
                  disabled={option.disabled}
                  class="qui-SelectOption"
                />
              );
            })}
          </AltSelect.Group>
        </AltSelect.ListBox>
      </AltSelect.Root>
    </>
  );
});
