import { component$, PropsOf, useContext } from '@builder.io/qwik';
import { WEEKDAYS } from '../core';
import { QwikDateCtxId } from './context';

export const DaysOfWeek = component$<PropsOf<'th'>>((props) => {
  const { ...rest } = props;
  const { locale } = useContext(QwikDateCtxId);

  const daysOfWeek = WEEKDAYS[locale];

  return (
    <>
      {daysOfWeek.map((day) => (
        <th key={day} scope="col" aria-label={day} {...rest}>
          {
            day
              .slice(0, 2)
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // remove accents, special things on letters, etc.
          }
        </th>
      ))}
    </>
  );
});
