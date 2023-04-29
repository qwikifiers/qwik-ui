import { component$, Slot, useContext } from '@builder.io/qwik';
import { sliderContext } from './slider';

export const SliderProgress = component$(({ style }: { style?: string }) => {
  const contextService = useContext(sliderContext);

  return (
    <div
      style={`
        display: block;
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        width: ${contextService.percentage.value}%;
        background: rgb(0,117,255);
        ${style ?? ''}
      `}
    >
      <Slot />
    </div>
  );
});
