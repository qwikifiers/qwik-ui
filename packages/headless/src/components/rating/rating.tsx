import {
  $,
  Component,
  component$,
  PropFunction,
  Slot,
  useId,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import styles from './rating.css?inline';

export type RatingProps = {
  value?: number;
  total?: number;
  icon?: Component<{}>;
  onChange$?: PropFunction<(index: number) => void>;
};

export const Rating = component$((props: RatingProps) => {
  const { value, total = 5, onChange$ } = props;
  const uniqueId = useId();

  useStyles$(styles);
  const state = useStore({
    index: 0,
    tempIndex: 0,
  });

  const onItemClick$ = $((index: number) => {
    state.index = index;
    if (onChange$) {
      onChange$(index + 1);
    }
  });
  return (
    <span class="wrapper">
      {new Array(total).fill('').map((item, i) => {
        const Icon = props.icon || DefaultIcon;
        return (
          <RatingIcon
            key={useId()}
            name={`rating-${uniqueId}`}
            index={i}
            onChange$={() => onItemClick$(i)}
            value={value}
          >
            <Icon />
          </RatingIcon>
        );
      })}
    </span>
  );
});

/**
 * Rating Icon
 */
interface RatingIconProps {
  index: number;
  name: string;
  value?: number;
  onChange$: PropFunction<() => void>;
}
export const RatingIcon = component$((props: RatingIconProps) => {
  const { index, name, value } = props;

  return (
    <>
      <label for={`${name}-${index}`}>
        <Slot />
      </label>
      <input
        onChange$={props.onChange$}
        hidden
        type="radio"
        checked={value === index + 1}
        name={name}
        id={`${name}-${index}`}
      />
    </>
  );
});

/**
 * Default Icon
 */
export const DefaultIcon = component$(() => <>⭐️</>);
