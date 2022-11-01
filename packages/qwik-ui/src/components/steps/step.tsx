import { component$, Slot } from '@builder.io/qwik';

interface StepProps {
  class?: string;
  className?: string;
  isPrimary?: boolean;
  dataContent?: string;
}

export const Step = component$(({isPrimary = false, dataContent, ...props }: StepProps) => {
  return (
    <li data-content={dataContent} className={`step ${isPrimary ? 'step-primary' : ''}`} {...props}><Slot/></li>
  );
});
