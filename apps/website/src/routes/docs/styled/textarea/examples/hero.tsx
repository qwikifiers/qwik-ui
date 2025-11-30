import { component$ } from '@qwik.dev/core';
import { Textarea } from '~/components/ui';

export default component$(() => {
  return <Textarea placeholder="Type your message here." />;
});
