import { component$, $, useStylesScoped$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/material';
import { MaterialContext } from '../../../../../src/components/material';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }`);

  return (
    <>
      <h2>This is the documentation for the Button</h2>

      <div class="flex flex-col gap-8 mt-4">
        <h2>Raised</h2>
        <MaterialContext>
          <Button>Raised</Button>
        </MaterialContext>
        <h2>Disabled</h2>
        <MaterialContext>
          <Button disabled>Disabled</Button>
        </MaterialContext>
        <h2>Floating</h2>
        <MaterialContext>
          <Button floating size='large'>
            <i class="material-icons">add</i>
          </Button>
        </MaterialContext>
        <h2>Flat</h2>
        <MaterialContext>
          <Button flat>Flat</Button>
        </MaterialContext>
        <h2>Size: default medium</h2>
        <MaterialContext>
          <div class="panel">
            <Button size={'small'}>Small</Button>
            <Button size={'medium'}>Medium</Button>
            <Button size={'large'}>Large</Button>
          </div>
        </MaterialContext>
      </div>
    </>
  );
});
