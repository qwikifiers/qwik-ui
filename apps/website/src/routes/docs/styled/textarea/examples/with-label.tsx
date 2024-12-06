import { component$ } from '@builder.io/qwik';
import { Label, Textarea } from '~/components/ui';

export default component$(() => {
  return (
    <div class="grid w-full gap-1.5">
      <Label for="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
});
