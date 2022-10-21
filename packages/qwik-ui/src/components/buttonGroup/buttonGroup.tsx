import {component$, Slot} from '@builder.io/qwik';

interface ButtonGroupProps {
  class?: string;
  className?: string;
  vertical?: boolean;
}

export const ButtonGroup = component$((props: ButtonGroupProps) => {
  return (
    <div class={`btn-group ${props.vertical && 'btn-group-vertical'}`} aria-label="outlined button group" {...props}><Slot/></div>
  );
});
