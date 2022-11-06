import {component$, PropFunction, $} from '@builder.io/qwik';

interface RadioProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
  name?: string;
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const Radio = component$(({ checked, label, name = 'radio-1', onChange = $(() => {}), ...props }: RadioProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        {label && <span className="label-text">{label}</span>}
        <input type="radio" name={name} className="radio" checked={checked} onChange$={onChange} {...props} />
      </label>
    </div>
  );
});
