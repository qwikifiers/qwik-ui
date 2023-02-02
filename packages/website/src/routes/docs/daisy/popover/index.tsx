import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

import { Button, Card, CardBody, CardTitle } from '@qwik-ui/theme-daisy';
import React from 'react';
import Header from '../../../../components/header/header';

export default component$(() => {

  return (
    <>
      <h2>This is the documentation for the Popover</h2>


      <Popover>
        <PopoverContent>My Content here</PopoverContent>
        <PopoverTrigger> ➡️ CLICK ME ⬅️</PopoverTrigger>
      </Popover>

      <br/>
      <br/>
      <br/>
      <br/>

      <Popover>
        <PopoverContent>
          <Card>
            <CardBody>
              <CardTitle>title</CardTitle>
              this is a card component
            </CardBody>
          </Card>
        </PopoverContent>

        <PopoverTrigger >
          <Button onClick$={() => console.log('here')}>➡️ CLICK ME ⬅️</Button>
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
    </>
  );
});
