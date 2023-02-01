import { component$, Slot } from '@builder.io/qwik';

interface SwapProps {
  class?: string;
  className?: string;
  rotate?: boolean;
  flip?: boolean;
}

export const Swap = component$((props: SwapProps) => {
  const { rotate, flip } = props;

  return (
    <label
      className={`swap ${rotate && 'swap-rotate'} ${flip && 'swap-flip'}`}
      {...props}
    >
      <input type="checkbox" />
      <div class="swap-on">
        <Slot name="swap-on" />
      </div>
      <div class="swap-off">
        <Slot name="swap-off" />
      </div>
    </label>
  );
});
