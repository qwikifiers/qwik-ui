import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
type CardBodyProps = HTMLAttributes<HTMLElement>;


export const CardBody = component$(
  (props: CardBodyProps) => {
    return (
      <div class="card-body" {...props}>
        <Slot />
      </div>
    )
  }
)
