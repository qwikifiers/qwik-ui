import { component$ } from '@builder.io/qwik';
import { MessageTypes, VerticalOptions, HorizontalOptions } from '../../types/types';

interface ToastProps {
  message: string;
  type: MessageTypes;
  verticalAlign?: VerticalOptions;
  horizontalAlign?: HorizontalOptions;
}

export const Toast = component$(({ message, type, verticalAlign = 'bottom', horizontalAlign = 'end' }: ToastProps) => {
  return (
    <div class={`toast toast-${verticalAlign} toast-${horizontalAlign}`}>
      <div class={`alert alert-${type}`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
});
