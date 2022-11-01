import {component$, Slot} from '@builder.io/qwik';
import {ColorTypes, Positions} from "../../types/types";

interface TooltipProps {
  class?: string;
  className?: string;
  tip: string;
  type?: ColorTypes;
  position?: Positions;
}

export const Tooltip = component$(({ tip, position = 'top', type, ...props}: TooltipProps) => {
  return (
    <div className={`tooltip tooltip-${position} ${type ? `tooltip-${type}` : ''}`} data-tip={tip} {...props}><Slot /></div>
  );
});
