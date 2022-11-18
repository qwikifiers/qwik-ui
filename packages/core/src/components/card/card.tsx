import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CardProps extends WithClassesProp {
  title?: string;
  imageUrl?: string;
  imagePlacement?: 'top' | 'bottom';
  imageAsOverlay?: boolean;
}

export const Card = component$(
  ({
    title,
    imageUrl,
    imagePlacement = 'top',
    imageAsOverlay = false,
    class: classProp = '',
    className = '',
    ...props
  }: CardProps) => {
    const cssClass = cn(
      'card w-96 bg-base-100 shadow-xl',
      { 'image-full': imageAsOverlay },
      classProp,
      className
    );
    return (
      <div className={cssClass} {...props}>
        {imagePlacement === 'top' && imageUrl && (
          <figure>
            <img src={imageUrl} />
          </figure>
        )}
        <div className="card-body">
          {title && <h2 className="card-title">{title}</h2>}
          <Slot />
        </div>
        {imagePlacement === 'bottom' && imageUrl && (
          <figure>
            <img src={imageUrl} />
          </figure>
        )}
      </div>
    );
  }
);
