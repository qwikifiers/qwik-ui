import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      Root Documentation Page
      {/* hack to prevent tailwind purge */}
      <div
        style={{ display: 'none' }}
        class={`collapse border border-base-300 rounded-box collapse-arrow collapse-plus
                collapse-title text-xl font-medium collapse-content max-h-fit tabs tabs-boxed
                tab tab-active tab-bordered tab-lifted form-control abel cursor-pointer toggle label-text
                drawer
                drawer-toggle
                btn btn-primary drawer-button
                drawer-side
                drawer-overlay
                btn
                btn-primary
                btn-secondary
                btn-accent
                btn-info
                btn-success
                btn-warning
                btn-error
                btn-ghost
                btn-link
                btn-outline
                btn-active
                btn-disabled
                
                glass
                loading
                no-animation
                
                btn-xs
                btn-sm
                btn-md
                btn-lg
                btn-wide
                btn-block
                btn-circle
                btn-square
                `}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI',
};
