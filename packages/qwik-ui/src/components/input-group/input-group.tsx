import { component$, PropFunction } from '@builder.io/qwik';

interface InputGroupProps {
  hint: string;
  label: string;
  placeholder?: string;
  onChange?: PropFunction<(evt: InputEvent) => void>;
}

export const InputGroup = component$(
  ({ hint, label, placeholder, onChange }: InputGroupProps) => {
    return (
      <div class="form-control">
        <label class="label">
          <span class="label-text">{hint}</span>
        </label>
        <label class="input-group">
          <span>{label}</span>
          <input
            type="text"
            placeholder={placeholder}
            class="input input-bordered"
            onChange$={onChange}
          />
        </label>
      </div>
    );
  }
);
