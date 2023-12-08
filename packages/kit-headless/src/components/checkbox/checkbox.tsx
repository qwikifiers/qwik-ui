import {
  PropFunction,
  QwikChangeEvent,
  QwikIntrinsicElements,
  Slot,
  component$,
} from '@builder.io/qwik';

export type LabelProps = QwikIntrinsicElements['label'] & {
  htmlFor?: string;
};

export const Label = component$(({ ...props }: LabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});

export type CheckboxProps = QwikIntrinsicElements['input'] & {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  ariaLabel?: string;
  id?: string;
  value?: string;
  tabIndex?: number;
  onChange$?: PropFunction<
    (event: QwikChangeEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >;
};

export const Root = component$(
  ({
    checked,
    disabled,
    name,
    ariaLabel,
    id,
    value,
    tabIndex,
    onChange$,
    ...props
  }: CheckboxProps) => {
    return (
      <input
        type="checkbox"
        role="checkbox"
        checked={checked}
        disabled={disabled}
        name={name}
        id={id}
        aria-label={ariaLabel}
        aria-checked={checked}
        value={value}
        tabIndex={tabIndex}
        onChange$={(event, element) => {
          if (onChange$) {
            onChange$(event, element);
          }
        }}
        {...props}
      />
    );
  },
);
