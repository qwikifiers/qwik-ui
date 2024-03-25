import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import * as Progress from '@qwik-ui/headless';

export default component$(() => {
  const progress = useSignal(30);

  useVisibleTask$(() => {
    setTimeout(() => {
      progress.value = 50;
    }, 1000);
  });

  return (
    <>
      <Progress.Root
        value={progress.value}
        class="h-7 w-full overflow-hidden rounded-full bg-gray-100"
      >
        <Progress.Indicator
          class="h-full w-full bg-slate-700"
          style={{
            transform: `translateX(-${100 - progress.value}%)`,
          }}
        />
      </Progress.Root>
    </>
  );
});
