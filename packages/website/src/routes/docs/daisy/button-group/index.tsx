import { component$ } from '@builder.io/qwik';
import { Button, ButtonGroup } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the ButtonGroup</h2>

      <h1>Basic Example</h1>
      <ButtonGroup>
        <Button>BUTTON 1</Button>
        <Button>BUTTON 2</Button>
        <Button>BUTTON 3</Button>
      </ButtonGroup>

      <hr/>
      <h1>With custom styles</h1>
      <ButtonGroup style="border: 0.2rem solid black; padding: 1rem;">
        <Button>BUTTON 1</Button>
        <Button>BUTTON 2</Button>
        <Button>BUTTON 3</Button>
      </ButtonGroup>
    </>
  );
});
