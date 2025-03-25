import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { Progress } from '~/components/ui';

export default component$(() => {
  const progress = useSignal(20);

  useVisibleTask$(() => {
    setTimeout(() => {
      progress.value = 50;
    }, 500);
  });

  return <Progress bind:value={progress} />;
});
