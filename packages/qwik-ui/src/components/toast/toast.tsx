import { component$ } from '@builder.io/qwik';

interface ToastProps {
  message: string;
}

export const Toast = component$(({ message }: ToastProps) => {
  return (
    <div class="toast">
      <div class="alert alert-info">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
});
