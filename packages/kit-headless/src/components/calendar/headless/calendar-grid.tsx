import {
  $,
  component$,
  isSignal,
  PropsOf,
  Slot,
  useComputed$,
  useContext,
} from '@builder.io/qwik';
import { QwikDateCtxId } from './context';
import { generateDaysGrid, WEEKDAYS } from '../core';
import { getClientLocalDate } from '../core/utils/timezone-formatter';

export const CalendarGrid = component$<PropsOf<'table'>>((props) => {
  return (
    <table {...props} role="grid" aria-labelledby="qwik-date-heading" data-calendar-table>
      <Slot />
    </table>
  );
});

export const CalendarWeekdays = component$<PropsOf<'thead'>>((props) => {
  const { locale } = useContext(QwikDateCtxId);

  return (
    <thead {...props}>
      <tr data-calendar-weekdays>
        {WEEKDAYS[isSignal(locale) ? locale.value : locale].map((day) => (
          <th key={day} scope="col" aria-label={day} data-calendar-weekday>
            {day
              .slice(0, 2)
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')}
          </th>
        ))}
      </tr>
    </thead>
  );
});

export const CalendarDays = component$<PropsOf<'button'>>((props) => {
  const {
    dateToRender,
    minDate,
    maxDate,
    completeWeeks,
    locale,
    activeDate,
    defaultDate,
  } = useContext(QwikDateCtxId);

  const daysArr = useComputed$(() => {
    return generateDaysGrid({
      activeDate: dateToRender.value,
      minDate: minDate.value,
      maxDate: maxDate.value,
      completeWeeks: isSignal(completeWeeks) ? completeWeeks.value : completeWeeks,
    });
  });

  const intlFormat = new Intl.DateTimeFormat(isSignal(locale) ? locale.value : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'UTC',
  });

  const validateIfDisabled = (props: {
    day: string | null;
    minDate: Date;
    maxDate: Date;
  }) => {
    const { day, minDate, maxDate } = props;
    if (!day) return true;

    const localMinDate = getClientLocalDate({
      date: minDate,
      locale: isSignal(locale) ? locale.value : locale,
    });

    const localMaxDate = getClientLocalDate({
      date: maxDate,
      locale: isSignal(locale) ? locale.value : locale,
    });

    const outOfDates = day >= localMaxDate || day < localMinDate;
    const outOfMonth =
      day.split('-')[1] !==
      getClientLocalDate({
        date: dateToRender.value,
        locale: isSignal(locale) ? locale.value : locale,
      }).split('-')[1];

    return outOfDates || outOfMonth;
  };

  const validateIfSelected = (props: { day: string | null; activeDate: Date | null }) => {
    const { day, activeDate } = props;
    if (!day) return false;

    if (!activeDate) return false;

    const localActiveDate = getClientLocalDate({
      date: activeDate,
      locale: isSignal(locale) ? locale.value : locale,
    });

    return day === localActiveDate;
  };

  const realDefaultDate =
    defaultDate ??
    getClientLocalDate({
      date: new Date(),
      locale: isSignal(locale) ? locale.value : locale,
    });

  return (
    <tbody role="rowgroup">
      {daysArr.value.days.map((arr) => (
        <tr key={arr.join('')} data-calendar-row>
          {arr.map((day, idx) => {
            const disabled = validateIfDisabled({
              day,
              minDate: minDate.value,
              maxDate: maxDate.value,
            });

            const isSelected = validateIfSelected({
              day,
              activeDate: activeDate.value,
            });

            return (
              <td
                role="presentation"
                key={idx}
                aria-disabled={disabled}
                data-calendar-cell
              >
                {day && (
                  <button
                    {...props}
                    role="gridcell"
                    name="day"
                    tabIndex={day === realDefaultDate ? 0 : -1}
                    type="button"
                    aria-selected={isSelected}
                    onClick$={[
                      props.onClick$,
                      $(() => {
                        // convert `day` to a Date object but respecting the client's timezone (is UTC by default)
                        const currentTZ = new Date().getTimezoneOffset();
                        const rawDateObject = new Date(day + 'T00:00:00Z');
                        rawDateObject.setMinutes(currentTZ);
                        activeDate.value = rawDateObject;
                      }),
                    ]}
                    aria-label={intlFormat.format(new Date(day))}
                    data-value={day}
                    disabled={disabled}
                    data-qwik-date-day
                    data-preselected={day === realDefaultDate}
                  >
                    {day.split('-')[2]}
                  </button>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
});
