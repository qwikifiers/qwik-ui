export type ToastProps = {
  /**
   * The controlled state of the toast.
   */
  label?: string;
  class?: string;
}

export const Toast = ({ label = 'New Message', ...toastProps }: ToastProps) => {
  return (
    <div {...toastProps}>
      <span>{label}</span>
    </div>
  );
};
