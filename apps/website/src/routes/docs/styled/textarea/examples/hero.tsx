import { component$ } from '@builder.io/qwik';
import { Textarea } from '@qwik-ui/styled';

export default component$(() => {
  return <Textarea placeholder="Type your message here." />;
});
