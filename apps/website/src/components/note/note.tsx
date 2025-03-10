import { component$, PropsOf, Slot } from '@qwik.dev/core';
import { cn } from '@qwik-ui/utils';

export enum NoteStatus {
  Info = 'info',
  Warning = 'warning',
  Alert = 'alert',
}

export type NoteProps = {
  status?: NoteStatus;
};

function getIconByStatus(status?: NoteStatus) {
  switch (status) {
    case NoteStatus.Info:
      return <InfoIcon class="text-primary" />;
    case NoteStatus.Warning:
      return <WarningIcon class="text-yellow-400" />;
    case NoteStatus.Alert:
      return <AlertIcon class="text-alert" />;

    default:
      return <InfoIcon class="text-primary" />;
  }
}

function getBackgroundByStatus(status?: NoteStatus) {
  switch (status) {
    case NoteStatus.Info:
      return 'bg-primary/30 border-primary border-l-2 mb-4 rounded-base block';
    case NoteStatus.Warning:
      return 'bg-yellow-400/30 border-yellow-400 border-l-2 mb-4 rounded-base block';
    case NoteStatus.Alert:
      return 'bg-alert/30 border-alert border-l-2 mb-4 rounded-base block';
    default:
      return 'bg-primary/30 border-primary border-l-2 mb-4 rounded-base block';
  }
}

export const Note = component$<NoteProps>(({ status }) => {
  return (
    <aside
      class={cn(
        getBackgroundByStatus(status ?? NoteStatus.Info),
        'note-link relative mx-2 my-12 px-5 py-4 lg:px-8 lg:py-6',
      )}
    >
      <div class="absolute left-[-17.5px] top-[-17.5px] hidden h-8 w-8 rounded-full bg-white dark:bg-slate-900 lg:block">
        <div class="flex h-8 w-8 items-center justify-center ">
          {getIconByStatus(status ?? NoteStatus.Info)}
        </div>
      </div>
      <blockquote>
        <Slot />
      </blockquote>
    </aside>
  );
});

export function InfoIcon(props: PropsOf<'svg'>, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      key={key}
      {...props}
    >
      <g fill="currentColor">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"></path>
        <path d="M144 176a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8Zm88-48A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Zm-92-32a12 12 0 1 0-12-12a12 12 0 0 0 12 12Z"></path>
      </g>
    </svg>
  );
}

export function WarningIcon(props: PropsOf<'svg'>, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <g fill="currentColor">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"></path>
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"></path>
      </g>
    </svg>
  );
}

export function AlertIcon(props: PropsOf<'svg'>, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <g fill="currentColor">
        <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"></path>
        <path d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88Z"></path>
      </g>
    </svg>
  );
}
