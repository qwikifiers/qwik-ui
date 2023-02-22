import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './loading-indicator.css?inline';
import { clsq } from '@qwik-ui/shared';

export type LoadingIndicatorProps = {
  class?: string;
  style?: string;
  width?: string;
  trackColor?: string;
  indicatorColor?: string;
  speed?: string;
};

export const LoadingIndicator = component$((props: LoadingIndicatorProps) => {
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
    <div class={clsq('loading-indicator-container', classNames)} style={style}>
      <svg part="base" class="loading-indicator" role="loading-indicator">
        <circle
          class="track"
          style={{
            strokeWidth: width,
            r: `calc(0.5em - ${width}/2)`,
            stroke: trackColor,
          }}
        ></circle>
        <circle
          class="indicator"
          style={{
            strokeWidth: width,
            r: `calc(0.5em - ${width}/2)`,
            stroke: indicatorColor,
            animation: `spin ${speed} linear infinite`,
          }}
        ></circle>
      </svg>
    </div>
  );
});

/*
export type TrackProps = {
  class: string;
  style: string;
}
export const Track = component$(
  (props: TrackProps) => {
    const {class: classNames, style} = props;
    return (
      <circle class={clsq('track', classNames)}
              style={{
                strokeWidth: trackWidth,
                r: `calc(0.5em - ${trackWidth}/2)`,
                stroke: trackColor
              }}
      ></circle>
    )
  }
)
*/
