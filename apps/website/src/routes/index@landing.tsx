import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';

const whyHeadless = [
  {
    emoji: '🧑‍🎨',
    description: 'Create your own components from scratch',
  },
  {
    emoji: '⛓️‍💥',
    description:
      'Use with vanilla CSS, SASS, TailwindCSS, UnoCSS, PandaCSS, or whateverCSS',
  },
  {
    emoji: '🧑‍🎓',
    description:
      'Learn about the headless APIs, accessibility, and the future of the web',
  },
];

const whyStyled = [
  {
    emoji: '😌',
    description: 'Start with well-designed, easy to customize presets',
  },
  {
    emoji: '👏',
    description: 'Avoid code duplication thanks to cva variants',
  },
  {
    emoji: '💫',
    description: "Change your entire app's style & theme at the click of a button",
  },
];

export default component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <h1 class="text-center text-3xl font-bold leading-normal lg:text-5xl">
        <span class="text-primary text-outlined font-black tracking-wide">Qwik</span>{' '}
        <span class="text-secondary font-black tracking-wide">UI</span>
      </h1>
      <h2 class="text-center text-2xl font-bold leading-normal lg:text-4xl">
        The world's fastest loading UI components <br />
        <span class="text-primary text-outlined leading-normal">
          automatically optimized for you
        </span>
      </h2>
      <p class="text-center text-xl font-medium lg:text-2xl">
        Choose a kit and start building the future{' '}
        <span class="hue-rotate-[150deg]">⚡</span>
      </p>
      <div class="mt-4 flex flex-wrap justify-center justify-items-center gap-14">
        <a href={`/docs/headless/introduction`}>
          <Card
            class={cn(
              'ease-step relative block w-full max-w-md rounded-lg shadow-lg outline-1 duration-150 hover:scale-[1.025] focus:scale-[1.025]',
            )}
          >
            <CardImage
              src={`/images/qwik-ui-headless-hero.webp`}
              width="300"
              height="300"
              alt={`styled kit`}
              class="h-64 rounded-t-sm"
            />
            <CardHeader>
              <CardTitle class="text-xl">Headless</CardTitle>
              <CardDescription class="text-lg">
                A headless component library of unstyled, accessible, and resumable
                components for the most creative minds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {whyHeadless.map((pro, index) => (
                  <li key={index} class="mb-5 grid grid-cols-[25px_1fr] items-start">
                    {pro.emoji}
                    <p class="font-medium">{pro.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </a>
        <a href={`/docs/headless/introduction`}>
          <Card class="ease-step relative block w-full max-w-md rounded-lg shadow-lg outline-1 duration-150 hover:scale-[1.025] focus:scale-[1.025]">
            <CardImage
              src={`/images/qwik-ui-fluffy-creature-screen.webp`}
              width="300"
              height="300"
              alt={`styled kit`}
              class="h-64 rounded-t-sm"
            />
            <CardHeader>
              <CardTitle class="text-xl">Styled</CardTitle>
              <CardDescription class="text-lg">
                A fully customizable design system of copy-paste, reusable, styled
                components built on top of headless.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {whyStyled.map((pro, index) => (
                  <li key={index} class="mb-5 grid grid-cols-[25px_1fr] items-start">
                    {pro.emoji}
                    <p class="font-medium">{pro.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
