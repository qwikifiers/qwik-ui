import type { PropsOf, QRL, Signal } from '@builder.io/qwik';
import { component$, useContextProvider, Slot, useId, useSignal } from '@builder.io/qwik';
import type {
  Direction,
  Orientation,
  ToggleGroupBaseContext,
} from './toggle-group-context';
import {
  toggleGroupBaseContextId,
  toggleGroupValueContextId,
} from './toggle-group-context';
import { useToggleGroup } from './use-toggle';

export type ToggleGroupBaseProps = {
  /**
   * When true, prevents the user from interacting with the toggle group and all its items.
   */
  disabled?: boolean;
};

type ToggleGroupNavigationProps = {
  /**
   * The orientation of the component, which determines how focus moves:
   * horizontal for left/right arrows and vertical for up/down arrows.
   * Default to (left-to-right) reading mode.
   */
  orientation?: Orientation;
  /**
   * The reading direction of the toggle group.
   * Default to (left-to-right) reading mode.
   */
  direction?: Direction;
  /**
   * When true
   * keyboard navigation will loop from last item to first, and vice versa.
   */
  loop?: boolean;
  //TODO: props below
  // Additional props for div
  //   [key: string]: any;
};

export type ToggleGroupSingleProps = {
  /**
   * Determines if multi selection is enabled.
   */
  multiple?: false;
  /**
   * The value of the pressed item when initially rendered.
   * Use `defaultValue` if you do not need to control the state of a toggle group (items).
   */
  defaultValue?: string;
  /**
   * The controlled value of the pressed item.
   * Must be used in conjunction with onValueChange.
   */
  value?: string;

  /**
   * The callback that fires when the value of the toggle group changes.
   * Event handler called when the pressed state of an item changes.
   */
  onValueChange$?: QRL<(value: string) => void>;
  /**
   * Controlling the pressed state with a bounded value.
   */
  'bind:value'?: Signal<string>;
};

export type ToggleGroupMultipleProps = {
  /**
   * Determines if multi selection is enabled.
   */
  multiple?: true;
  /**
   * The value of the pressed item when initially rendered.
   * Use `defaultValue` if you do not need to control the state of a toggle group (items).
   */
  defaultValue?: string[];
  /**
   * The controlled value of the pressed item.
   * Must be used in conjunction with onValueChange.
   */
  value?: string[];
  /**
   * The callback that fires when the value of the toggle group changes.
   * Event handler called when the pressed state of an item changes.
   */
  onValueChange$?: QRL<(value: string[]) => void>;
  /**
   * Controlling the pressed state with a bounded value.
   */
  'bind:value'?: Signal<string[]>;
};

export type ToggleGroupApiProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) &
  ToggleGroupBaseProps &
  ToggleGroupNavigationProps;

export type ToggleGroupRootProps = PropsOf<'div'> & ToggleGroupApiProps;

export const HToggleGroupRoot = component$<ToggleGroupRootProps>((props) => {
  const {
    onValueChange$: _,
    disabled = false,
    orientation = 'horizontal',
    direction = 'ltr',
    loop = false,
    ...divProps
  } = props;

  const rootId = useId();

  const itemsRefs = useSignal<Map<string, Signal>>(new Map());

  const commonProps = { role: 'group', 'aria-orientation': orientation, dir: direction };
  const orientationClass = orientation === 'vertical' ? 'flex-col' : 'flex-row';

  const contextValue = useToggleGroup(props);

  const contextBase: ToggleGroupBaseContext = {
    disabled,
    orientation,
    direction,
    rootId,
    loop,
    itemsRefs,
  };

  useContextProvider(toggleGroupBaseContextId, contextBase);
  useContextProvider(toggleGroupValueContextId, contextValue);

  return (
    <div
      {...divProps}
      {...commonProps}
      class={`flex ${orientationClass} items-center gap-1`}
      data-qui-togglegroup-root
    >
      <Slot />
    </div>
  );
});
