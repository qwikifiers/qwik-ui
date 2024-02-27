// "use client"

// import * as React from "react"
// import * as SeparatorPrimitive from "@radix-ui/react-separator"

// import { cn } from "@/lib/utils"

// const Separator = React.forwardRef<
//   React.ElementRef<typeof SeparatorPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
// >(
//   (
//     { className, orientation = "horizontal", decorative = true, ...props },
//     ref
//   ) => (
//     <SeparatorPrimitive.Root
//       ref={ref}
//       decorative={decorative}
//       orientation={orientation}
//       className={cn(
//         "shrink-0 bg-border",
//         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
//         className
//       )}
//       {...props}
//     />
//   )
// )
// Separator.displayName = SeparatorPrimitive.Root.displayName

// export { Separator }

import { PropsOf, component$ } from '@builder.io/qwik';
import { Separator as QwikUISeparator } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const Separator = component$<PropsOf<typeof QwikUISeparator>>(
  ({ orientation = 'horizontal', decorative = true, ...props }) => {
    return (
      <>
        {/* class=" my-1 h-px" */}
        <QwikUISeparator
          {...props}
          decorative={decorative}
          orientation={orientation}
          class={cn(
            'bg-border shrink-0',
            orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
            props.class,
          )}
        />
      </>
    );
  },
);
