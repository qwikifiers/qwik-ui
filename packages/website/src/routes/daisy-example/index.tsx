import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Collapse } from '@qwik-ui/daisy';

export default component$(() => {
  return (
    <div>
      <div style="width: 300px">
        <Collapse label="Hi Glenn and Gil!" showPlus={true}>
          <div class="text-center">QwikUI 🚀</div>
        </Collapse>
      </div>

      {/* hack to prevent tailwind purge */}
      <div class="collapse collapse-title text-xl font-medium collapse-content max-h-fit" />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
