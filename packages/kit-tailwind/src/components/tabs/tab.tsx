import { component$, Slot, QwikIntrinsicElements, PropFunction } from '@builder.io/qwik';
import { Tab as HeadlessTab } from '@qwik-ui/headless';

export type TabProps = {
  class?: string;
  isLifted?: boolean;
  isBordered?: boolean;
  onClick$?: PropFunction<(clicked: number) => void>;
} & QwikIntrinsicElements['button'];

export const Tab = component$(({ isBordered, isLifted, ...props }: TabProps) => {
  return (
    /* @ts-expect-error ignore because deprecated */
    <HeadlessTab
      class={`tab ${isBordered ? 'tab-bordered' : ''} ${isLifted ? 'tab-lifted' : ''}`}
      selectedClassName="tab-active"
      {...props}
    >
      <Slot />
    </HeadlessTab>
  );
});
