import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

import { Button, Card, CardBody, CardTitle } from '@qwik-ui/tailwind';

export default component$(() => {
  const controlledPopover = useSignal<boolean>(true);

  return (
    <>
      <h2>This is the documentation for the Popover</h2>

      <h1 class="mt-8">Examples</h1>
      <Popover placement="top">
        <PopoverContent>
          <Box />
        </PopoverContent>

        <PopoverTrigger>
          <Button onClick$={() => console.log('here')}> CLICK ME </Button>
        </PopoverTrigger>
      </Popover>

      <Popover offset={10} placement="right">
        <PopoverContent>
          <Box />
        </PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('here')}>Offset and position</Button>
        </PopoverTrigger>
      </Popover>

      <h1 class="mt-8">ALIGNMENTS</h1>

      <div class="flex flex-col gap-2">
        <Popover placement="right">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="right-end">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right-end</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="right-start">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right-start</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="left">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>left</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="bottom">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>bottom</Button>
          </PopoverTrigger>
        </Popover>

        <Popover placement="top">
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>top</Button>
          </PopoverTrigger>
        </Popover>
      </div>

      <h1 class="mt-8">DISABLE CLICK OUTSIDE</h1>
      <p>
        Popovers are not closed when click outside but they can be closed clicking their
        own trigger button only
      </p>

      <div class="flex flex-col gap-2">
        <Popover placement="right" disableClickOutSide={true}>
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="right-end" disableClickOutSide={true}>
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right-end</Button>
          </PopoverTrigger>
        </Popover>
        <Popover placement="right-start" disableClickOutSide={true}>
          <PopoverContent>
            <Box />
          </PopoverContent>
          <PopoverTrigger>
            <Button>right-start</Button>
          </PopoverTrigger>
        </Popover>
      </div>

      <h1 class="mt-8">TRIGGER: mouseover</h1>
      <p>Popover is opened at mouse over</p>

      <Popover triggerEvent="mouseOver">
        <PopoverContent>
          <Box />
        </PopoverContent>
        <PopoverTrigger>
          <Button variant="secondary" onClick$={() => console.log('clicked')}>
            HOVER ME
          </Button>
        </PopoverTrigger>
      </Popover>

      <h1 class="mt-8">CONTROLLED POPOVER</h1>

      <div class="my-3">
        This is a controlled popover -{' '}
        <code>Current state: {JSON.stringify(controlledPopover.value)}</code>
      </div>
      <p>
        The popover can be closed clicking outside or clicking the CLOSE button inside the
        popover
      </p>
      <p>the onUpdate$ callback allows you to sync local and popover states</p>

      <br />
      <Popover
        isOpen={controlledPopover.value}
        onUpdate$={(value) => {
          controlledPopover.value = value;
        }}
      >
        <PopoverContent>
          <Card>
            <CardBody>
              <CardTitle>title</CardTitle>
              <Button onClick$={() => (controlledPopover.value = false)}>CLOSE ME</Button>
            </CardBody>
          </Card>
        </PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('clicked')}>TOGGLE POPOVER</Button>
        </PopoverTrigger>
      </Popover>

      <Button onClick$={() => (controlledPopover.value = true)}>
        OPEN THE POPOVER ABOVE
      </Button>
    </>
  );
});

export const Box = component$(() => {
  return (
    <Card>
      <CardBody>
        <CardTitle>title</CardTitle>
        this is a card component
      </CardBody>
    </Card>
  );
});
