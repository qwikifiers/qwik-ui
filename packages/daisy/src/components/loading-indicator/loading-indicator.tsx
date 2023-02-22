import { component$ } from '@builder.io/qwik';
import { LoadingIndicator as HeadlessLoadingIndicator } from '@qwik-ui/headless';

export type LoadingIndicatorProps = {
  class?: string;
  style?: string;
  width?: string;
  trackColor?: string;
  indicatorColor?: string;
  speed?: string;
};

export const LoadingIndicator = component$((props: LoadingIndicatorProps) => {
  return (
    <>
      <HeadlessLoadingIndicator {...props} />
    </>
  );
});
