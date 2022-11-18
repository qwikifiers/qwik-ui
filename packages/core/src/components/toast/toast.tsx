import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import {
  MessageTypes,
  VerticalOptions,
  HorizontalOptions,
  WithClassesProp,
} from '../../types';

interface ToastProps extends WithClassesProp {
  message: string;
  type: MessageTypes;
  verticalAlign?: VerticalOptions;
  horizontalAlign?: HorizontalOptions;
}

export const Toast = component$(
  ({
    message,
    type,
    verticalAlign = 'bottom',
    horizontalAlign = 'end',
    class: classProp = '',
    className = '',
    ...props
  }: ToastProps) => {
    const cssClass = cn(
      'toast',
      {
        [`toast-${verticalAlign}`]: true,
        [`toast-${horizontalAlign}`]: true,
      },
      classProp,
      className
    );
    const alertClass = cn('alert', { [`alert-${type}`]: true });
    return (
      <div class={cssClass} {...props}>
        <div class={alertClass}>
          <div>
            <span>{message}</span>
          </div>
        </div>
      </div>
    );
  }
);
