import { Component } from '@builder.io/qwik';
import { CarouselBase, CarouselRootProps } from './root';
import { Carousel } from '@qwik-ui/headless';
import { findComponent, processChildren } from '../../utils/inline-component';

type InternalProps = {
  _index?: number;
  value?: string;
  carouselSlideComponent?: typeof Carousel.Slide;
  carouselBulletComponent?: typeof Carousel.Bullet;
};

export const CarouselRoot: Component<CarouselRootProps & InternalProps> = (
  props: CarouselRootProps & InternalProps,
) => {
  const {
    children,
    carouselSlideComponent: GivenSlide,
    carouselBulletComponent: GivenBullet,
    ...rest
  } = props;
  const Slide = GivenSlide || Carousel.Slide;
  const Bullet = GivenBullet || Carousel.Bullet;
  let currSlideIndex = 0;
  let currBulletIndex = 0;

  // code executes when the item component's shell is "seen"
  findComponent(Slide, (slideProps) => {
    slideProps._index = currSlideIndex;

    currSlideIndex++;
  });

  findComponent(Bullet, (bulletProps) => {
    bulletProps._index = currBulletIndex;

    currBulletIndex++;
  });

  processChildren(children);

  return <CarouselBase {...rest}>{props.children}</CarouselBase>;
};
