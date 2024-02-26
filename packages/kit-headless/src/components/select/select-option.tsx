import {
  component$,
  Slot,
  type PropsOf,
  useContext,
  useTask$,
  useSignal,
  $,
  useComputed$,
} from '@builder.io/qwik';
import SelectContextId from './select-context';

export type SelectOptionProps = PropsOf<'li'> & {
  index?: number;
  disabled?: boolean;
};

export const SelectOption = component$<SelectOptionProps>((props) => {
  /* look at select-inline on how we get the index. */
  const { index, disabled, ...rest } = props;
  const context = useContext(SelectContextId);
  const optionRef = useSignal<HTMLLIElement>();
  const localIndexSig = useSignal<number | null>(null);

  const isSelectedSig = useComputed$(() => {
    return !disabled && context.selectedIndexSig.value === index;
  });

  const isHighlightedSig = useComputed$(() => {
    return !disabled && context.highlightedIndexSig.value === index;
  });

  useTask$(function getIndexTask() {
    if (index === undefined)
      throw Error('Qwik UI: Select component option cannot find its proper index.');

    localIndexSig.value = index;
  });

  const handleClick$ = $(() => {
    if (disabled) return;

    context.selectedIndexSig.value = localIndexSig.value;
    context.isListboxOpenSig.value = false;
  });

  const handlePointerOver$ = $(() => {
    if (disabled) return;

    if (localIndexSig.value !== null) {
      context.highlightedIndexSig.value = localIndexSig.value;
    }
  });

  return (
    <li
      {...rest}
      onClick$={[handleClick$, props.onClick$]}
      onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
      ref={optionRef}
      tabIndex={-1}
      aria-selected={isSelectedSig.value}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-selected={isSelectedSig.value ? '' : undefined}
      data-highlighted={isHighlightedSig.value ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      role="option"
    >
      <Slot />
    </li>
  );
});
