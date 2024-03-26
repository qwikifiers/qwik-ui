import { toast } from 'qwik-sonner';
import { component$, $ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div>
      <Button
        onClick$={() => {
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: $(() => {
                toast('Event has been deleted');
              }),
            },
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
});
