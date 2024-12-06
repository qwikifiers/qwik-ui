import { component$, useStyles$ } from '@builder.io/qwik';
import styles from '../snippets/toggle.css?inline';
import { ToggleGroup } from '@qwik-ui/headless';
import { useSignal } from '@builder.io/qwik';

export default component$(() => {
  useStyles$(styles);
  const items = ['left', 'center', 'right'];
  const isItemsRenderedSig = useSignal(false);
  const valueSelected = useSignal<string>('left');

  return (
    <div>
      <button onClick$={() => (isItemsRenderedSig.value = true)}>
        render on the client
      </button>
      {isItemsRenderedSig.value && (
        <div class="toggle-container">
          <ToggleGroup.Root bind:value={valueSelected}>
            {items.map((item, index) => (
              <ToggleGroup.Item
                key={index}
                value={item}
                aria-label={`${item} item`}
                class="toggle"
              >
                {item}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <span test-data-bounded-span>You selected: {valueSelected.value}</span>
          <button
            style={{ border: '1px solid black', padding: '10px' }}
            onClick$={() => (valueSelected.value = 'right')}
          >
            I can only press 'right'
          </button>
        </div>
      )}
    </div>
  );
});
