import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Progress } from '@qwik-ui/primitives';

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
          <Progress value={10} max={100} class="w-56" />
          <Progress value={20} max={100} class="w-56" />
          <Progress value={30} max={100} class="w-56" />
          <Progress value={40} max={100} class="w-56" />
          <Progress value={50} max={100} class="w-56" />
          <Progress value={60} max={100} class="w-56" />
        </div>
      </div>
    </>
  );
});
