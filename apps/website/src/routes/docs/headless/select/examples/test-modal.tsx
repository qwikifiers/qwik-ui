import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  const location = useLocation();
  const isModal = useSignal(location.url.searchParams.get('modal') !== 'off');
  const outsideClicks = useSignal(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        <input type="checkbox" bind:checked={isModal} /> modal
      </label>
      <button data-testid="outside" onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <Select.Root modal={isModal.value}>
        <Select.Trigger>
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover floating="right" style={{ padding: '1rem', border: '1px solid' }}>
          <Select.Item>
            <Select.ItemLabel>Tim</Select.ItemLabel>
          </Select.Item>
          <Select.Item>
            <Select.ItemLabel>Ryan</Select.ItemLabel>
          </Select.Item>
        </Select.Popover>
      </Select.Root>
    </div>
  );
});
