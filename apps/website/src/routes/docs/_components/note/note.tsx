import { component$ } from '@builder.io/qwik';

export enum NoteStatus {
  Info = 'Info',
  Warning = 'Warning',
  Success = 'Success',
  Caution = 'Cauton',
}

export interface NoteProps {
  status?: NoteStatus;
}

function getIconByStatus(status?: NoteStatus) {
  switch (status) {
    case NoteStatus.Info:
      return <></>;
    case NoteStatus.Warning:
      return <></>;
    case NoteStatus.Success:
      return <></>;
    case NoteStatus.Caution:
    default:
      return <></>;
  }
}

function getBackgroundByStatus(status?: NoteStatus) {
  switch (status) {
    case NoteStatus.Info:
      return 'bg-green-300';
    case NoteStatus.Warning:
      return 'bg-gradient-to-b from-qwikui-blue-800 to-qwikui-blue-900 dark:from-qwikui-purple-800 dark:to-qwikui-purple-900';
    case NoteStatus.Success:
      return 'bg-gradient-to-b from-orange-700 to-orange-800 dark:from-red-700 dark:to-red-800';
    case NoteStatus.Caution:
    default:
      return 'bg-gradient-to-b from-orange-700 to-orange-800 dark:from-red-700 dark:to-red-800';
  }
}

export const Note = component$((props: NoteProps) => {
  return <aside class={`${getBackgroundByStatus(props.status)}`}></aside>;
});
