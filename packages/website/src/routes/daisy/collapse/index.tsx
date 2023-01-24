import { component$ } from '@builder.io/qwik';
import { Collapse } from '@qwik-ui/daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Collapse</h2>
      <div style="width: 300px">
        <Collapse showArrow={true}>
          <label q:slot="label">Hi Glenn and Gil!</label>
          <div class="text-center" q:slot="content">
            QwikUI 🚀
          </div>
        </Collapse>
      </div>
    </>
  );
});
