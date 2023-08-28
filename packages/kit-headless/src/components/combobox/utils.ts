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

export function getDisabledOption(option: undefined | Option, context: ComboboxContext) {
  if (option === undefined) {
    return undefined;
  }

  if (typeof option === 'string') {
    return option;
  }

  const disabledKey = context.optionDisabledKey ?? 'disabled';

  return option[disabledKey];
}

export const isOptionDisabled = (index: number, context: ComboboxContext) => {
  const option = context.options.value[index] as Option;

  if (!option) {
    return false;
  }

  if (index > context.options.value.length) {
    return true;
  }

  if (typeof option === 'object' && option !== null) {
    return option[context.optionDisabledKey ?? 'disabled'];
  }

  return false;
};

export const getNextEnabledOptionIndex = (index: number, context: ComboboxContext) => {
  let offset = 1;
  let currentIndex = index;
  while (
    isOptionDisabled((currentIndex + offset) % context.options.value.length, context)
  ) {
    offset++;
    if (offset + currentIndex > context.options.value.length - 1) {
      currentIndex = 0;
      offset = 0;
    }
  }
  return (currentIndex + offset) % context.options.value.length;
};

export const getPrevEnabledOptionIndex = (index: number, context: ComboboxContext) => {
  let offset = 1;
  let currentIndex = index;
  while (
    isOptionDisabled(
      (currentIndex - offset + context.options.value.length) %
        context.options.value.length,
      context
    )
  ) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = context.options.value.length - 1;
      offset = 0;
    }
  }
  return (
    (currentIndex - offset + context.options.value.length) % context.options.value.length
  );
};
