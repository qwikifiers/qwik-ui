import { Locale } from '../types';

export const getClientTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getClientLocalDate = ({ date, locale }: { date: Date; locale?: Locale }) => {
  const month = date.toLocaleDateString(locale, {
    timeZone: getClientTimeZone(),
    month: '2-digit',
  });
  const day = date.toLocaleDateString(locale, {
    timeZone: getClientTimeZone(),
    day: '2-digit',
  });
  const year = date.toLocaleDateString(locale, {
    timeZone: getClientTimeZone(),
    year: 'numeric',
  });

  return `${year}-${month}-${day}`;
};
