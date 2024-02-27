import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <Tooltip
          offset={8}
          content="I'm a tooltip!"
          class="rounded-base border-2 p-4 shadow-md"
        >
          <span>Hover over me!</span>
        </Tooltip>
      </div>
    </>
  );
});
