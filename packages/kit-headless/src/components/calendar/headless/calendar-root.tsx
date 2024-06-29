import {
  $,
  component$,
  isSignal,
  PropsOf,
  Signal,
  Slot,
  sync$,
  useComputed$,
  useContextProvider,
  useId,
  useOnWindow,
  useSignal,
} from '@builder.io/qwik';
import { QwikDateCtx, QwikDateCtxId } from './context';
import { generateMaxDate, generateMinDate, Locale } from '../core';

interface RootProps extends PropsOf<'div'> {
  completeWeeks?: Signal<boolean> | boolean;
  defaultDate?: Date | string;
  minDate?: Date;
  maxDate?: Date;
  locale?: Signal<Locale> | Locale;
  theme?: 'light' | 'dark' | 'system';
  dir?: 'ltr' | 'rtl' | 'auto';
}

export const CalendarRoot = component$<RootProps>(
  ({
    completeWeeks = false,
    defaultDate,
    dir,
    maxDate: maxDateProp,
    locale,
    minDate: minDateProp,
    theme = 'system',
    ...props
  }) => {
    if (
      minDateProp &&
      maxDateProp &&
      minDateProp?.toString() === maxDateProp?.toString()
    ) {
      throw new Error(
        'minDate and maxDate cannot be the same date, please provide a valid range of dates',
      );
    }

    if (minDateProp && maxDateProp && minDateProp > maxDateProp) {
      throw new Error(
        'minimum date cannot be greater than maximum date, please provide a valid range of dates',
      );
    }

    const defaultDateParsed = defaultDate ? new Date(defaultDate) : new Date();

    // signals
    const activeDate = useSignal<Date | null>(null);
    const dateToRender = useSignal<Date>(defaultDateParsed);

    // computed values
    const minDate = useComputed$<Date>(
      () => minDateProp ?? generateMinDate(defaultDateParsed),
    );
    const maxDate = useComputed$<Date>(
      () => maxDateProp ?? generateMaxDate(defaultDateParsed),
    );

    // refs
    const triggerRef = useSignal<HTMLButtonElement>();
    const rootEl = useSignal<HTMLDivElement>();

    // constants
    const formatDefaultDate =
      defaultDate instanceof Date
        ? defaultDate.toISOString().split('T')[0]
        : defaultDate?.split('T')[0];

    // context stuffs
    const localId = useId();
    const contentId = `${localId}-content`;
    const ctx: QwikDateCtx = {
      triggerRef,
      contentId,
      minDate,
      maxDate,
      defaultDate: formatDefaultDate,
      dateToRender,
      locale: isSignal(locale) ? locale : locale ?? 'en',
      completeWeeks,
      activeDate,
    };

    useContextProvider(QwikDateCtxId, ctx);

    useOnWindow(
      'DOMContentLoaded',
      $(() => {
        if (!rootEl.value) {
          throw new Error('Content ref not found');
        }

        function onMountThemeHandler() {
          const selectedTheme = rootEl.value?.getAttribute('data-theme');

          if (selectedTheme !== 'system') return;

          const themeFromLocalStorage = localStorage.getItem('theme');
          const themeFromMediaQuery =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';

          rootEl.value?.setAttribute(
            'data-theme',
            themeFromLocalStorage ?? themeFromMediaQuery,
          );

          localStorage.setItem('theme', themeFromLocalStorage ?? themeFromMediaQuery);
        }

        function onMountDirHandler() {
          const dir = rootEl.value?.getAttribute('dir');
          if (dir && dir !== 'auto') return;

          const newDir = window.getComputedStyle(document.documentElement).direction;
          rootEl.value?.setAttribute('dir', newDir);

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                const value = (mutation.target as HTMLElement).getAttribute('dir');
                if (value === 'auto' || !value) {
                  return rootEl.value?.setAttribute('dir', newDir);
                }
                rootEl.value?.setAttribute('dir', value);
              }
            });
          });

          observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir'],
          });
        }

        onMountThemeHandler();
        onMountDirHandler();
      }),
    );

    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    });

    const updateTabIndex = $((e: KeyboardEvent, target: HTMLDivElement) => {
      const rows = target.querySelectorAll('[data-calendar-row]');
      const focusedEl = target.querySelector(':focus') as HTMLButtonElement;

      const isNotDayBtn = !focusedEl.hasAttribute('data-qwik-date-day');

      if (isNotDayBtn) return;

      const tr = Array.from(rows).filter((row) =>
        row.contains(focusedEl),
      )[0] as HTMLTableRowElement;
      if (!focusedEl.parentElement) return;
      const index = Array.from(tr.children).indexOf(focusedEl.parentElement);

      if (e.key.toLowerCase() === 'arrowdown') {
        const nextRow = focusedEl.closest('tr')?.nextElementSibling;
        const nextDay = Array.from(nextRow?.children ?? [])[index].querySelector(
          '[data-qwik-date-day]',
        ) as HTMLButtonElement;

        // if (rows[rows.length - 1].contains(focusedEl.parentElement)) {
        // }

        focusedEl.setAttribute('tabindex', '-1');
        nextDay.setAttribute('tabindex', '0');
        nextDay?.focus();
      }

      if (e.key.toLowerCase() === 'arrowup') {
        const prevRow = focusedEl.closest('tr')?.previousElementSibling;
        const prevDay = Array.from(prevRow?.children ?? [])[index].querySelector(
          '[data-qwik-date-day]',
        ) as HTMLButtonElement;
        if (rows[0].contains(focusedEl)) {
          return console.log('first row');
        }

        focusedEl.setAttribute('tabindex', '-1');
        prevDay.setAttribute('tabindex', '0');
        prevDay?.focus();
      }

      if (e.key.toLowerCase() === 'arrowright') {
        const nextDay = Array.from(tr.children)[index + 1].querySelector(
          '[data-qwik-date-day]',
        ) as HTMLButtonElement;

        if (index === tr.children.length - 1) {
          return console.log('last column');
        }

        focusedEl.setAttribute('tabindex', '-1');
        nextDay.setAttribute('tabindex', '0');
        nextDay?.focus();
      }

      if (e.key.toLowerCase() === 'arrowleft') {
        const prevDay = Array.from(tr.children)[index - 1].querySelector(
          '[data-qwik-date-day]',
        ) as HTMLButtonElement;

        if (index === 0) {
          return console.log('first column');
        }

        focusedEl.setAttribute('tabindex', '-1');
        prevDay.setAttribute('tabindex', '0');
        prevDay?.focus();
      }
    });

    return (
      <div
        {...props}
        data-theme={theme}
        dir={dir}
        data-qwik-date
        ref={rootEl}
        onKeyDown$={[handleKeyDownSync$, updateTabIndex]}
      >
        <Slot />
      </div>
    );
  },
);
