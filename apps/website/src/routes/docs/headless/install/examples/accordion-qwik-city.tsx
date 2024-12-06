import { PropsOf, component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

export default component$(() => {
  const cats = [
    'Admiral Turbo Meowington',
    'Edger Allen Paw',
    'Captain Sushi',
    'Fernsbane The Inquisitive',
  ];

  return (
    <Accordion.Root class="box-border w-[250px] max-w-[500px] rounded-base border border-slate-500 bg-slate-600 text-white">
      {cats.map((item, index) => (
        <Accordion.Item class="w-full" key={index}>
          <Accordion.Header as="h3">
            <Accordion.Trigger
              class={`group flex min-h-[44px] w-full items-center justify-between ${
                index === 0 ? 'rounded-t-sm' : ''
              } ${
                index === cats.length - 1
                  ? 'rounded-b-sm border-b-[0px]'
                  : 'border-b-[1px]'
              } border-slate-500 bg-slate-600 px-4 py-2 text-left hover:bg-slate-700`}
            >
              <span>favorite cat {index + 1}</span>
              <span class="pl-2">
                <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-animation-1 overflow-hidden">
            <p class="bg-slate-900 p-4 ">{item}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});

export function SVG(props: PropsOf<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"
      ></path>
    </svg>
  );
}
