import { component$ } from '@builder.io/qwik';
import { Switch } from '~/components/ui';

export default component$(() => {

  return (
    <Switch.Root class="switch" >
      <Switch.Input data-test={11}  />
    </Switch.Root>
  );
});

