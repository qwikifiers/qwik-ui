import { component$, $ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Button</h2>

      <div className="flex flex-col gap-8 mt-4">
        <div>
          <h2>Basic Example</h2>
          <Button>SIMPLE BUTTON</Button>
        </div>

        <div>
          <h2>Attributes</h2>
          <Button type="button" disabled={true}>
            DISABLED BUTTON
          </Button>
        </div>

        <div>
          <h2>Events</h2>
          <Button onClick$={$(() => window.alert('hello'))}>SHOW ALERT</Button>
        </div>
      </div>
    </>
  );
});
