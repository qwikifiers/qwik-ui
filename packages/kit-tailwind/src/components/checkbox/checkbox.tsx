import { component$ } from '@builder.io/qwik';
import { Checkbox as HeadlessCheckbox } from '@qwik-ui/headless';

export interface CheckboxProps extends HeadlessCheckbox.CheckboxProps {
  label?: string;
  class?: string;
  labelPosition?: 'end' | 'start';
}

// TODO: discuss this

export const Checkbox = component$((props: CheckboxProps) => {
  const { class: classNames, label, labelPosition, ...rest } = props;
  return (
    <HeadlessCheckbox.Label class="label cursor-pointer">
      {labelPosition === 'start' ||
        (!labelPosition && <span class="label-text">{label}</span>)}
      <HeadlessCheckbox.Root class={['checkbox', classNames]} {...rest} />
      {labelPosition === 'end' && <span class="label-text">{label}</span>}
    </HeadlessCheckbox.Label>
  );
});
