import { component$, useStyles$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/primitives';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="mt-4 flex flex-col gap-8">
      <h2>This is the documentation for the Button</h2>
      <div class="mt-4 flex flex-col gap-8">
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
          <h2>Custom styling</h2>
          <Button class="customCls">Custom Class</Button>
          <Button style="color: red">Custom styles</Button>
        </div>

        <div>
          <h2>Events</h2>
          <Button onClick$={() => window.alert('hello')}>SHOW ALERT</Button>
        </div>
      </div>
    </div>
  );
});
