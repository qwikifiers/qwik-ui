import { component$, PropFunction } from '@builder.io/qwik';

interface RangeProps {
  class?: string;
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Range = component$((props: RangeProps) => {
  const { value = 0, min, max } = props;
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      className="range"
      onChange$={props.onChange$}
      {...props}
    />
  );
});
