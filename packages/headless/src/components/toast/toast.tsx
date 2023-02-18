import { component$ } from '@builder.io/qwik';
interface ToastProps {
  /**
   * The controlled state of the toast.
   */

  label?: string;
  class?: string;
  /**
   * The state of the toast when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toast.
   * @defaultValue false
   */
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
