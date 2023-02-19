import { component$, useSignal } from '@builder.io/qwik';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@qwik-ui/headless';
import Header from '../../../../components/header/header';

export default component$(() => {
  const controlledPopover = useSignal<boolean>(false);

  return (
    <>
      <h2>This is the documentation for the Headless Popover</h2>

      <Popover>
        <PopoverContent>
          <div>My Content here</div>
        </PopoverContent>
        <PopoverTrigger> ➡️ OPEN POPOVER ⬅️</PopoverTrigger>
      </Popover>
      <br />
      <br />
      <Popover triggerEvent="mouseOver">
        <PopoverContent>lorem ipsum</PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('here')}>➡️ HOVER ME ⬅️</Button>
        </PopoverTrigger>
      </Popover>
      <br />
      <br />
      <Popover>
        <PopoverContent>
          <Header />
        </PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('clicked')}>
            ➡️ OPEN POPOVER ⬅️
          </Button>
        </PopoverTrigger>
      </Popover>
      <br />
      <br />
      <h1>This is a controlled popover </h1>
      <p>
        The popover can be closed clicking outside or clicking the CLOSE button
        inside the popover
      </p>
      <p>the onUpdate$ callback allow you to sync local and popover states</p>
      <br />
      <Popover
        isOpen={controlledPopover.value}
        onUpdate$={(value) => {
          controlledPopover.value = value;
        }}
      >
        <PopoverContent>
          <button onClick$={() => (controlledPopover.value = false)}>
            CLOSE POPOVER
          </button>
        </PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('clicked')}>
            ➡️ TOGGLE POPOVER ⬅️
          </Button>
        </PopoverTrigger>
      </Popover>
    </>
  );
});
