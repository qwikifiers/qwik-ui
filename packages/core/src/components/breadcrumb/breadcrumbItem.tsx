import {component$} from '@builder.io/qwik';

interface BreadcrumbItemProps {
  class?: string;
  className?: string;
  navigationUrl?: string;
  label?: string
}

export const BreadcrumbItem = component$(({ navigationUrl, label, ...props }: BreadcrumbItemProps) => {
  return (
    <li><a href={navigationUrl} {...props}>{label}</a></li>
  );
});
