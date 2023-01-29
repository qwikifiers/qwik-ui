import { component$, useStore } from '@builder.io/qwik';
import { Dialog } from '@qwik-ui/headless';

export default component$(() => {
  const dialog = useStore({ isOpen: false, fullscreenBoundaryPx: '600' });

  return (
    <>
      <h2>This is the documentation for the Dialog</h2>
      <br />
      <button onClick$={() => (dialog.isOpen = true)}>👉 Open Dialog</button>
      <br />
      <br />
      🛠️ Go fullscreen (max-width:{' '}
      <input
        value={dialog.fullscreenBoundaryPx}
        onInput$={(ev) =>
          (dialog.fullscreenBoundaryPx = (ev.target as HTMLInputElement).value)
        }
      />
      px)
      <hr />
      <Dialog
        open={dialog.isOpen}
        fullScreen={`(max-width: ${dialog.fullscreenBoundaryPx}px)`}
      >
        <>
          <button onClick$={() => (dialog.isOpen = false)}>Close</button>
        </>
      </Dialog>
    </>
  );
});
