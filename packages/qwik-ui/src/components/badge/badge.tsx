import { component$, Slot } from '@builder.io/qwik';

interface BadgeProps {
  label: string;
}

export const Badge = component$(({ label }: BadgeProps) => {
  return <span class="badge">{label}</span>;
});
