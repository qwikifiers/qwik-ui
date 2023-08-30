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

import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

export interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
}
export const Button = component$<ButtonProps>(({ size = 'medium' }) => {
  useStylesScoped$(`
    .size-small {
      font-size: 10px;
    }
    .size-medium {
      font-size: 14px;
    }
    .size-large {
      font-size: 18px;
    }
  `);
  return (
    <button
      class={{
        [`size-${size}`]: true
      }}
    >
      <Slot></Slot>
    </button>
  );
});
