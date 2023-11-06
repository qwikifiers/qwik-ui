import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';
import { Button as TailwindButton } from '@qwik-ui/tailwind';

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

      <div class="mt-4 flex flex-col gap-8">
        <h2>Fluffy Example</h2>

        <div>
          <Button>I'm from Fluffy</Button>
        </div>

        <h2>Basic Example</h2>
        <div class="panel">
          <TailwindButton>default</TailwindButton>
          <TailwindButton variant="primary">primary</TailwindButton>
          <TailwindButton variant="secondary">secondary</TailwindButton>
          <TailwindButton variant="accent">accent</TailwindButton>
          <TailwindButton variant="info">info</TailwindButton>
          <TailwindButton variant="success">success</TailwindButton>
          <TailwindButton variant="warning">warning</TailwindButton>
          <TailwindButton variant="error">error</TailwindButton>
          <TailwindButton variant="ghost">ghost</TailwindButton>
          <TailwindButton variant="link">link</TailwindButton>
          <TailwindButton variant="primary" disabled>
            primary disabled
          </TailwindButton>
          <TailwindButton variant="secondary" disabled>
            secondary disabled
          </TailwindButton>
        </div>

        <h2>Active Example</h2>
        <div class="panel">
          <TailwindButton active>default</TailwindButton>
          <TailwindButton variant="primary" active>
            primary
          </TailwindButton>
          <TailwindButton variant="secondary" active>
            secondary
          </TailwindButton>
          <TailwindButton variant="accent" active>
            accent
          </TailwindButton>
          <TailwindButton variant="info" active>
            info
          </TailwindButton>
          <TailwindButton variant="success" active>
            success
          </TailwindButton>
          <TailwindButton variant="warning" active>
            warning
          </TailwindButton>
          <TailwindButton variant="error" active>
            error
          </TailwindButton>
          <TailwindButton variant="ghost" active>
            ghost
          </TailwindButton>
          <TailwindButton variant="link" active>
            link
          </TailwindButton>
          <TailwindButton variant="primary" active disabled>
            primary | active | disabled
          </TailwindButton>
          <TailwindButton variant="secondary" active disabled>
            secondary | active | disabled
          </TailwindButton>
        </div>

        <h2>Outline Example</h2>
        <div class="panel">
          <TailwindButton outline variant="primary">
            primary
          </TailwindButton>
          <TailwindButton outline variant="secondary">
            secondary
          </TailwindButton>
          <TailwindButton outline variant="accent">
            accent
          </TailwindButton>
          <TailwindButton outline variant="info">
            info
          </TailwindButton>
          <TailwindButton outline variant="success">
            success
          </TailwindButton>
          <TailwindButton outline variant="warning">
            warning
          </TailwindButton>
          <TailwindButton outline variant="error">
            error
          </TailwindButton>
          <TailwindButton outline variant="ghost">
            ghost
          </TailwindButton>
          <TailwindButton outline variant="link">
            link
          </TailwindButton>
          <TailwindButton outline variant="disabled">
            disabled
          </TailwindButton>
        </div>

        <h2>size</h2>
        <div class="panel">
          <TailwindButton variant="primary" size="xs">
            xs
          </TailwindButton>
          <TailwindButton variant="secondary" size="sm">
            sm
          </TailwindButton>
          <TailwindButton variant="accent" size="md">
            md
          </TailwindButton>
          <TailwindButton variant="warning" size="lg">
            lg
          </TailwindButton>
        </div>

        <h2>loading</h2>
        <div class="panel">
          <TailwindButton variant="primary" loading>
            loading
          </TailwindButton>
          <TailwindButton loading square></TailwindButton>
        </div>

        <h2>no click animation</h2>
        <div class="panel">
          <TailwindButton variant="primary" noAnimation>
            click me
          </TailwindButton>
          <TailwindButton variant="secondary" noAnimation>
            click me
          </TailwindButton>
        </div>

        <h2>Square and Circle</h2>
        <div class="panel">
          <TailwindButton variant="secondary" square>
            A
          </TailwindButton>
          <TailwindButton variant="accent" circle>
            B
          </TailwindButton>
        </div>

        <h2>Custom class</h2>

        <div class="panel">
          {/* previously type="TailwindButton", giving a type error. */}
          <TailwindButton
            type="button"
            variant="primary"
            class="border-4 border-black px-32"
          >
            CUSTOM CLASS
          </TailwindButton>
        </div>

        <div>
          <h2>Qwik Events</h2>
          <TailwindButton variant="primary" onClick$={$(() => window.alert('hello'))}>
            SHOW ALERT
          </TailwindButton>
        </div>
      </div>
    </>
  );
});
