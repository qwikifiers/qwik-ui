import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

type InfoProps = {
  info: string;
};

export const InfoPopup = component$((props: InfoProps) => {
  useStyles$(`
  .fade-info {
    transition: opacity 0.35s, display 0.35s, overlay 0.35s;
    transition-behavior: allow-discrete;
    opacity: 0;
  }
  
  .fade-info.popover-showing {
    opacity: 1;
  }
  
  .fade-info.popover-closing {
    opacity: 0;
  }  
  `);

  return (
    <Popover.Root flip={false} floating="top" gutter={4}>
      <Popover.Trigger class="flex items-center justify-center"></Popover.Trigger>

      <Popover.Panel class="fade-info listbox rounded-base bg-transparent">
        <div class="text-md mb-2 max-w-xs rounded-base border border-b-2 border-border bg-popover px-3 py-2 font-[500] text-foreground shadow-lg sm:w-max">
          {props.info}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
