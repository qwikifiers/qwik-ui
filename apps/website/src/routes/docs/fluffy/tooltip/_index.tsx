import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/tailwind';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Tooltip</h2>
      <div>
        Hey I am a text and you can &nbsp;
        <Tooltip inline={true} position="bottom" content="Hi this is the message">
          hover on me
          <div q:slot="tooltip-content">Custom thing</div>
        </Tooltip>
      </div>

      <br />
      <br />
      <br />

      <Tooltip content="Hi this is the message">
        <div style="width: 100px; height: 100px; background-color: red;"></div>
        <div q:slot="tooltip-content">Custom thing</div>
      </Tooltip>
    </>
  );
});
