import { component$, Slot } from '@builder.io/qwik';
import {ColorTypes} from '../../types/types';

interface BadgeProps {
  color?: ColorTypes;
  withOutline?: boolean;
}

export const Badge = component$(({ color, withOutline = false }: BadgeProps) => {
  return <span class={`badge ${color ? `badge-${color}` : ''} ${withOutline ? 'badge-outline' : ''}`}><Slot /></span>;
});
