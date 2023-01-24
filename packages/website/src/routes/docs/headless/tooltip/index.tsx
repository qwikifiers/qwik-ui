import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Tooltip</h2>

      <div>
        Hey I am a text and you can &nbsp;
        <Tooltip
          content="Hi this is the message"
          class={'inline-block bg-black text-white p-2 rounded-lg z-[99] '}
        >
          <strong>hover on me</strong>
        </Tooltip>
      </div>

      <br />
      <br />
      <br />

      <Tooltip
        content="Hi this is the message"
        class={'inline-block bg-black text-white p-2 rounded-lg z-[99] '}
      >
        <div style="width: 50px; height: 50px; background-color: black;"></div>
        <div q:slot="tooltip-content">Custom thing</div>
      </Tooltip>
    </>
  );
});
