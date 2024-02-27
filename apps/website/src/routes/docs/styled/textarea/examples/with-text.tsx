import { component$ } from '@builder.io/qwik';
import { Label, Textarea } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div class="grid w-full gap-1.5">
      <Label for="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p class="text-muted-foreground text-sm">
        Your message will be copied to the support team.
      </p>
    </div>
  );
});
