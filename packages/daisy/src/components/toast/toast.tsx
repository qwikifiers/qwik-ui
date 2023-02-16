import { component$ } from '@builder.io/qwik';
import { Toast as HeadlessToast } from '@qwik-ui/headless';

interface ToastProps {
  class?: string;
  top?: boolean;
  center?: boolean;
  end?: boolean;
  middle?: boolean;
  bottom?: boolean;
  start?: boolean;
  label?: string;
  alert?: string;
}

export const Toast = component$((props: ToastProps) => {
  const { label, top, start, center, end, middle, bottom, alert, ...rest } =
    props;

  return (
    <div class="form-control">
      <label class="label cursor-pointer">
        <div
          style={{
            position: 'relative',
            border: 'solid',
            width: '480px',
            height: '240px',
            borderRadius: '12px',
            background: 'rgb(220,220,220)',
          }}
        >
          <HeadlessToast
            alert={alert}
            label={label}
            class={`toast ${start && 'toast-start'} ${top && 'toast-top'} ${
              center && 'toast-center'
            } ${end && 'toast-end'} ${middle && 'toast-middle'} ${
              bottom && 'toast-bottom'
            }`}
            {...rest}
          />
        </div>
      </label>
    </div>
  );
});
