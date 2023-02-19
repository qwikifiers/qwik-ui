import {
  $,
  component$,
  QwikMouseEvent,
  Slot,
  useContext,
  useOnWindow,
  useSignal,
} from '@builder.io/qwik';
import { sliderContext } from './slider';

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(value, min));
};

export const SliderThumb = component$(() => {
  const mouseDownHappenedSignal = useSignal(false);
  const contextService = useContext(sliderContext);

  const handleMouseDown = $((e: QwikMouseEvent) => {
    if (contextService.positionX.value) {
      contextService.value.value = clamp(
        e.pageX - contextService.positionX.value,
        contextService.min.value,
        contextService.max.value
      );
    }
    mouseDownHappenedSignal.value = true;
  });

  useOnWindow(
    'mousemove',
    $((e) => {
      if (contextService.positionX.value && mouseDownHappenedSignal.value) {
        contextService.value.value = clamp(
          (e as MouseEvent).pageX - contextService.positionX.value,
          contextService.min.value,
          contextService.max.value
        );
      }
    })
  );

  useOnWindow(
    'mouseup',
    $((e) => {
      if (contextService.positionX.value && mouseDownHappenedSignal.value) {
        contextService.value.value = clamp(
          (e as MouseEvent).pageX - contextService.positionX.value,
          contextService.min.value,
          contextService.max.value
        );
      }
      mouseDownHappenedSignal.value = false;
    })
  );

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '20px',
        background: 'rgba(0, 0, 250)',
        position: 'absolute',
        transform: 'translateX(-50%) translateY(-50%)',
        top: '50%',
        left: `${contextService.percentage.value}%`,
      }}
      onMouseDown$={handleMouseDown}
    >
      <Slot />
    </div>
  );
});
