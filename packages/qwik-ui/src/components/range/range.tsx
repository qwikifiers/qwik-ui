import {$, component$, PropFunction} from '@builder.io/qwik';

interface RangeProps {
  class?: string;
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const Range = component$(({ value = 0, min, max, onChange = $(() => {}), ...props }: RangeProps) => {
  return (
    <input type="range" min={min} max={max} value={value} className="range" onChange$={onChange} {...props} />
  );
});
