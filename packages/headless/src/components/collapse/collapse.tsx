import { component$ } from '@builder.io/qwik';

export interface CollapseProps {
  whatever?: string;
}

export const Collapse = component$(({ whatever }: CollapseProps) => {
  return <div>Collapse</div>;
});
