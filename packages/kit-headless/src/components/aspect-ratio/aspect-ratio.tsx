import { QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';

type aspectRatioProps = QwikIntrinsicElements['div'] & { ratio?: number };

export const AspectRatio = component$<aspectRatioProps>(({ ratio = 1 / 1, ...props }) => {
  return (
    <div
      style={{
        // ensures inner element is contained
        position: 'relative',
        // ensures padding bottom trick maths works
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
      }}
    >
      <div
        {...props}
        style={{
          ...(props.style as object),
          // ensures children expand in ratio
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <Slot />
    </div>
  );
});
