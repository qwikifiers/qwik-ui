import { Slot, component$ } from '@builder.io/qwik';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';
export interface Kit {
  kit: 'headless' | 'fluffy';
}
export default component$(({ kit }: Kit) => {
  return (
    <a
      href={`/docs/${kit}/introduction`}
      class="rounded-3xl border-2 overflow-hidden 
      hover:-outline-offset-4 hover:outline-4 hover:outline hover:outline-[var(--qwik-light-blue)] hover:scale-[1.025] 
            focus:-outline-offset-4 focus:outline-4 focus:outline focus:outline-[var(--qwik-light-blue)] focus:scale-[1.025] duration-150"
    >
      <Card>
        <CardImage
          src={`/images/kit-cta-${kit}.png`}
          width="611"
          height="408"
          alt={`${kit} kit`}
          class="bg-gradient-to-r from-[var(--qwik-light-blue)] 
          to-[var(--qwik-light-purple)] h-64 w-full object-cover"
        />
        <CardBody class={`px-8 py-6`}>
          <CardTitle class="text-xl font-bold">
            {kit.charAt(0).toUpperCase() + kit.slice(1)} Kit
          </CardTitle>
          <p class="mt-2 leading-normal">
            <Slot />
          </p>
        </CardBody>
      </Card>
    </a>
  );
});
