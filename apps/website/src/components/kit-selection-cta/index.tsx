import { Slot, component$ } from '@builder.io/qwik';
import { Card, CardBody, CardImage, CardTitle } from '@qwik-ui/headless';
export interface Kit {
  kit: 'headless' | 'fluffy';
}
export const KitSelectionCTA = component$(({ kit }: Kit) => {
  return (
    <a
      href={`/docs/${kit}/introduction`}
      class="overflow-hidden rounded-3xl border-2 
      duration-150 hover:scale-[1.025] hover:outline hover:outline-4 hover:-outline-offset-4 
            hover:outline-[var(--qwik-light-blue)] focus:scale-[1.025] focus:outline focus:outline-4 focus:-outline-offset-4 focus:outline-[var(--qwik-light-blue)]"
    >
      <Card>
        <CardImage
          src={`/images/fluffy-hero.webp`}
          width="611"
          height="408"
          alt={`${kit} kit`}
          class="h-64 w-full 
          bg-gradient-to-r from-[var(--qwik-light-blue)] to-[var(--qwik-light-purple)] object-cover"
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
