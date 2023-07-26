import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useOn,
  $,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectListBoxProps = QwikIntrinsicElements['ul'];

export const SelectListBox = component$((props: SelectListBoxProps) => {
  const ref = useSignal<HTMLElement>();
  const selectContext = useContext(SelectContextId);
  selectContext.listBoxRef = ref;

  const keyHandler$ = $((event: Event) => {
    const e = event as KeyboardEvent;

    if (
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'Home' ||
      e.key === 'End' ||
      e.key === ' '
    ) {
      e.preventDefault();
    }

    const availableOptions = selectContext.options.filter(
      (option) => !(option?.getAttribute('aria-disabled') === 'true')
    );
    const target = e.target as HTMLElement;
    const currentIndex = availableOptions.indexOf(target);

    if (e.key === 'ArrowDown') {
      if (currentIndex === availableOptions.length - 1) {
        availableOptions[0]?.focus();
      } else {
        availableOptions[currentIndex + 1]?.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      if (currentIndex <= 0) {
        availableOptions[availableOptions.length - 1]?.focus();
      } else {
        availableOptions[currentIndex - 1]?.focus();
      }
    }
  });

  useOn('keydown', keyHandler$);

  return (
    <ul
      ref={ref}
      role="listbox"
      tabIndex={0}
      style={`
      display: ${selectContext.isExpanded.value ? 'block' : 'none'};
      position: absolute;
      z-index: 1;
      ${props.style}
    `}
      class={props.class}
    >
      <Slot />
    </ul>
  );
});
