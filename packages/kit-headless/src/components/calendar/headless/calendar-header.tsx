import {
  component$,
  isSignal,
  PropsOf,
  Slot,
  useComputed$,
  useContext,
} from '@builder.io/qwik';
import { QwikDateCtxId } from './context';
import { MONTHS_LG } from '../core';

export const CalendarHeader = component$<PropsOf<'header'>>((props) => {
  return (
    <header {...props} data-header>
      <Slot />
    </header>
  );
});

export const CalendarHeaderTitle = component$<PropsOf<'div'>>((props) => {
  const { locale, dateToRender } = useContext(QwikDateCtxId);

  //BUG: we need to use `useComputed$` to update the month label bc for some reason in qwik >= 1.5.4 it doesn't update if you use the constant object directly in the JSX
  const monthToDisplay = useComputed$(() => {
    return MONTHS_LG[isSignal(locale) ? locale.value : locale][
      dateToRender.value.getMonth()
    ];
  });

  return (
    <div
      role="presentation"
      aria-live="polite"
      id="qwik-date-heading"
      data-header-content
      {...props}
    >
      {monthToDisplay} {dateToRender.value.getFullYear()}
    </div>
  );
});
