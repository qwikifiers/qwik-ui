import { component$, useStyles$ } from '@builder.io/qwik';
import { Button, ButtonGroup } from '@qwik-ui/tailwind';
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

      <hr />
      <h1>With custom class</h1>
      <ButtonGroup class="custom-btn-group">
        <Button variant="accent">BUTTON 1</Button>
        <Button variant="accent">BUTTON 2</Button>
        <Button variant="accent">BUTTON 3</Button>
      </ButtonGroup>
      <hr />
      <h1>With custom styles</h1>
      <ButtonGroup style="background-color: lightgray; padding: 1rem; display: inline-block; margin: 1rem 0;">
        <Button variant="secondary">BUTTON 1</Button>
        <Button variant="secondary">BUTTON 2</Button>
        <Button variant="secondary">BUTTON 3</Button>
      </ButtonGroup>

      <h1>With button events</h1>
      <ButtonGroup>
        <Button variant="info" onClick$={() => window.alert('1')}>
          BUTTON 1
        </Button>
        <Button variant="info" onClick$={() => window.alert('2')}>
          BUTTON 2
        </Button>
        <Button variant="info" onClick$={() => window.alert('3')}>
          BUTTON 3
        </Button>
      </ButtonGroup>
    </>
  );
});
