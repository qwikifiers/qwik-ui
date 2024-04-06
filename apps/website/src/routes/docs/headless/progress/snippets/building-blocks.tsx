import { component$ } from '@builder.io/qwik';
import { Progress, ProgressIndicator } from '@qwik-ui/headless';

export default component$(() => {
  const progress = 30;

  return (
    <Progress value={progress} class="progress">
      <ProgressIndicator
        class="progress-indicator"
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      />
    </Progress>
  );
});
