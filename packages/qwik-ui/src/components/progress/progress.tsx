import { component$ } from '@builder.io/qwik';

interface ProgressProps {
  value: string;
  max: string;
}

export const Progress = component$(({ value, max }: ProgressProps) => {
  return <progress class="progress w-56" value={value} max={max} />;
});
