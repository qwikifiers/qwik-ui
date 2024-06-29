import {
  $,
  Component,
  component$,
  isSignal,
  PropsOf,
  useContext,
} from '@builder.io/qwik';
import { ARIA_LABELS, generateInlineMonthsObject } from '../core';
import { QwikDateCtxId } from './context';

const LeftArrow = component$<PropsOf<'svg'>>((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
    />
  </svg>
));

const RightArrow = component$<PropsOf<'svg'>>((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
    />
  </svg>
));

interface CalendarArrowProps extends PropsOf<'button'> {
  svgProps?: PropsOf<'svg'>;
  icon?: Component;
}

export const CalendarNext = component$<CalendarArrowProps>(
  ({ svgProps = {}, icon, ...props }) => {
    const Icon = icon ?? RightArrow;

    Icon;
    svgProps;

    const { locale, maxDate, minDate, dateToRender } = useContext(QwikDateCtxId);

    const nextAriaLabel = ARIA_LABELS[isSignal(locale) ? locale.value : locale].next;

    const goToNextMonth = $(() => {
      const { nextDate } = generateInlineMonthsObject({
        activeDate: dateToRender.value,
        minDate: minDate.value,
        maxDate: maxDate.value,
      });

      if (nextDate == null) return;

      dateToRender.value = nextDate;
    });

    return (
      <button
        aria-label={nextAriaLabel}
        {...props}
        onClick$={[goToNextMonth, props.onClick$]}
        data-header-action
      >
        {/* <Icon {...svgProps} data-header-icon /> */}
        Next
      </button>
    );
  },
);

export const CalendarPrevious = component$<CalendarArrowProps>(
  ({ svgProps = {}, icon, ...props }) => {
    const Icon = icon ?? LeftArrow;

    Icon;
    svgProps;

    const { locale, maxDate, minDate, dateToRender } = useContext(QwikDateCtxId);

    const previousAriaLabel =
      ARIA_LABELS[isSignal(locale) ? locale.value : locale].previous;

    const goToPrevMonth = $(() => {
      const { prevDate } = generateInlineMonthsObject({
        activeDate: dateToRender.value,
        minDate: minDate.value,
        maxDate: maxDate.value,
      });

      if (prevDate == null) return;

      dateToRender.value = prevDate;
    });

    return (
      <button
        aria-label={previousAriaLabel}
        {...props}
        onClick$={[goToPrevMonth, props.onClick$]}
        data-header-action
      >
        {/* <Icon {...svgProps} data-header-icon /> */}
        Previous
      </button>
    );
  },
);
