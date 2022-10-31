import { component$, Slot } from '@builder.io/qwik';

interface ToggleProps {
  class?: string;
  className?: string;
  checked: boolean;
  label?: string;
}

export const Toggle = component$(({checked, label}: ToggleProps) => {
  return (
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" value="" checked={checked} id="default-toggle" class="sr-only peer" />
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      {label && <span className="label-text ml-2">{label}</span>}
    </label>
  );
});
