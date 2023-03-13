export type ToastProps = {
  /**
   * The controlled state of the toast.
   */
  label?: string;
  class?: string;
  /**
   * Aria role: default 'status'.
   * @description The toast uses the html element output, which has implicit role 'status'
   * For information that requires an immediate attention of the user use 'alert'.
   */
  role?: 'alert' | 'status';
}

export const Toast = ({ label = 'New Message', ...toastProps }: ToastProps) => {
  return (
    <output {...toastProps}>
      <span>{label}</span>
    </output>
  );
};
