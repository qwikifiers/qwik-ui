import { Signal } from '@builder.io/qwik';

export type SelectContext = {
  options: HTMLElement[];
  selection: Signal<string | null | undefined>;
  isExpanded: Signal<boolean>;
  triggerRef: Signal<HTMLElement | undefined>;
  listBoxRef: Signal<HTMLElement | undefined>;
};
