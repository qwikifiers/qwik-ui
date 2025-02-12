import { Component } from '@builder.io/qwik';
import { CarouselBase, PublicCarouselRootProps } from './root';
import { findComponent, processChildren } from '../../utils/inline-component';
import { CarouselSlide } from './slide';
import { CarouselBullet } from './bullet';
import { CarouselStep } from './step';
import { CarouselTitle } from './title';

type InternalProps = {
  value?: string;
  /**
   * @deprecated Use `slideComponent` instead.
   */
  carouselSlideComponent?: typeof CarouselSlide;
  /**
   * @deprecated Use `bulletComponent` instead.
   */
  carouselBulletComponent?: typeof CarouselBullet;

  slideComponent?: typeof CarouselSlide;
  bulletComponent?: typeof CarouselBullet;
  stepComponent?: typeof CarouselStep;
  titleComponent?: typeof CarouselTitle;
};

export const CarouselRoot: Component<PublicCarouselRootProps & InternalProps> = (
  props: PublicCarouselRootProps & InternalProps,
) => {
  const {
    children,
    carouselSlideComponent: GivenSlideOld,
    carouselBulletComponent: GivenBulletOld,
    slideComponent: GivenSlide,
    bulletComponent: GivenBullet,
    stepComponent: GivenStep,
    titleComponent: GivenTitle,
    ...rest
  } = props;
  const Slide = GivenSlide || GivenSlideOld || CarouselSlide;
  const Bullet = GivenBullet || GivenBulletOld || CarouselBullet;
  const Step = GivenStep || CarouselStep;
  const Title = GivenTitle || CarouselTitle;
  let currSlideIndex = 0;
  let currBulletIndex = 0;
  let currStepIndex = 0;
  let numSlides = 0;
  let isTitle = false;

  // code executes when the item component's shell is "seen"
  findComponent(Slide, (slideProps) => {
    slideProps._index = currSlideIndex;

    currSlideIndex++;
    numSlides++;
  });

  findComponent(Bullet, (bulletProps) => {
    bulletProps._index = currBulletIndex;

    currBulletIndex++;
  });

  findComponent(Step, (stepProps) => {
    stepProps._index = currStepIndex;

    currStepIndex++;
  });

  findComponent(Title, () => {
    isTitle = true;
  });

  processChildren(children);

  return (
    <CarouselBase _numSlides={numSlides} _isTitle={isTitle} {...rest}>
      {props.children}
    </CarouselBase>
  );
};
