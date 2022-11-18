import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CarouselItemProps extends WithClassesProp {
  index: number;
  src: string;
  alt: string;
}

export const CarouselItem = component$(
  ({
    index,
    src,
    alt,
    class: classProp = '',
    className = '',
    ...props
  }: CarouselItemProps) => {
    const cssClass = cn('carousel-item w-full', classProp, className);
    return (
      <div id={`item${index}`} className={cssClass} {...props}>
        <img src={src} alt={alt} className="w-full" />
      </div>
    );
  }
);
