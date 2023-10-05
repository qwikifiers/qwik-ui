import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button look="ghost" intent="secondary">
        Ghost
      </Button>
      <Button look="outline" intent="secondary">
        Outline
      </Button>
      <Button look="ghost" intent="danger">
        Ghost
      </Button>
      <Button look="outline" intent="danger">
        Outline
      </Button>
      <Button look="ghost" intent="basic">
        Ghost
      </Button>
      <Button look="outline" intent="basic">
        Outline
      </Button>
    </section>
  );
});
