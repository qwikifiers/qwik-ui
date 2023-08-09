import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useStylesScoped$
} from '@builder.io/qwik';
import { ComponentStatus } from 'apps/website/src/_state/component-status.type';
import { getClassByStatus } from '../component-status-badge/component-status-badge';
import styles from './status-banner.css?inline';

export interface StatusBannerProps {
  status?: ComponentStatus;
}

function getMessageByStatus(status?: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Ready:
      return (
        <>
          This component is <strong>Production Readty</strong>
        </>
      );
    case ComponentStatus.Beta:
      return (
        <>
          <strong>DISCLAIMER:</strong> This component is{' '}
          <span class={`px-2 rounded-full ${getClassByStatus(status)}`}>{status}</span>{' '}
          status. That means that it is ready for production, but the API might change.
        </>
      );
    case ComponentStatus.Draft:
      return (
        <>
          <strong>WARNING:</strong> This component is in{' '}
          <span class={`px-2 rounded-full ${getClassByStatus(status)}`}>{status}</span>{' '}
          status. This means that it is still in development and may have bugs or missing
          features. It is not intended to be used in production. You may use it for
          testing purposes.
        </>
      );
    case ComponentStatus.Planned:
    default:
      return (
        <>
          <strong>WARNING:</strong> This component is in{' '}
          <span
            class={`px-2 rounded-full ${getClassByStatus(
              status || ComponentStatus.Planned
            )}`}
          >
            {status}
          </span>{' '}
          status. That means that it is in our backlog and we might have started working
          on it, but it is not under active development.
        </>
      );
  }
}

function getBackgroundByStatus(status?: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Ready:
      return 'bg-green-300';
    case ComponentStatus.Beta:
      return 'bg-indigo-200 dark:bg-purple-800';
    case ComponentStatus.Draft:
      return 'bg-red-300 dark:bg-orange-800';
    case ComponentStatus.Planned:
    default:
      return 'bg-[#fef1c7] dark:bg-[#92730e]';
  }
}

export const StatusBanner = component$((props: StatusBannerProps) => {
  const ref = useSignal<HTMLElement | undefined>();
  const isClosed = useSignal(false);

  useStylesScoped$(styles);

  return (
    <>
      <div
        ref={ref}
        hidden={isClosed.value}
        onAnimationEnd$={() => (isClosed.value = true)}
        class={`${getBackgroundByStatus(props.status)} mb-8 px-6 py-4 
        rounded-xl md:items-center relative md:flex-row normal-state
        shadow-depth dark:shadow-depth-dark`}
      >
        <span class="pr-2">{getMessageByStatus(props.status)}</span>
        <button
          onClick$={() => ref.value?.classList.toggle('fade')}
          class="scale-150 absolute top-2 right-2"
        >
          <EpCircleCloseFilled />
        </button>
      </div>
    </>
  );
});

export function EpCircleCloseFilled(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512L353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336L616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512L670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
      ></path>
    </svg>
  );
}
