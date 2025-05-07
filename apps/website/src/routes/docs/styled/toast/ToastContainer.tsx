import { component$ } from '@qwik.dev/core';
import { Slot } from '@qwik.dev/core';
export default component$(() => {
  return (
    <div class="form-control">
      <label class="label cursor-pointer">
        <div
          style={{
            position: 'relative',
            border: 'solid',
            width: '480px',
            height: '240px',
            borderRadius: '12px',
            background: 'rgb(220,220,220)',
          }}
        >
          <Slot />
        </div>
      </label>
    </div>
  );
});
