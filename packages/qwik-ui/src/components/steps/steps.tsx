import { component$, Slot } from '@builder.io/qwik';

interface StepsProps {
  class?: string;
  className?: string;
  isVertical: boolean;
}

export const Steps = component$(({ isVertical = false, ...props }: StepsProps) => {
  return (
    <ul className={`steps ${isVertical ? 'steps-vertical' : ''}`} {...props}><Slot/></ul>
  );
});
