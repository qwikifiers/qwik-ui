import { component$ } from '@builder.io/qwik';
import { Button, Card, CardBody, CardTitle, Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';
import React from 'react';
import Header from '../../../../components/header/header';

export default component$(() => {

  return (
    <>
      <h2>This is the documentation for the Headless Popover</h2>


      <Popover>
        <PopoverContent><div>My Content here</div></PopoverContent>
        <PopoverTrigger> ➡️ CLICK ME ⬅️</PopoverTrigger>
      </Popover>

      <br/>
      <br/>
      <br/>
      <br/>

      <Popover>
        <PopoverContent>
          ewfwfew
        </PopoverContent>
        <PopoverTrigger >
          <Button onClick$={() => console.log('here')}>
            ➡️ CLICK ME ⬅️
          </Button>
        </PopoverTrigger>
      </Popover>
      <br/>
      <br/>
      <br/>
      SCROLL DOWN
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Popover>
        <PopoverContent><Header /></PopoverContent>
        <PopoverTrigger >
          <Button onClick$={() => console.log('here')}>
            ➡️ CLICK ME ⬅️
          </Button>
        </PopoverTrigger>
      </Popover>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
});
