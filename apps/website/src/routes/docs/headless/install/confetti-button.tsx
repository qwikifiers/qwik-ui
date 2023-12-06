import { component$, useSignal } from '@builder.io/qwik';
// @ts-ignore
import confetti from 'canvas-confetti';

export const ConfettiButton = component$(() => {
  const buttonRef = useSignal<HTMLButtonElement>();
  return (
    <div class="relative my-6 flex justify-center">
      <div class="relative">
        <button
          ref={buttonRef}
          onClick$={async () => {
            if (!buttonRef.value) return;
            const rect = buttonRef.value.getBoundingClientRect();

            if (!rect) return;

            // so it's always on top of the button
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = rect.top / window.innerHeight;

            await confetti({
              colors: ['#02B9FC', '#B57DFC'],
              origin: {
                x,
                y,
              },
            });
          }}
          class="shadow-dark-low z-1 bg-primary text-primary-foreground relative h-[44px] rounded-lg px-3 font-bold"
          id="add-confetti-button"
        >
          Woohoo! 🎉
        </button>
      </div>
    </div>
  );
});
