import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Card } from '@qwik-ui/styled';
import { cn } from '@qwik-ui/utils';

// Keeping these so that we can integrate them later when refactoring the landing page to be more professional
// const whyHeadless = [
//   {
//     emoji: '🧑‍🎨',
//     description: 'Create your own components from scratch',
//   },
//   {
//     emoji: '⛓️‍💥',
//     description:
//       'Use with vanilla CSS, SASS, TailwindCSS, UnoCSS, PandaCSS, or whateverCSS',
//   },
//   {
//     emoji: '🧑‍🎓',
//     description:
//       'Learn about the headless APIs, accessibility, and the html/css features to come',
//   },
// ];

// const whyStyled = [
//   {
//     emoji: '😌',
//     description: 'Start with good defaults',
//   },
//   {
//     emoji: '💫',
//     description: "Change your entire app's style & theme at the click of a button",
//   },
//   {
//     emoji: '👏',
//     description: 'Avoid code duplication thanks to cva variants',
//   },
// ];

export default component$(() => {
  return (
    <div class="flex flex-col items-center gap-8 py-24">
      <h1 class="text-center text-4xl leading-normal lg:text-5xl">
        <span class="font-extrabold tracking-wide text-primary">Qwik</span>{' '}
        <span class="font-extrabold tracking-wide text-secondary">UI</span>
      </h1>
      <h2 class="text-center text-xl font-bold leading-normal lg:text-3xl">
        Headless & styled copy-paste components
        <br />
        <span class="leading-normal text-primary">automatically optimized for you</span>
      </h2>
      <p class="text-center text-lg lg:text-xl">
        Choose a kit and start building the future{' '}
        <span class="hue-rotate-[150deg]">⚡</span>
      </p>
      <div class="mt-4 flex flex-wrap justify-center justify-items-center gap-14">
        <a href={`/docs/headless/introduction`}>
          <Card.Root
            class={cn(
              'relative block h-full max-w-md rounded-lg shadow-lg outline-1 duration-150 ease-step hover:scale-[1.025] focus:scale-[1.025]',
            )}
          >
            <Card.Image
              src={`/images/qwik-ui-headless-hero.webp`}
              width="300"
              height="300"
              alt={`headless kit`}
              class="w-full rounded-t-sm"
            />
            <Card.Header>
              <Card.Title class="text-xl">Headless</Card.Title>
              <Card.Description class="text-lg">
                A headless component library of completely unstyled, accessible, and
                resumable components for the most creative minds.
              </Card.Description>
            </Card.Header>
            {/* <Card.Content>
              <ul>
                {whyHeadless.map((pro, index) => (
                  <li key={index} class="mb-5 grid grid-cols-[25px_1fr] items-start">
                    {pro.emoji}
                    <p class="font-medium">{pro.description}</p>
                  </li>
                ))}
              </ul>
            </Card.Content> */}
          </Card.Root>
        </a>
        <a href={`/docs/styled/introduction`}>
          <Card.Root class="relative block h-full max-w-md rounded-lg shadow-lg outline-1 duration-150 ease-step hover:scale-[1.025] focus:scale-[1.025]">
            <Card.Image
              src={`/images/qwik-ui-fluffy-creature-screen.webp`}
              width="300"
              height="300"
              alt={`styled kit`}
              class="w-full rounded-t-sm"
            />
            <Card.Header>
              <Card.Title class="text-xl">Styled</Card.Title>
              <Card.Description class="text-lg">
                A design system of copy-paste, reusable, styled components built on top of
                headless. Easy to use, easy to customize.
              </Card.Description>
            </Card.Header>
            {/* <Card.Content>
              <ul>
                {whyStyled.map((pro, index) => (
                  <li key={index} class="mb-5 grid grid-cols-[25px_1fr] items-start">
                    {pro.emoji}
                    <p class="font-medium">{pro.description}</p>
                  </li>
                ))}
              </ul>
            </Card.Content> */}
          </Card.Root>
        </a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik UI - The world's fastest loading UI components library",
};
