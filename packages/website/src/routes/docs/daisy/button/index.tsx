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
          <Button primary>primary</Button>
          <Button secondary>secondary</Button>
          <Button accent>accent</Button>
          <Button info>info</Button>
          <Button success>success</Button>
          <Button warning>warning</Button>
          <Button error>error</Button>
          <Button ghost>ghost</Button>
          <Button link>link</Button>
          <Button primary active>primary active</Button>
          <Button accent active>accent active</Button>
          <Button disabled>disabled</Button>
          <Button disabled={true}>disabled</Button>
        </div>

        <h2>Outline Example</h2>
        <div class="panel">
          <Button outline primary>primary</Button>
          <Button outline secondary>secondary</Button>
          <Button outline accent>accent</Button>
          <Button outline info>info</Button>
          <Button outline success>success</Button>
          <Button outline warning>warning</Button>
          <Button outline error>error</Button>
          <Button outline ghost>ghost</Button>
          <Button outline link>link</Button>
          <Button outline active>active</Button>
          <Button outline disabled>disabled</Button>
        </div>

        <h2>size</h2>
        <div class="panel">
          <Button primary size="xs">xs</Button>
          <Button primary size="sm">sm</Button>
          <Button primary size="md">md</Button>
          <Button primary size="lg">lg</Button>
        </div>

        <h2>loading</h2>
        <div class="panel">
          <Button primary loading>loading</Button>
          <Button loading square></Button>
        </div>

        <h2>no click animation</h2>
        <div class="panel">
          <Button primary noAnimation>click me</Button>
          <Button secondary noAnimation>click me</Button>
        </div>

        <h2>Square and Circle</h2>
        <div class="panel">
          <Button secondary square>A</Button>
          <Button accent circle>B</Button>
        </div>

        <h2>Custom class</h2>

        <div class="panel">
          <Button type="button" primary class="px-32 border-4 border-black">
            CUSTOM CLASS
          </Button>
        </div>

        <div>
          <h2>Qwik Events</h2>
          <Button primary onClick$={$(() => window.alert('hello'))}>SHOW ALERT</Button>
        </div>
      </div>
    </>
  );
});
