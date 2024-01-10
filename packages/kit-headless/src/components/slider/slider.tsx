import {
  PropFunction,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';

export const getPercentage = (value: number, min = 0, max = 100) => {
  return ((value - min) * 100) / (max - min);
};

interface SliderContextService {
  value: Signal<number>;
  min: Signal<number>;
  max: Signal<number>;
  positionX: Signal<number | undefined>;
  percentage: Signal<number>;
}

export const sliderContext = createContextId<SliderContextService>('slider');

export type SliderProps = QwikIntrinsicElements['div'] & {
  value: number;
  min: number;
  max: number;
  onChange$?: PropFunction<(value: number) => void>;
};

export const Slider = component$(
  ({
    value = 0,
    min = 0,
    max = 100,
    onChange$,
    style,
    class: classNames,
  }: SliderProps) => {
    const rootPositionRef = useSignal<Element>();
    const sliderValue = useSignal(value);
    const minSignal = useSignal(min);
    const maxSignal = useSignal(max);
    const positionXSignal = useSignal<number | undefined>();
    const percentageSignal = useSignal(getPercentage(value, min, max));

    const contextService: SliderContextService = {
      value: sliderValue,
      min: minSignal,
      max: maxSignal,
      positionX: positionXSignal,
      percentage: percentageSignal,
    };

    useVisibleTask$(async ({ track }) => {
      track(() => rootPositionRef);
      contextService.positionX.value = rootPositionRef.value?.getBoundingClientRect().x;
    });

    useVisibleTask$(async ({ track }) => {
      const newValue = track(() => sliderValue.value);
      if (onChange$) {
        onChange$(newValue);
      }
      contextService.percentage.value = getPercentage(newValue, min, max);
    });

    useContextProvider(sliderContext, contextService);

    return (
      <div
        ref={rootPositionRef}
        style={`
          display: inline-block;
          position: relative;
          border: solid 1px rgb(178,178,178);
          border-radius: 4px;
          background: rgb(239,239,239);
          width: 100px;
          height: 6px;
          ${style ?? ''}
        `}
        class={classNames}
      >
        <Slot />
      </div>
    );
  },
);
