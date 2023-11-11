import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

export type SlidePickerProps = QwikIntrinsicElements['div'] & {
  currentSlide?: number;
  totalSlides?: number;
};

export const CarouselSlidePicker = component$<SlidePickerProps>(
  ({ ...props }: SlidePickerProps) => {
    return (
      <div {...props}>
        {/* {Array.from({ length: totalSlides }).map((_, index) => (
          <button key={index} aria-selected={index === currentSlide}>
            {index + 1}
          </button>
        ))} */}
        <Slot />
      </div>
    );
  },
);

/*

slidePicker.tsx: This optional component represents a control for choosing a specific slide. It should receive the current slide state and a callback for updating it from the Carousel component.

*/
