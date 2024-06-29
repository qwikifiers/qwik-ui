import { MONTHS_LG, MONTHS_SM } from '../constants';
import { DateFormat, Separator } from '../types';

interface Props {
  date: string | Date;
  dateFormat: DateFormat;
  separator?: Separator;
  locale?: 'en' | 'es';
}

export function formatDate({ date, dateFormat, separator, locale }: Props) {
  const formatSeparator = dateFormat.toLowerCase().replace(/[dmy]/gi, '').split('') as [
    Separator,
    Separator,
  ];

  const [sepDay, sepMoth] = [
    separator ?? formatSeparator[0],
    separator ?? formatSeparator[1],
  ];
  const dateToWorkWith =
    date instanceof Date
      ? date.toISOString().split('T')[0]
      : date.includes('T')
        ? date.split('T')[0]
        : date;
  const [year, month, day] = dateToWorkWith.split('-');

  const countD = dateFormat.split('d').length - 1;
  const countM = dateFormat.toLowerCase().split('m').length - 1;
  const countY = dateFormat.toLowerCase().split('y').length - 1;

  const isUpperCase = dateFormat.includes('M');

  let monthFormatted = '';

  if (isUpperCase) {
    monthFormatted =
      countM === 3
        ? MONTHS_SM[locale ?? 'en'][Number(month) - 1]
        : MONTHS_LG[locale ?? 'en'][Number(month) - 1];
  } else {
    monthFormatted = countM === 2 ? month : Number(month).toString();
  }

  const dayFormatted = countD === 2 ? day : Number(day).toString();
  const yearFormatted = countY === 2 ? year.slice(2) : year;

  // generate the date format based on the dateFormat and separator. Not always is the same order, everything depends on the dateFormat
  const rawFormattedDate = dateFormat
    .toLocaleLowerCase()
    .replace(/y+/gi, yearFormatted)
    .replace(/d+/gi, dayFormatted)
    .replace(/m+/gi, monthFormatted);

  // now we need to replace the separators for the ones that the user wants, replace all the possible separators in all the possible combinations
  const formattedDate = rawFormattedDate
    .replace(/[-./]/g, sepDay)
    .replace(/[-./]/g, sepMoth);

  return formattedDate;
}

export const generateMinDate = (activeDate: Date) => {
  const minDateYear = activeDate.getFullYear() - 100;
  return new Date(minDateYear, 0, 1);
};

export const generateMaxDate = (activeDate: Date) => {
  const maxDateYear = activeDate.getFullYear() + 100;
  return new Date(maxDateYear, 11, 31);
};

export const validateDateString = (date: string) => {
  const dateToValidate = new Date(date);
  return dateToValidate instanceof Date && !isNaN(dateToValidate.getTime());
};
