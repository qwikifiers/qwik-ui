import { formatDate } from './date-formatter';

interface MonthsProps {
  activeDate: Date;
  minDate: Date;
  maxDate: Date;
}
interface InlineMonthsObject {
  nextDate: Date | null;
  prevDate: Date | null;
}
export function generateInlineMonthsObject({
  maxDate,
  minDate,
  activeDate,
}: MonthsProps): InlineMonthsObject {
  if (minDate > maxDate) {
    throw new Error('minimum month/year cannot be greater than maximum month/year');
  }

  // constants
  const actualMonth = activeDate.getMonth();
  const actualYear = activeDate.getFullYear();
  const minDateMonth = minDate.getMonth();
  const minDateYear = minDate.getFullYear();
  const maxDateMonth = maxDate.getMonth();
  const maxDateYear = maxDate.getFullYear();

  let nextDate: Date | null = null;
  let prevDate: Date | null = null;

  if (actualYear === maxDateYear && actualMonth === maxDateMonth) nextDate = maxDate;

  if (actualYear === minDateYear && actualMonth === minDateMonth) prevDate = minDate;

  if (
    actualYear < maxDateYear ||
    (actualYear === maxDateYear && actualMonth < maxDateMonth)
  )
    nextDate = new Date(actualYear, actualMonth + 1);

  if (
    actualYear > minDateYear ||
    (actualYear === minDateYear && actualMonth > minDateMonth)
  )
    prevDate = new Date(actualYear, actualMonth - 1);

  return {
    nextDate,
    prevDate,
  };
}

interface DaysProps {
  activeDate: Date;
  minDate: Date;
  maxDate: Date;
  completeWeeks: boolean;
}
export function generateDaysGrid({
  activeDate,
  minDate,
  maxDate,
  completeWeeks = false,
}: DaysProps) {
  if (minDate > maxDate) {
    throw new Error('minimum date cannot be greater than maximum date');
  }

  // constants to generate the days grid
  const daysInMonth = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth() + 1,
    0,
  ).getDate(); // --> 28 - 31
  const firstDayIndex = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth(),
    1,
  ).getDay(); // --> 0 - 6 = Sunday - Saturday
  const lastDayIndex = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth() + 1,
    0,
  ).getDay(); // --> 0 - 6 = Sunday - Saturday

  const days: (string | null)[][] = []; // --> an array of arrays with the dates of the month (6 weeks max)
  let day = 1; // --> the first day of the month
  const prevMonthDays = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth(),
    0,
  ).getDate(); // --> 28 - 31
  let nextMonthDay = 1;

  while (
    day <= daysInMonth || // --> while the day is less than or equal to the days in the month
    (completeWeeks && (days[days.length - 1]?.length ?? 0) < 7) // --> while the last week is not complete and completeWeeks is true
  ) {
    const week: (string | null)[] = []; // --> the days of the week
    for (let i = 0; i < 7; i++) {
      // if the first week is not complete
      if (days.length === 0 && i < firstDayIndex) {
        week.push(
          completeWeeks
            ? getPrevMonthDate(activeDate, prevMonthDays, firstDayIndex, i) // --> get the previous month dates for the first week
            : null,
        );
      }
      // if the day is less than or equal to the days in the month
      else if (day <= daysInMonth) {
        week.push(getCurrentMonthDate(activeDate, day++));
      }
      // if the last week is not complete and completeWeeks is true
      else if (completeWeeks) {
        week.push(getNextMonthDate(activeDate, nextMonthDay++));
      }
      // if the last week is complete or completeWeeks is false
      else {
        week.push(null);
      }
    }
    days.push(week);
  }
  return {
    days,
    firstDayIndex,
    lastDayIndex,
  };
}

// generate the previous month dates for the first week
const getPrevMonthDate = (
  activeDate: Date,
  prevMonthDays: number,
  firstDayIndex: number,
  i: number,
) => {
  const prevDay = prevMonthDays - firstDayIndex + i + 1;
  const prevMonth = activeDate.getMonth() === 0 ? 11 : activeDate.getMonth() - 1;
  const prevYear =
    activeDate.getMonth() === 0 ? activeDate.getFullYear() - 1 : activeDate.getFullYear();
  return formatDate({
    date: new Date(prevYear, prevMonth, prevDay),
    dateFormat: 'yyyy-mm-dd',
  });
};

// generate the current month dates
const getCurrentMonthDate = (activeDate: Date, day: number) => {
  return formatDate({
    date: new Date(activeDate.getFullYear(), activeDate.getMonth(), day),
    dateFormat: 'yyyy-mm-dd',
  });
};

// generate the next month dates for the last week
const getNextMonthDate = (activeDate: Date, nextMonthDay: number) => {
  const nextMonth = activeDate.getMonth() === 11 ? 0 : activeDate.getMonth() + 1;
  const nextYear =
    activeDate.getMonth() === 11
      ? activeDate.getFullYear() + 1
      : activeDate.getFullYear();
  return formatDate({
    date: new Date(nextYear, nextMonth, nextMonthDay),
    dateFormat: 'yyyy-mm-dd',
  });
};
