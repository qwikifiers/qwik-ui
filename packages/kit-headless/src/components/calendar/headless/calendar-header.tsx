import { component$, PropsOf, Slot, useContext } from '@builder.io/qwik';
import { MONTHS_LG } from '../core';
import { QwikDateCtxId } from './context';

export const Header = component$<PropsOf<'header'>>((props) => {
  return (
    <header {...props}>
      <Slot />
    </header>
  );
});

export const HeaderTitle = component$<PropsOf<'div'>>((props) => {
  const { locale, monthToRender, yearToRender } = useContext(QwikDateCtxId);

  const monthStr = MONTHS_LG[locale][+monthToRender.value - 1];
  const title = `${monthStr} ${yearToRender.value}`;

  return (
    <div aria-live="polite" role="presentation" {...props}>
      {title}
    </div>
  );
});
