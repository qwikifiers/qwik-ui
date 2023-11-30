export interface ToggleInit extends EventInit {
  oldState: string;
  newState: string;
}

export class ToggleEvent extends Event {
  public oldState: string;
  public newState: string;
  constructor(
    type: string,
    { oldState = '', newState = '', ...init }: Partial<ToggleInit> = {},
  ) {
    super(type, init);
    this.oldState = String(oldState || '');
    this.newState = String(newState || '');
  }
}

const popoverToggleTaskQueue = new WeakMap<HTMLElement, unknown>();
export function queuePopoverToggleEventTask(
  element: HTMLElement,
  oldState: string,
  newState: string,
) {
  popoverToggleTaskQueue.set(
    element,
    setTimeout(() => {
      if (!popoverToggleTaskQueue.has(element)) return;
      element.dispatchEvent(
        new ToggleEvent('toggle', {
          cancelable: false,
          oldState,
          newState,
        }),
      );
    }, 0),
  );
}
