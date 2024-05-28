import type { Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';
import { Locale } from '../../core';

export const QwikDateCtxId = createContextId<QwikDateCtx>('Qwik-Date');

export type CalendarState = 'open' | 'closed';

export type QwikDateCtx = {
  triggerRef: Signal<HTMLButtonElement | undefined>;
  contentId: string;
  completeWeeks: Signal<boolean> | boolean;
  minDate: Readonly<Signal<Date>>;
  maxDate: Readonly<Signal<Date>>;
  defaultDate: string | undefined;
  activeDate: Signal<Date | null>;
  dateToRender: Signal<Date>;
  locale: Signal<Locale> | Locale;
};
