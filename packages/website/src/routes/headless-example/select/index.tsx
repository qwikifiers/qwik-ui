import { component$, useId, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { SNSelect } from '@qwik-ui/headless';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <article>
      <h1>Headless Select Component Demo</h1>

      <SNSelect.Root class="qui-SelectRoot">
        <SNSelect.Label class="qui-SelectLabel">
          Minimally styled
        </SNSelect.Label>
        <SNSelect.Trigger class="qui-SelectTrigger">
          <SNSelect.Value placeholder="Select an option! ⚡" />
          <SNSelect.Marker class="qui-SelectMarker">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </SNSelect.Marker>
        </SNSelect.Trigger>
        <SNSelect.ListBox class="qui-SelectListBox">
          <SNSelect.Option
            label="🚀 Qwik"
            value="🚀 Qwik"
            class="qui-SelectOption"
          />
          <SNSelect.Group class="qui-SelectGroup">
            <SNSelect.Label class="qui-SelectLabel">Fruits</SNSelect.Label>
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
                <SNSelect.Option
                  key={useId()}
                  label={option.label}
                  value={option.value}
                  disabled={option.disabled}
                  class="qui-SelectOption"
                />
              );
            })}
          </SNSelect.Group>
        </SNSelect.ListBox>
      </SNSelect.Root>

      <SNSelect.Root>
        <SNSelect.Label>No styles 😅</SNSelect.Label>
        <SNSelect.Trigger>
          <SNSelect.Value placeholder="Select an option! ⚡" />
          <SNSelect.Marker>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </SNSelect.Marker>
        </SNSelect.Trigger>
        <SNSelect.ListBox>
          <SNSelect.Option label="🚀 Qwik" value="🚀 Qwik" />
          <SNSelect.Group>
            <SNSelect.Label>Fruits</SNSelect.Label>
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
                <SNSelect.Option
                  key={useId()}
                  label={option.label}
                  value={option.value}
                  disabled={option.disabled}
                />
              );
            })}
          </SNSelect.Group>
        </SNSelect.ListBox>
      </SNSelect.Root>

      <SNSelect.Root class="qui-SelectRoot" style="margin-block-start: 60vh">
        <SNSelect.Label class="qui-SelectLabel">
          One more just to make sure Floating UI's flip is working
        </SNSelect.Label>
        <SNSelect.Trigger class="qui-SelectTrigger">
          <SNSelect.Value placeholder="Select an option! ⚡" />
          <SNSelect.Marker class="qui-SelectMarker">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </SNSelect.Marker>
        </SNSelect.Trigger>
        <SNSelect.ListBox class="qui-SelectListBox">
          <SNSelect.Option
            label="🚀 Qwik"
            value="🚀 Qwik"
            class="qui-SelectOption"
          />
          <SNSelect.Group class="qui-SelectGroup">
            <SNSelect.Label class="qui-SelectLabel">Fruits</SNSelect.Label>
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
                <SNSelect.Option
                  key={useId()}
                  label={option.label}
                  value={option.value}
                  disabled={option.disabled}
                  class="qui-SelectOption"
                />
              );
            })}
          </SNSelect.Group>
        </SNSelect.ListBox>
      </SNSelect.Root>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Headless Select Component Demo | Qwik UI',
};
