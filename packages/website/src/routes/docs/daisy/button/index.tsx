import { component$, $, useStylesScoped$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }`
  );

  return (
    <>
      <h2>This is the documentation for the Button</h2>

      <div class="flex flex-col gap-8 mt-4">
        <h2>Basic Example</h2>
        <div class="panel">
          <Button>default</Button>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="accent">accent</Button>
          <Button variant="info">info</Button>
          <Button variant="success">success</Button>
          <Button variant="warning">warning</Button>
          <Button variant="error">error</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
          <Button variant="primary" disabled>primary disabled</Button>
          <Button variant="secondary" disabled>secondary disabled</Button>
        </div>

        <h2>Active Example</h2>
        <div class="panel">
          <Button active>default</Button>
          <Button variant="primary" active>primary</Button>
          <Button variant="secondary" active>secondary</Button>
          <Button variant="accent" active>accent</Button>
          <Button variant="info" active>info</Button>
          <Button variant="success" active>success</Button>
          <Button variant="warning" active>warning</Button>
          <Button variant="error" active>error</Button>
          <Button variant="ghost" active>ghost</Button>
          <Button variant="link" active>link</Button>
          <Button variant="primary" active disabled>primary | active | disabled</Button>
          <Button variant="secondary" active disabled>secondary | active | disabled</Button>
        </div>


        <h2>Outline Example</h2>
        <div class="panel">
          <Button outline variant="primary">primary</Button>
          <Button outline variant="secondary">secondary</Button>
          <Button outline variant="accent">accent</Button>
          <Button outline variant="info">info</Button>
          <Button outline variant="success">success</Button>
          <Button outline variant="warning">warning</Button>
          <Button outline variant="error">error</Button>
          <Button outline variant="ghost">ghost</Button>
          <Button outline variant="link">link</Button>
          <Button outline variant="disabled">disabled</Button>
        </div>

        <h2>size</h2>
        <div class="panel">
          <Button variant="primary" size="xs">xs</Button>
          <Button variant="secondary" size="sm">sm</Button>
          <Button variant="accent" size="md">md</Button>
          <Button variant="warning" size="lg">lg</Button>
        </div>

        <h2>loading</h2>
        <div class="panel">
          <Button variant="primary" loading>loading</Button>
          <Button loading square></Button>
        </div>

        <h2>no click animation</h2>
        <div class="panel">
          <Button variant="primary" noAnimation>click me</Button>
          <Button variant="secondary" noAnimation>click me</Button>
        </div>

        <h2>Square and Circle</h2>
        <div class="panel">
          <Button variant="secondary" square>A</Button>
          <Button variant="accent" circle>B</Button>
        </div>

        <h2>Custom class</h2>

        <div class="panel">
          <Button type="button" variant="primary" class="px-32 border-4 border-black">
            CUSTOM CLASS
          </Button>
        </div>

        <div>
          <h2>Qwik Events</h2>
          <Button variant="primary" onClick$={$(() => window.alert('hello'))}>SHOW ALERT</Button>
        </div>
      </div>
    </>
  );
});
