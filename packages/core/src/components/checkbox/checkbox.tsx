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
    <div className="form-control" {...props}>
      <label className="label cursor-pointer">
        {label && <span className="label-text">{label}</span>}
        <input
          type="checkbox"
          checked={checked}
          className="checkbox"
          onChange$={props.onChange$}
        />
      </label>
    </div>
  );
});
