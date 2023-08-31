import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { clsq } from '@qwik-ui/shared';
import styles from './spinner.css?inline';

export type SpinnerProps = {
  class?: string;
  style?: string;
  width?: string;
  trackColor?: string;
  indicatorColor?: string;
  speed?: string;
};

export const Spinner = component$((props: SpinnerProps) => {
  const {
    style,
    class: classNames,
    width = '2px',
    trackColor = '#8080803f',
    indicatorColor = '#006ce9',
    speed = '2s',
  } = props;
  useStylesScoped$(styles);
  return (
    <div class={clsq('spinner-container', classNames)} style={style}>
      <svg part="base" class="spinner" role="spinner">
        <circle
          class="track"
          r={`calc(0.5em - ${width}/2)`}
          style={{
            strokeWidth: width,
            stroke: trackColor,
          }}
        ></circle>
        <circle
          class="indicator"
          r={`calc(0.5em - ${width}/2)`}
          style={{
            strokeWidth: width,
            stroke: indicatorColor,
            animation: `spin ${speed} linear infinite`,
          }}
        ></circle>
      </svg>
    </div>
  );
});
