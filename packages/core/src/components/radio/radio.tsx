import { component$, PropFunction } from '@builder.io/qwik';

interface RadioProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
  name?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Radio = component$((props: RadioProps) => {
  const { label, name = 'radio-1' } = props;
  return (
    <div class="form-control">
      <label class="label cursor-pointer">
        {label && <span class="label-text">{label}</span>}
        <input
          type="radio"
          name={name}
          class="radio"
          onChange$={props.onChange$}
          {...props}
        />
      </label>
    </div>
  );
});
