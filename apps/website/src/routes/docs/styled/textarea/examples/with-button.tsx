import { component$ } from '@builder.io/qwik';
import { Button, Textarea } from '~/components/ui';

export default component$(() => {
  return (
    <div class="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button class="ml-auto w-40">Send message</Button>
    </div>
  );
});
