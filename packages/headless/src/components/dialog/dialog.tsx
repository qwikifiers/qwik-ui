import {
  $,
  component$,
  Slot,
  useOnWindow,
  useStore,
  useTask$,
} from '@builder.io/qwik';

export interface DialogProps {
  /* controls whether Dialog is open */
  open: boolean;

  /** controls whether the Dialog stretches of the the whole screen */
  // TODO: Improve typing yo only accept valid media queries.
  fullScreen?: string;
}

export const Dialog = component$((props: DialogProps) => {
  const state = useStore({
    fullScreen: false,
    fullScreenStyle: '',
  });

  // TODO: Find a better way setting up this event listener
  //       We only need it when fullScreen is specified in the props.
  // TODO: Debounce resize event
  useOnWindow(
    'resize',
    $((event) => {
      const window = event.target;

      if (!(window instanceof Window)) return;
      if (!props.fullScreen) return;

      const mediaQueryList = window.matchMedia(props.fullScreen);

      mediaQueryList.matches
        ? (state.fullScreen = true)
        : (state.fullScreen = false);
    })
  );

  useTask$(({ track }) => {
    track(() => state.fullScreen);

    if (state.fullScreen) {
      state.fullScreenStyle = 'width: 100%; height: 100%; top: 0';
    } else {
      state.fullScreenStyle = '';
    }
  });

  return (
    <>
      {props.open}
      <dialog open={props.open} style={state.fullScreenStyle}>
        <Slot></Slot>
      </dialog>
    </>
  );
});
