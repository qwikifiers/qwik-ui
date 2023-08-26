import { component$, HTMLAttributes, useComputed$ } from '@builder.io/qwik';

const ORIENTATIONS = ['horizontal', 'vertical'] as const;

type Orientation = (typeof ORIENTATIONS)[number];

export interface SeparatorProps extends HTMLAttributes<HTMLElement> {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * If true, accessibility-related attributes
   * are updated so that that the element is not included in the accessibility tree.
   */
  decorative?: boolean;
}

export const Separator = component$(
  ({
    orientation: orientationProp = 'horizontal',
    decorative,
    ...props
  }: SeparatorProps) => {
    const orientation = useComputed$(() => {
      if (ORIENTATIONS.includes(orientationProp)) {
        return orientationProp;
      }

      console.warn(
        `Invalid prop 'orientation' of value '${orientationProp}' supplied to 'separator',
        expected one of:
        - horizontal
        - vertical

        Defaulting to 'horizontal'.`
      );
      return 'horizontal';
    });

    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = useComputed$(() =>
      orientation.value === 'vertical' ? orientation : undefined
    );

    const semanticProps = useComputed$(() =>
      decorative
        ? { role: 'none' }
        : {
            role: 'separator',
            'aria-orientation': ariaOrientation
          }
    );

    return <div data-orientation={orientation} {...semanticProps} {...props} />;
  }
);
