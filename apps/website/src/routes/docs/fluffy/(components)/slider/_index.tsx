import { component$, useSignal } from '@builder.io/qwik';
import { Slider } from '@qwik-ui/tailwind';

export default component$(() => {
  const sliderValue = useSignal(55);

  return (
    <div class="mt-4 flex flex-col gap-8">
      <h2>This is the documentation for the Slider</h2>

      <div class="mt-4 flex flex-col gap-8">
        <div>
          <h2>Basic Example</h2>
          <div class="panel">
            <Slider value={40} max={100} min={20} variant="primary" />
            <Slider value={50} max={100} min={20} variant="secondary" />
            <Slider value={60} max={100} min={20} variant="accent" />
            <Slider value={70} max={100} min={20} variant="success" />
            <Slider value={80} max={100} min={20} variant="warning" />
            <Slider value={90} max={100} min={20} variant="error" />
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-8">
        <h2>Value: {sliderValue.value}</h2>
        <Slider
          value={sliderValue.value}
          onChange$={(value) => {
            sliderValue.value = value;
          }}
          max={100}
          min={0}
          variant="accent"
        />
      </div>
    </div>
  );
});
