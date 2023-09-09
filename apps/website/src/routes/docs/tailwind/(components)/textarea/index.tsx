import { component$ } from '@builder.io/qwik';
import { Textarea as TailwindTextarea } from '@qwik-ui/tailwind';

export default component$(() => {
  return (
    <div class="container flex flex-col gap-8">
      <h1>This is the documentation for the Textarea</h1>

      <div>
        <h2>Simple textarea</h2>
        <TailwindTextarea class="w-full"></TailwindTextarea>
      </div>

      <div>
        <h2>Textarea with placeholder</h2>
        <TailwindTextarea
          class="w-full"
          placeholder="Reply to comment..."
        ></TailwindTextarea>
      </div>

      <div>
        <h2>Disabled textarea</h2>
        <TailwindTextarea class="w-full" disabled></TailwindTextarea>
      </div>
    </div>
  );
});
