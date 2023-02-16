import { component$ } from '@builder.io/qwik';
interface ToastProps {
  value?: string;
  /**
   * The controlled state of the toast.
   */

  label?: string;
  alert?: string;
  /**
   * The state of the toast when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toast.
   * @defaultValue false
   */
}

export const Toast = component$((props: ToastProps) => {
  const { alert = 'info', label, ...toastProps } = props;

  return (
    <div class="toast" style={{ position: 'absolute' }} {...toastProps}>
      <div
        class={`alert alert-${alert}`}
        style={{ background: alert === 'error' ? 'red' : 'auto' }}
      >
        <div>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
});
