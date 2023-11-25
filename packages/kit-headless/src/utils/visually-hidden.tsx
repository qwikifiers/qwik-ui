import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useStylesScoped$,
} from '@builder.io/qwik';

type VisuallyHiddenProps = QwikIntrinsicElements['span'];

export const VisuallyHidden = component$((props: VisuallyHiddenProps) => {
  useStylesScoped$(`
    .visually-hidden {
        display: inline-block;
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0px;
        border: 0px;
    }
`);

  return (
    <span {...props} class="visually-hidden">
      <Slot />
    </span>
  );
});
