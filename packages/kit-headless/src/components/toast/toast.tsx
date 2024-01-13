import { PropsOf } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

export type ToastProps = PropsOf<'div'> & {
  label?: string;
};

export const Toast = ({
  label = 'New Message',
  ...toastProps
}: ToastProps): JSX.Element => {
  return (
    <div {...toastProps}>
      <span>{label}</span>
    </div>
  );
};
