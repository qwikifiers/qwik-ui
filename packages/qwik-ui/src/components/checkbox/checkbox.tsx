import {component$, PropFunction, $} from '@builder.io/qwik';

interface CheckboxProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const Checkbox = component$(({ checked, label, onChange = $(() => {}), ...props }: CheckboxProps) => {
  return (
    <div className="form-control" {...props}>
      <label className="label cursor-pointer">
        {label && <span className="label-text">{label}</span>}
        <input type="checkbox" checked={checked} className="checkbox" onChange$={onChange} />
      </label>
    </div>
  );
});
