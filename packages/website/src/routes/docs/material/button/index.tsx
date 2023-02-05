import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/material';
import { WithMaterialStyles } from '../../../../../src/components/material';

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
        <WithMaterialStyles>
          <Button>Raised</Button>
        </WithMaterialStyles>
        <h2>Disabled</h2>
        <WithMaterialStyles>
          <Button disabled>Disabled</Button>
        </WithMaterialStyles>
        <h2>Floating</h2>
        <WithMaterialStyles>
          <Button floating size="large">
            <i class="material-icons">add</i>
          </Button>
        </WithMaterialStyles>
        <h2>Flat</h2>
        <WithMaterialStyles>
          <Button flat>Flat</Button>
        </WithMaterialStyles>
        <h2>Size: default medium</h2>
        <WithMaterialStyles>
          <div class="panel">
            <Button size={'small'}>Small</Button>
            <Button size={'medium'}>Medium</Button>
            <Button size={'large'}>Large</Button>
          </div>
        </WithMaterialStyles>
      </div>
    </>
  );
});
