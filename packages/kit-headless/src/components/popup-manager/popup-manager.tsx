import {
  Slot,
  component$,
  createContextId,
  useSignal,
  useContextProvider,
  $,
  JSXNode,
  QRL,
  useStylesScoped$,
  Signal
} from '@builder.io/qwik';

// Define public API for the PopupManager
export const PopupManagerContext = createContextId<{
  /**
   * Use to show a popup.
   * @param Component Component to show
   * @param props Props that need to be passed to the component.
   */
  show: QRL<(component: JSXNode) => void>;

  /**
   * Hide the currently shown popup.
   */
  hide: QRL<() => void>;
}>('PopupManager');

export const PopupManager = component$(() => {
  useStylesScoped$(`
    .qwik-modal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 999;

    }
  `);
  const modal = useSignal<JSXNode>();
  console.log('Render: PopupManager');
  // Provide the public API for the PopupManager for other components.
  useContextProvider(PopupManagerContext, {
    show: $((component: JSXNode) => {
      console.log('Show was called!');
      modal.value = component;
    }),
    hide: $(() => {
      modal.value = undefined;
    })
  });
  return (
    <>
      <Slot />
      {console.log('Rendering Modal!!', modal.value)}
      <PortalAnchor modal={modal} />
    </>
  );
});

export const PortalAnchor = component$<{ modal: Signal<JSXNode> }>(({ modal }) => {
  console.log('Render: PortalAnchor');
  return (
    <>
      {
        // Conditionally render the modal
        modal.value && (
          <div class="qwik-modal">
            <h1>SOMETHING STATIC HERE</h1>
            {/* Funky Qwik thing where it doesn't like a single JSXNode */}
            {console.log('modal value here!!', modal.value)}
            {modal.value}
            {[modal.value].map((jsx) => jsx)}
          </div>
        )
      }
    </>
  );
});
