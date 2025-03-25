import { component$ } from '@qwik.dev/core';
import { Textarea } from '@qwik-ui/styled';

export default component$(() => {
  return <Textarea placeholder="Type your message here." disabled />;
});
