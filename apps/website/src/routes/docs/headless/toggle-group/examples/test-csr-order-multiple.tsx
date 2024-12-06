import { component$, useStyles$ } from '@builder.io/qwik';
import styles from '../snippets/toggle.css?inline';
import { ToggleGroup } from '@qwik-ui/headless';
import { useSignal } from '@builder.io/qwik';

export default component$(() => {
  useStyles$(styles);
  const items = ['left', 'center', 'right'];
  const isItemsRenderedSig = useSignal(false);

  return (
    <div>
      <button onClick$={() => (isItemsRenderedSig.value = true)}>
        render on the client
      </button>
      {isItemsRenderedSig.value && (
        <ToggleGroup.Root multiple>
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
      )}
    </div>
  );
});
