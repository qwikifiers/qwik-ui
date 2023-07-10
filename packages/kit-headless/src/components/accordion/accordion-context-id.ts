import { createContextId } from '@builder.io/qwik';
import {
  AccordionRootContext,
  AccordionItemContext,
} from './accordion-context.type';

export const accordionRootContextId =
  createContextId<AccordionRootContext>('accordion-root');

export const accordionItemContextId =
  createContextId<AccordionItemContext>('accordion-item');

/*
  Accordion Header:
  - Label for section of content that serves as a control for hiding the section.

  Accordion Panel:
  - Section of content that can be shown or hidden.
  

  Keyboard interaction:
    
  Enter or Space: When focus is on the accordion header for a collapsed panel, expands the associated panel. 
  
  If the implementation allows only one panel to be expanded, and if another panel is expanded, collapses that panel.
  
  When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing.  Some implementations require one panel to be expanded at all times and allow only one panel to be expanded; so, they do not support a collapse function.

  Tab: Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.
    
  Shift + Tab: Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.
    
  Down Arrow (Optional): If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.
    
  Up Arrow (Optional): If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.
    
  Home (Optional): When focus is on an accordion header, moves focus to the first accordion header.
    
  End (Optional): When focus is on an accordion header, moves focus to the last accordion header.

  WAI-ARIA Roles, States, and Properties:
  
  The title of each accordion header is contained in an element with role button.

  Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.
    -  If the native host language has an element with an implicit heading and aria-level, such as an HTML heading tag, a native host language element may be used.
    
    - The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.
    
  If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.
    
  The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.

  If the accordion panel associated with an accordion header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true.
    
  Optionally, each element that serves as a container for panel content has role region and aria-labelledby with a value that refers to the button that controls display of the panel.
    -  Avoid using the region role in circumstances that create landmark region proliferation, e.g., in an accordion that contains more than approximately 6 panels that can be expanded at the same time.
        
    - Role region is especially helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion.

  Other Implementations:

  Radix: 

  All of these have a disabled or data-disabled option

  Root:

  - Horizontal & Vertical Orientation (orientation prop)
  - Can change directions (dir prop)
  - Change behavior of the accordion to open multiple or only one item 
    (type="single | multiple"  prop)
  - Can be controlled or uncontrolled "managed by react state or by the dom"
    - I believe this is done with the value prop.
  - Can set a default open value with (defaultValue prop)
  - Allow all items to close (collapsible prop)

  Trigger & Item:

  - Data state with open or closed. [data-state]


  Also has a Header component that wraps around the trigger. This is because a user might want their accordion headings to be proper headers. Not sure if we will implement this for now.

  Offers namespaced CSS properties used for animations.
  Example: --radix-accordion-content-height
  to animate the height of the content when it opens or closes.

*/
