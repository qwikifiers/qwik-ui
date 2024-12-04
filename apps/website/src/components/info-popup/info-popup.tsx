import { component$, useStyles$ } from '@qwik.dev/core';
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
      <Popover.Trigger class="flex items-center justify-center">
        <div class="rounded-full p-1 hover:bg-slate-300 hover:bg-opacity-50">
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </Popover.Trigger>

      <Popover.Panel class="fade-info listbox rounded-base bg-transparent">
        <div class="text-md mb-2 max-w-xs rounded-base border border-b-2 border-border bg-popover px-3 py-2 font-[500] text-foreground shadow-lg sm:w-max">
          {props.info}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
