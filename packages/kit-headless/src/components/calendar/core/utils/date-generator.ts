import { Month } from '../../headless/context';

export const daysArrGenerator = ({
  month,
  year,
  fullWeeks = false,
}: {
  month: Month;
  year: string;
  fullWeeks?: boolean;
}) => {
  const date = new Date(+year, +month - 1, 1);
  const firstDayOfWeek = date.getDay();
  const daysInMonth = new Date(+year, +month, 0).getDate();

  const weeks = [];
  let currentWeek = [];

  // Fill the previous month's days if fullWeeks is true
  if (fullWeeks) {
    // Previous month's details
    const prevMonth = new Date(+year, +month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    // Fill the previous month's days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      currentWeek.push(daysInPrevMonth - i);
    }
  } else {
    // Fill the previous days with nulls
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
  }

  // Fill the current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }

  // Fill the next month's days if fullWeeks is true
  if (fullWeeks) {
    let nextMonthDay = 1;

    while (currentWeek.length < 7) {
      currentWeek.push(nextMonthDay++);
    }
    weeks.push(currentWeek);

    while (weeks.length < 6) {
      currentWeek = [];
      for (let i = 0; i < 7; i++) {
        currentWeek.push(nextMonthDay++);
      }
      weeks.push(currentWeek);
    }
  } else {
    // Fill the rest of the last week with nulls
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};
