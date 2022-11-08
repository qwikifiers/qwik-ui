import {component$} from "@builder.io/qwik";

interface CarouselItemProps {
  index: number;
  src: string;
  alt: string;
}

export const CarouselItem = component$(({ index, src, alt, ...props } : CarouselItemProps) => {
  return (
    <div id={`item${index}`} className="carousel-item w-full" {...props}>
      <img src={src} alt={alt} className="w-full"/>
    </div>
  );
});
