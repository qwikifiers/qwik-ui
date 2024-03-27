import { component$, useOnWindow, useSignal, $ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/styled';

export default component$(() => {
  const progress = useSignal(30);

  useOnWindow(
    'load',
    $(() => {
      setTimeout(() => {
        progress.value = 50;
      }, 1000);
    }),
  );

  return <Progress value={progress.value} />;
});
