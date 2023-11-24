import { component$ } from '@builder.io/qwik';
import { Slider, SliderProgress, SliderThumb } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div class="mt-4 flex flex-col gap-8">
      <h2>This is the documentation for the Slider</h2>
      <div class="mt-4 flex flex-col gap-8">
        <div>
          <h2>Basic Example</h2>
          <Slider
            value={70}
            max={100}
            min={20}
            onChange$={(value: number) => {
              console.log(value);
            }}
          >
            <SliderProgress />
            <SliderThumb />
          </Slider>
        </div>
      </div>
    </div>
  );
});
