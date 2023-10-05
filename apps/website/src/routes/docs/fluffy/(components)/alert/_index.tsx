import { $, component$ } from '@builder.io/qwik';
import { Alert as TailwindAlert } from '@qwik-ui/tailwind';
import { GitHubIcon } from '../../../../_components/icons/GitHubIcon';

export default component$(() => {
  return (
    <div class="container flex flex-col gap-8">
      <h2>This is the documentation for the Alert</h2>

      <div class="flex flex-col gap-4">
        <TailwindAlert>This is a success alert.</TailwindAlert>
        <TailwindAlert variant="error">This is an error alert.</TailwindAlert>
        <TailwindAlert variant="warning">This is a warning alert.</TailwindAlert>
        <TailwindAlert variant="info">This is an info alert.</TailwindAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With a title</h3>
        <TailwindAlert variant="warning" title="Watch out!">
          This is a warning alert.
        </TailwindAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With an icon</h3>
        <TailwindAlert variant="success">
          <div q:slot="icon">💸</div>
          This is a success alert with an icon.
        </TailwindAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With a action</h3>
        <TailwindAlert
          variant="error"
          action={{ label: 'undo', onClick$: $(() => alert('Undoing...')) }}
        >
          This is a success alert with an action.
        </TailwindAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>A mix</h3>
        <TailwindAlert
          variant="info"
          title="Did you know?"
          action={{ label: 'cool!', onClick$: $(() => alert('Hi!')) }}
        >
          <div q:slot="icon">
            <GitHubIcon />
          </div>
          This is an info alert with an action, icon, and title.
        </TailwindAlert>
      </div>
    </div>
  );
});
