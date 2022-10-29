import { component$ } from '@builder.io/qwik';

interface DividerProps {
  class?: string;
  className?: string;
  label?: string;
  horizontal?: boolean;
}

export const Divider = component$(({ label, horizontal = false, ...props }: DividerProps) => {
  return (
    <div className={`divider ${horizontal ? 'divider-horizontal' : 'divider-vertical'}`} {...props}>{label}</div>
  );
});
