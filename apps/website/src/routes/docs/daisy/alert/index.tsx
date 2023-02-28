import { $, component$ } from '@builder.io/qwik';
import { Alert as DaisyAlert } from '@qwik-ui/theme-daisy';
import { GitHubIcon } from '../../../../components/icons/GitHubIcon';

export default component$(() => {
  return (
    <div class="container flex flex-col gap-8">
      <h2>This is the documentation for the Alert</h2>

      <div class="flex flex-col gap-4">
        <DaisyAlert>This is a success alert.</DaisyAlert>
        <DaisyAlert variant="error">This is an error alert.</DaisyAlert>
        <DaisyAlert variant="warning">This is a warning alert.</DaisyAlert>
        <DaisyAlert variant="info">This is an info alert.</DaisyAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With a title</h3>
        <DaisyAlert variant="warning" title="Watch out!">
          This is a warning alert.
        </DaisyAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With an icon</h3>
        <DaisyAlert variant="success">
          <div q:slot="icon">💸</div>
          This is a success alert with an icon.
        </DaisyAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>With a action</h3>
        <DaisyAlert
          variant="error"
          action={{ label: 'undo', onClick$: $(() => alert('Undoing...')) }}
        >
          This is a success alert with an action.
        </DaisyAlert>
      </div>

      <div class="flex flex-col gap-2">
        <h3>A mix</h3>
        <DaisyAlert
          variant="info"
          title="Did you know?"
          action={{ label: 'cool!', onClick$: $(() => alert('Hi!')) }}
        >
          <div q:slot="icon">
            <GitHubIcon />
          </div>
          This is an info alert with an action, icon, and title.
        </DaisyAlert>
      </div>
    </div>
  );
});
