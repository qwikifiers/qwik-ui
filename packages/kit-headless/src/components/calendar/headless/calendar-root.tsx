import {
  component$,
  PropsOf,
  Signal,
  Slot,
  useComputed$,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { DefaultDate, Month, QwikDateCtx, QwikDateCtxId } from './context';
import { Locale, MONTHS_LG } from '../core';
import { daysArrGenerator } from '../core/utils/date-generator';
// import { daysArrGenerator } from "../core/utils/date-generator";

const regex = /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/;

/**  
 * API
 * calendar -> root,
      cell -> button (I think we should call this <Calendar.Date />),
      content -> tbody (<Calendar.Content />),
      field -> tr (<Calendar.Row />)
      grid -> table (<Calendar.Grid />),
      heading -> thead (<Calendar.Header />), 
      label -> a11y name,(<Calendar.Label />)
      nextButton -> trigger (<Calendar.Next />),
      prevButton -> another trigger XD (<Calendar.Previous />),
      segment -> td (<Calendar.Cell />),
      trigger -> (<Calendar.Trigger />),

      ----------------------------

      <Calendar.Root>
        <Calendar.Label>Date</Calendar.Label> // this is not necessary YET
        <Calendar.Header>
          <Calendar.Row>
          <Calendar.Day />
          </Calendar.Row>
        </Calendar.Header>
        
        <Calendar.Grid>
          <Calendar.Row>
            <Calendar.Cell>
              <Calendar.Date />
            </Calendar.Cell>
          </Calendar.Row>
        </Calendar.Grid>
      </Calendar.Root>
  */

interface Props extends PropsOf<'div'> {
  date?: DefaultDate;
  'bind:date'?: Signal<DefaultDate>;
  locale?: Locale;
}

export type RootProps = Props &
  (
    | { fullWeeks?: boolean; 'bind:dates': Signal<(number | null)[][]> }
    | { fullWeeks: true; 'bind:dates': Signal<number[][]> }
    | { fullWeeks: false; 'bind:dates': Signal<(number | null)[][]> }
  );

export const RootImpl = component$<RootProps>(
  ({ date: defaultDateProp, locale, fullWeeks, ...props }) => {
    const date = new Date().toISOString().split('T')[0] as DefaultDate;

    const labelStr = props['aria-label'] ?? 'Actual Date is:';

    // signals
    const dateSignal = useSignal<DefaultDate>(defaultDateProp ?? date);
    const defaultDate = props['bind:date'] ?? dateSignal;
    const activeDate = useSignal<DefaultDate>(defaultDate.value);
    const monthToRender = useSignal<Month>(defaultDate.value.split('-')[1] as Month);
    const yearToRender = useSignal<number>(+defaultDate.value.split('-')[0]);

    // computed
    const labelSignal = useComputed$(() => {
      const [year, month] = activeDate.value.split('-');

      return `${labelStr} ${MONTHS_LG[locale ?? 'en'][+month - 1]} ${year}`;
    });

    // validators
    if (!regex.test(defaultDate.value))
      throw new Error(
        'Invalid date format in Calendar Root. Please use YYYY-MM-DD format.',
      );

    // context
    const ctx: QwikDateCtx = {
      defaultDate,
      activeDate,
      locale: locale ?? 'en',
      monthToRender,
      yearToRender,
    };

    useContextProvider(QwikDateCtxId, ctx);

    // tasks
    useTask$(({ track }) => {
      const datesArr = props['bind:dates'];
      track(() => ctx.monthToRender.value);
      track(() => ctx.yearToRender.value);

      const dates = daysArrGenerator({
        month: ctx.monthToRender.value,
        year: `${ctx.yearToRender.value}`,
        fullWeeks,
      });

      props['bind:dates'].value = dates;

      if (dates && datesArr && ctx.monthToRender && ctx.yearToRender) {
        datesArr.value = dates;
      }
    });

    return (
      <div
        onKeyDown$={(e, target) => {
          console.log({ e, target });
        }}
        role="application"
        aria-label={labelSignal.value}
        {...props}
      >
        {/* <div>{JSON.stringify(props["bind:dates"].value, null, 2)}</div> */}
        <Slot />
      </div>
    );
  },
);
