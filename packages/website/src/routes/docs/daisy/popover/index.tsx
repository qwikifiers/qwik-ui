import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

import { Button, Card, CardBody, CardTitle } from '@qwik-ui/theme-daisy';
import React from 'react';
import Header from '../../../../components/header/header';

export default component$(() => {
  const controlledPopover = useSignal<boolean>(true);

  return (
    <>
      <h2>This is the documentation for the Popover</h2>
      <Popover placement="top">
        <PopoverContent><Box /></PopoverContent>

        <PopoverTrigger>
          <Button onClick$={() => console.log('here')}> CLICK ME </Button>
        </PopoverTrigger>
      </Popover>
      <br/>
      <br/>

      <Popover offset={10} placement="right">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger>
          <Button onClick$={() => console.log('here')}>
             Offset and position
          </Button>
        </PopoverTrigger>
      </Popover>

      <br/>
      <br/>
      <br/>
      <br/>

      <h1>ALIGNMENTS</h1>

      <Popover placement="right">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>right</Button></PopoverTrigger>
      </Popover>
      <Popover placement="right-end">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>right-end</Button></PopoverTrigger>
      </Popover>
      <Popover placement="right-start">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>right-start</Button></PopoverTrigger>
      </Popover>
      <Popover placement="left">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>left</Button></PopoverTrigger>
      </Popover>
      <Popover placement="bottom">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>bottom</Button></PopoverTrigger>
      </Popover>

      <Popover placement="top">
        <PopoverContent><Box /></PopoverContent>
        <PopoverTrigger><Button>top</Button></PopoverTrigger>
      </Popover>

      <br/>
      <br/>
      <br/>
      <br/>
      <Popover triggerEvent="mouseOver">
        <PopoverContent><Header /></PopoverContent>
        <PopoverTrigger>
          <Button variant="secondary" onClick$={() => console.log('clicked')}>
             HOVER ME
          </Button>
        </PopoverTrigger>
      </Popover>

      <h1>This is a controlled popover </h1>
      <p>The popover can be closed clicking outside or clicking the CLOSE button inside the popover</p>
      <p>the onUpdate$ callback allow you to sync local and popover states</p>
      <br />
      <Popover
        isOpen={controlledPopover.value}
        onUpdate$={(value) => {
          controlledPopover.value = value
        }}
      >
        <PopoverContent>
          <Card>
            <CardBody>
              <CardTitle>title</CardTitle>
              <Button onClick$={() => controlledPopover.value = false}>
                CLOSE ME
              </Button>
            </CardBody>
          </Card>
        </PopoverContent>
        <PopoverTrigger >
          <Button onClick$={() => console.log('clicked')}>
             TOGGLE POPOVER
          </Button>
        </PopoverTrigger>
      </Popover>
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
  )
})
