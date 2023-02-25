import { component$ } from '@builder.io/qwik';
import { Spinner as HeadlessSpinner } from '@qwik-ui/headless';

export type SpinnerProps = {
  class?: string;
  style?: string;
  width?: string;
  trackColor?: string;
  indicatorColor?: string;
  speed?: string;
};

export const Spinner = component$((props: SpinnerProps) => {
  return (
    <>
      <HeadlessSpinner {...props} />
    </>
  );
});
