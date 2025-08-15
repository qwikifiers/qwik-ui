import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Badge } from '~/components/ui';
import { cn } from '@qwik-ui/utils';
import { ComponentStatus } from '~/_state/component-status.type';
import { getVariantByStatus } from '../component-status-badge/component-status-badge';
import { LuX } from '@qwikest/icons/lucide';

export interface StatusBannerProps {
  status?: ComponentStatus;
}

function getMessageByStatus(status?: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Beta:
      return (
        <>
          <strong>DISCLAIMER:</strong> This component is in{' '}
          <Badge look={getVariantByStatus(status)} class="text-sm">
            {status}
          </Badge>{' '}
          status. That means that it is ready for production, but the API might change.
        </>
      );
    case ComponentStatus.Draft:
      return (
        <>
          <strong>WARNING:</strong> This component is in{' '}
          <Badge look={getVariantByStatus(status)} class="text-sm">
            {status}
          </Badge>{' '}
          status. This means that it is still in development and may have bugs or missing
          features. It is not intended to be used in production. You may use it for
          testing purposes.
        </>
      );
    default:
      return <></>;
  }
}

function getBackgroundByStatus(status?: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Beta:
      return 'border border-primary';
    case ComponentStatus.Draft:
      return 'border';
  }
}

export const StatusBanner = component$(({ status }: StatusBannerProps) => {
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
        hidden={isBannerClosedSig.value || !status}
        onAnimationEnd$={() => (isBannerClosedSig.value = true)}
        class={cn(
          getBackgroundByStatus(status),
          'normal-state rounded-base relative border-2 px-8 py-6 md:flex-row md:items-center 2xl:-mx-8',
        )}
        style={{ marginBottom: `${marginBottom}px` }}
      >
        <span class="pr-2">{getMessageByStatus(status)}</span>
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
          class="absolute top-2 right-2 scale-150"
        >
          <LuX class="size-3" />
        </button>
      </div>
    </>
  );
});
