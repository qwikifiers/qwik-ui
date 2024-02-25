import {
  component$,
  Slot,
  type PropsOf,
  useContext,
  useTask$,
  useSignal,
  $,
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

  const isHighlighted = !disabled && context.highlightedIndexSig.value === index;
  const isSelected = !disabled && context.selectedIndexSig.value === index;

  useTask$(function getIndexTask() {
    if (index === undefined)
      throw Error('Qwik UI: Select component option cannot find its proper index.');

    localIndexSig.value = index;

    context.optionRefsArray.value[index] = optionRef;
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
      aria-selected={isSelected}
      aria-disabled={disabled === true ? 'true' : 'false'}
      data-selected={isSelected ? '' : undefined}
      data-highlighted={isHighlighted ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      role="option"
    >
      <Slot />
    </li>
  );
});
