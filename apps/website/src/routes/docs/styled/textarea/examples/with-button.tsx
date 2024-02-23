import { component$ } from '@builder.io/qwik';
import { Button, Textarea } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div class="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
});
