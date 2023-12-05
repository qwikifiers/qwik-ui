import { QwikIntrinsicElements, component$, useStyles$ } from '@builder.io/qwik';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@qwik-ui/headless';

export default component$(() => {
  const dogs = ['Othello', 'The Hobbit', 'Dune', 'The Giver'];

  useStyles$(`
    .accordion-root {
        box-sizing: border-box; 
        border-radius: 0.275rem; 
        color: #ffffff; 
        width: 250px;
        max-width: 500px;
        border-color: 1px;
        border: 3px solid #713f12;
    }

    .accordion-trigger {
        display: flex;
        min-height: 44px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        text-align: left;
        border-bottom: 2px solid #713f12;
        background: #854d0e;
        transition: background-color 200ms ease;
    }

    .accordion-trigger:hover {
        background-color: #a16207;
      }
      
      .accordion-trigger.rounded-t-sm {
        border-top-left-radius: 0.125rem;
        border-top-right-radius: 0.125rem;
      }
      
      .accordion-trigger.rounded-b-sm {
        border-bottom-left-radius: 0.125rem;
        border-bottom-right-radius: 0.125rem;
      }
      
      .accordion-trigger.border-b-0 {
        border-bottom: 0;
      }

      .accordion-trigger[aria-expanded="true"] {
        border-radius: 0;
      }
      
      .accordion-trigger svg {
        transition: transform 500ms ease;
      }

      .accordion-trigger[aria-expanded="true"] svg {
        transform: rotateX(180deg);
      }

      .accordion-content {
        overflow: hidden;
      }

      .accordion-slide[data-state='open'] {
        animation: 500ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards accordion-open;
      }
    
      .accordion-slide[data-state='closed'] {
        animation: 500ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards accordion-close;
      }

      .accordion-content p {
        background: #422006;
        padding: 0.5rem 1rem ;
      }

      .tom-headline {
        margin-bottom: 16px;
        font-weight: 600;
      }
  `);

  return (
    <>
      <h2 class="tom-headline">Tom's bookshelf</h2>
      <AccordionRoot animated enhance={true} class="accordion-root">
        {dogs.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionHeader as="h3">
              <AccordionTrigger
                class={`accordion-trigger group ${index === 0 ? 'rounded-t-sm' : ''} ${
                  index === dogs.length - 1 ? 'rounded-b-sm border-b-0' : ''
                }`}
              >
                <span>favorite book {index + 1}</span>
                <span style={{ paddingLeft: '8px' }}>
                  <SVG />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-slide accordion-content">
              <p>{item}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </>
  );
});

export function SVG(props: QwikIntrinsicElements['svg']) {
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
