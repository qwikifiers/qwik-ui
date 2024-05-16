import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Progress } from '~/components/ui';

export default component$(() => {
  const progress = useSignal(30);

  useVisibleTask$(() => {
    setTimeout(() => {
      progress.value = 50;
    }, 500);
  });

  return <Progress value={progress.value} />;
});
