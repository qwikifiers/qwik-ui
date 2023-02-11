import { component$, createContext, useContext, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import {
  Rating as HeadlessRating, RatingProps,
} from '@qwik-ui/headless';
import styles from './rating.css?inline';


export type DaisyRatingProps = {
  /**
   * Daisy Custom mask
   * https://daisyui.com/components/mask/
   */
  mask?: string;
} & RatingProps

export const ContextService = createContext<{ mask: string }>('my-context');

export const Rating = component$(
  (props: DaisyRatingProps) => {
    useStyles$(styles)
    const { mask = 'mask-star bg-yellow-500', ...rest } = props;

    const state = useStore({ mask });
    useContextProvider(ContextService, state);

    return (
      <div className="rating gap-1">
        <HeadlessRating
          {...rest}
          icon={props.icon || DaisyIcon}
        />
      </div>
    );
  }
);


export const DaisyIcon = component$(
  () => {
    const state = useContext(ContextService);
    return <div className={`w-4 h-4 mask ${state.mask} `} />
  })

