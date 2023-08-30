import { ComboboxContext, Option } from './combobox-context.type';

export function getOptionLabel(option: undefined | Option, labelKey: string): string {
  if (option == null) {
    return '';
  }

  if (typeof option === 'string') {
    return option;
  }

  const label = option[labelKey] as unknown;
  if (typeof label !== 'string') {
    throw new Error(
      'Qwik UI: Combobox optionLabelKey was not provided, and the option was not a string. Please provide a value for optionLabelKey, use the property name "label", or ensure that the option is a string.'
    );
  }
  return label;
}

export const isOptionDisabled = (index: number, context: ComboboxContext): boolean => {
  const option = context.optionsSig.value[index]?.option;
  if (!option) {
    return true;
  }

  if (typeof option === 'string') {
    return false;
  }

  return !!option[context.optionDisabledKey];
};

export const getNextEnabledOptionIndex = (index: number, context: ComboboxContext) => {
  let offset = 1;
  let currentIndex = index;
  while (
    isOptionDisabled((currentIndex + offset) % context.optionsSig.value.length, context)
  ) {
    offset++;
    if (offset + currentIndex > context.optionsSig.value.length - 1) {
      currentIndex = 0;
      offset = 0;
    }
  }
  return (currentIndex + offset) % context.optionsSig.value.length;
};

export const getPrevEnabledOptionIndex = (index: number, context: ComboboxContext) => {
  let offset = 1;
  let currentIndex = index;
  while (
    isOptionDisabled(
      (currentIndex - offset + context.optionsSig.value.length) %
        context.optionsSig.value.length,
      context
    )
  ) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = context.optionsSig.value.length - 1;
      offset = 0;
    }
  }
  return (
    (currentIndex - offset + context.optionsSig.value.length) %
    context.optionsSig.value.length
  );
};
