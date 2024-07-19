import { Component } from '@builder.io/qwik';
import { CarouselBase, CarouselRootProps } from './root';
import { Carousel } from '@qwik-ui/headless';
import { findComponent, processChildren } from '../../utils/inline-component';

type InternalProps = {
  _index?: number;
  value?: string;
  carouselSlideComponent?: typeof Carousel.Slide;
};

export const CarouselRoot: Component<CarouselRootProps & InternalProps> = (
  props: CarouselRootProps & InternalProps,
) => {
  const { children, carouselSlideComponent: GivenSlide, ...rest } = props;
  const Slide = GivenSlide || Carousel.Slide;
  let currItemIndex = 0;

  // code executes when the item component's shell is "seen"
  findComponent(Slide, (slideProps) => {
    slideProps._index = currItemIndex;

    currItemIndex++;
  });

  processChildren(children);

  return <CarouselBase {...rest}>{props.children}</CarouselBase>;
};
