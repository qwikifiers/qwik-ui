/*

  # TODO:
  
  * Go over different solutions for inspiration
    
    TAILWIND CONFIG
    * Brand colors
    * Button state colors
    
    PROPS / CVA
      * SIZES
        * sm, md, lg, xl, 2xl
      * SHAPE
        * Square / rounded / circular
        * 
      * ANIMATION
        * None
        * Pulse
        
      * INTENT
        * Primary
        * Secondary
        * Danger / Destructive
      * LOOK
        * Outline 
        * Ghost
        * Link
        
      * STATE
        * Active
        * Disabled
    
    DOCS EXAMPLES:
    * with Icon
    * loading state?
  
  * Decide on theme / branding colors 
  * Run storybook locally
  * Make CVA efficient with Qwik
  * Find a way to project the source code of this file into the docs

*/

import { Slot, component$ } from '@builder.io/qwik';
import { cva, type AddVariantPropsTo } from '@qwik-ui/cva';

export const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md 
  text-sm font-medium ring-offset-background transition-colors
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      look: {
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'default',
    },
  },
);

export type ButtonProps = AddVariantPropsTo<'button', typeof buttonVariants>;

export const Button = component$<ButtonProps>(({ intent, size, ...restOfProps }) => {
  return (
    <button class={buttonVariants({ intent, size })} {...restOfProps}>
      <Slot />
    </button>
  );
});
