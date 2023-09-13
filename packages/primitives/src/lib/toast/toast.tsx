import { QwikIntrinsicElements } from '@builder.io/qwik';

export type ToastProps = QwikIntrinsicElements['div'] & {
  label?: string;
};

export const Toast = ({ label = 'New Message', ...toastProps }: ToastProps) => {
  return (
    <div {...toastProps}>
      <span>{label}</span>
    </div>
  );
};
