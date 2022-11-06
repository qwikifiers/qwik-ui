import {component$, Slot} from '@builder.io/qwik';
import {CardActions} from "./CardActions";

interface CardProps {
  class?: string;
  className?: string;
  title?: string;
  imageUrl?: string;
  imagePlacement?: "top" | "bottom";
  imageAsOverlay?: boolean;
}

export const Card = component$(({ title, imageUrl, imagePlacement = "top", imageAsOverlay = false, ...props} : CardProps) => {
  return (
    <div className={`card w-96 bg-base-100 shadow-xl ${imageAsOverlay ? 'image-full' : ''}`} {...props}>
      {imagePlacement === "top" && imageUrl && <figure><img src={imageUrl} /></figure>}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        <Slot />
      </div>
      {imagePlacement === "bottom" && imageUrl && <figure><img src={imageUrl} /></figure>}
    </div>
  );
});
