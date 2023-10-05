import { component$, $, useStylesScoped$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/tailwind';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-wrap: wrap;
    }`);

  return (
    <>
      <h2>This is the documentation for the Progress</h2>

      <div class="mt-4 flex flex-col gap-8">
        <h2>Basic Example</h2>
        <div class="panel">
          <Progress variant="primary" value={10} max={100} class="w-56" />
          <Progress variant="primary" value={20} max={100} class="w-56" />
          <Progress variant="primary" value={30} max={100} class="w-56" />
          <Progress variant="primary" value={40} max={100} class="w-56" />
          <Progress variant="primary" value={50} max={100} class="w-56" />
          <Progress variant="primary" value={60} max={100} class="w-56" />

          <h2>secondary color</h2>
          <Progress variant="secondary" value={50} max={100} class="w-56" />

          <h2>accent color</h2>
          <Progress variant="accent" value={50} max={100} class="w-56" />

          <h2>success color</h2>
          <Progress variant="success" value={50} max={100} class="w-56" />

          <h2>info color</h2>
          <Progress variant="info" value={50} max={100} class="w-56" />

          <h2>warning color</h2>
          <Progress variant="warning" value={50} max={100} class="w-56" />

          <h2>error color</h2>
          <Progress variant="error" value={50} max={100} class="w-56" />

          <h2>Indeterminate (no value) </h2>
          <Progress variant="error" class="w-56" />
        </div>
      </div>
    </>
  );
});
