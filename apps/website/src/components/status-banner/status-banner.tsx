import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { ComponentStatus } from 'apps/website/src/_state/component-status.type';
import { getClassByStatus } from '../component-status-badge/component-status-badge';

export interface StatusBannerProps {
  status?: ComponentStatus;
}

function getMessageByStatus(status?: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Ready:
      return (
        <>
          This component is <strong>Production Ready</strong>
        </>
      );
    case ComponentStatus.Beta:
      return (
        <>
          <strong>DISCLAIMER:</strong> This component is{' '}
          <span
            class={`rounded-lg px-2 font-bold tracking-wide ${getClassByStatus(status)}`}
          >
            {status}
          </span>{' '}
          status. That means that it is ready for production, but the API might change.
        </>
      );
    case ComponentStatus.Draft:
      return (
        <>
          <strong>WARNING:</strong> This component is in{' '}
          <span
            class={`rounded-lg px-2 font-bold tracking-wide ${getClassByStatus(status)}`}
          >
            {status}
          </span>{' '}
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
            class={`rounded-lg px-2 font-bold tracking-wide ${getClassByStatus(
              status || ComponentStatus.Planned,
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
      return 'bg-gradient-to-b from-qwikui-blue-800 to-qwikui-blue-900 dark:from-qwikui-purple-800 dark:to-qwikui-purple-900';
    case ComponentStatus.Draft:
      return 'bg-gradient-to-b from-orange-700 to-orange-800 dark:from-red-700 dark:to-red-800';
    case ComponentStatus.Planned:
    default:
      return 'bg-gradient-to-b from-orange-700 to-orange-800 dark:from-red-700 dark:to-red-800';
  }
}

export const StatusBanner = component$((props: StatusBannerProps) => {
  const ref = useSignal<HTMLElement | undefined>();
  const isBannerClosedSig = useSignal(false);
  const marginBottom = 64;

  useStylesScoped$(`

  .normal-state {
    transition: margin-top 0.5s ease;
  }

  .fade {
    animation: fadeOut 1s cubic-bezier(0.6, 0.6, 0, 1) forwards;
    margin-top: var(--dynamic-banner-height);
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  `);

  return (
    <>
      <div
        ref={ref}
        hidden={isBannerClosedSig.value}
        onAnimationEnd$={() => (isBannerClosedSig.value = true)}
        class={`${getBackgroundByStatus(
          props.status,
        )} normal-state shadow-light-medium dark:shadow-dark-medium
        border-qwikui-blue-200 dark:border-qwikui-purple-200 relative rounded-xl border-[1px] px-6 py-4 text-white md:flex-row md:items-center`}
        style={{ marginBottom: `${marginBottom}px` }}
      >
        <span class="pr-2">{getMessageByStatus(props.status)}</span>
        <button
          aria-label="close status banner"
          onClick$={() => {
            // we need the margin as a variable rather than a static class.
            ref.value?.style.setProperty(
              '--dynamic-banner-height',
              `-${ref.value?.offsetHeight + marginBottom}px`,
            );

            ref.value?.classList.toggle('fade');
          }}
          class="absolute right-2 top-2 scale-150"
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
