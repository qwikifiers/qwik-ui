import { cva } from 'class-variance-authority';

export const button = cva(
  [
    'font-semibold no-underline gap-2 p-3 rounded-md',
    'border-base-200 text-base-content no-underline outline-base-content'
  ],
  {
    variants: {
      intent: {
        primary: ['bg-red-500']
      }
    },
    defaultVariants: {
      intent: 'primary'
    }
  }
);
