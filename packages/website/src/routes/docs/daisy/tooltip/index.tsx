import { component$ } from '@builder.io/qwik';
import { Tooltip, TooltipProps } from '@qwik-ui/theme-daisy';

export const positions: TooltipProps['position'][] = [
  'top-end',
  'top',
  'top-start',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-start',
  'right-end',
];

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

      <div class="grid md:grid-cols-3 p-2 gap-6 max-w-[800px]">
        {positions.map((position) => {
          return <div class="grid place-content-center p-12">
            <Tooltip content={`This message is ${position} positioned`} position={position}>
              <div class="bg-black inline-block w-[75px] aspect-square"></div>
            </Tooltip>
          </div>
        })}
      </div>
    </>
  );
});
