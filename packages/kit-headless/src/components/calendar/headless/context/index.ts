import type { Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';
import { Locale } from '../../core';

export const QwikDateCtxId = createContextId<QwikDateCtx>('Qwik-Date');

export type Month =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';
export type DefaultDate = `${number}-${Month}-${number}`;

export type QwikDateCtx = {
  // triggerRef: Signal<HTMLButtonElement | undefined>;
  // contentId: string;
  defaultDate: Signal<DefaultDate>;
  activeDate: Signal<DefaultDate>;
  monthToRender: Signal<Month>;
  yearToRender: Signal<number>;
  locale: Locale;
};
