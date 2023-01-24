import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Tooltip</h2>
      <div>
        Hey I am a text and you can &nbsp;
        <Tooltip
          inline={true}
          position="bottom"
          content="Hi this is the message"
        >
          <strong>hover on me</strong>
        </Tooltip>
      </div>

      <br />
      <br />
      <br />

      <Tooltip content="Hi this is the message">
        <div style="width: 100px; height: 100px; background-color: black;"></div>
      </Tooltip>
    </>
  );
});
