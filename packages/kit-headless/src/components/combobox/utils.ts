import { ComboboxContext, Option } from './combobox-context.type';

export function getOptionLabel(option: undefined | Option, context: ComboboxContext) {
  if (option === undefined) {
    return undefined;
  }
  if (typeof option === 'string') {
    return option;
  }

  const labelKey = context.optionLabelKey ?? 'label';
  if (option[labelKey] === undefined) {
    throw new Error(
      'Qwik UI: Combobox optionLabelKey was not provided, and the option was not a string. Please provide a value for optionLabelKey, use the property name "label", or ensure that the option is a string.'
    );
  }
  return option[labelKey];
}
