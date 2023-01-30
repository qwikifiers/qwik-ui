import { component$, useStyles$ } from '@builder.io/qwik';
import { Button, ButtonGroup } from '@qwik-ui/headless';
import styles from './button-group.css?inline';

export default component$(() => {
  useStyles$(styles);

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
      <h1>With custom class</h1>
      <ButtonGroup class="custom-btn-group" >
        <Button>BUTTON 1</Button>
        <Button>BUTTON 2</Button>
        <Button>BUTTON 3</Button>
      </ButtonGroup>

      <hr/>
      <h1>With custom styles</h1>
      <ButtonGroup style="border: 2px solid black; display: inline-flex; gap: 2rem; padding: 1rem">
        <Button style="color: red">BUTTON 1</Button>
        <Button>BUTTON 2</Button>
        <Button>BUTTON 3</Button>
      </ButtonGroup>
    </>
  );
});
