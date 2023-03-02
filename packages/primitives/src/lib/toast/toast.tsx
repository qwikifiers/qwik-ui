import { component$ } from '@builder.io/qwik';
interface ToastProps {
  /**
   * The controlled state of the toast.
   */
  label?: string;
  class?: string;
}

export const Toast = component$(
  ({ label = 'New Message', ...toastProps }: ToastProps) => {
    return (
      <div {...toastProps}>
        <span>{label}</span>
      </div>
    );
  }
);
