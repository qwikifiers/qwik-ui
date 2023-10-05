import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/tailwind';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;

    }`);
  return (
    <div class="mt-4 flex flex-col gap-8">
      <h2>This is the documentation for the Checkbox</h2>

      <h1>With label start</h1>
      <div class="w-[80px]">
        <Checkbox label="test" />
      </div>

      <h1>With label start</h1>
      <div class="w-[80px]">
        <Checkbox label="test" labelPosition="end" />
      </div>

      <h1>Size</h1>
      <div class="w-[80px]">
        <Checkbox class="checkbox-xs" checked />
        <Checkbox class="checkbox-sm" checked />
        <Checkbox class="checkbox-md" checked />
        <Checkbox class="checkbox-lg" checked />
      </div>

      <h1>Disabled</h1>
      <div class="w-[80px]">
        <Checkbox disabled checked />
      </div>

      <h1>Primary</h1>
      <div class="w-[80px]">
        <Checkbox label="test" labelPosition="end" class="checkbox-primary" />
      </div>

      <h1>Secondary</h1>
      <div class="w-[80px]">
        <Checkbox label="test" labelPosition="end" class="checkbox-secondary" />
      </div>
    </div>
  );
});
