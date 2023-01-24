import { component$ } from '@builder.io/qwik';
import { Collapse } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Collapse</h2>
      <Collapse>
        <p q:slot="label">Hello from Collapse</p>
        <p q:slot="content">Collapse content</p>
      </Collapse>
    </>
  );
});
