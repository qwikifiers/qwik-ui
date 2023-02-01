import { component$, PropFunction } from '@builder.io/qwik';

interface CheckboxProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
  onChange$?: PropFunction<(event: any) => void>;
}

export const Checkbox = component$((props: CheckboxProps) => {
  const { checked, label } = props;
  return (
    <div class="form-control" {...props}>
      <label class="label cursor-pointer">
        {label && <span class="label-text">{label}</span>}
        <input
          type="checkbox"
          checked={checked}
          class="checkbox"
          onChange$={props.onChange$}
        />
      </label>
    </div>
  );
});
