import { component$ } from '@builder.io/qwik';
import { Toaster as Sonner } from 'qwik-sonner';

type ToasterProps = typeof Sonner;
export const Toaster = component$<ToasterProps>(({ ...props }) => {
  return (
    <Sonner
      class="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:shadow',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:shadow',
        },
      }}
      {...props}
    />
  );
});
