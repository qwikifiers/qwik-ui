import { $, Slot, component$ } from '@builder.io/qwik';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { CreditCard, ICreditCard } from '@qwik-ui/headless';

export const MainExample = component$(() => {
  const handleSubmit = $((data: ICreditCard) => {
    console.log(data);
  });
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <CreditCard handleSubmit={handleSubmit} />
      </div>
      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
