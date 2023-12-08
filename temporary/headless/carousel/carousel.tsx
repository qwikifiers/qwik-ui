// import {
//   $,
//   QwikIntrinsicElements,
//   Slot,
//   component$,
//   createContextId,
//   useContext,
//   useContextProvider,
//   useId,
//   useStylesScoped$,
// } from '@builder.io/qwik';
// import { useOrdinal } from '@qwik-ui/utils';

// import stylesButtons from './styles/buttons.css?inline';
// import stylesControl from './styles/control.css?inline';
// import stylesItem from './styles/item.css?inline';
// import stylesItems from './styles/items.css?inline';
// import { CarouselContext, useCarousel } from './use';

// export const useCarouselProvider = (state: CarouselContext) => {
//   useContextProvider(carouselContext, state);
// };

// export const carouselContext = createContextId<CarouselContext>('carousel-root');

// type RootProps = QwikIntrinsicElements['div'] & {
//   use?: CarouselContext;
// };

// export const Root = component$(({ use, ...props }: RootProps) => {
//   const provider = use || useCarousel();
//   useCarouselProvider(provider);

//   return (
//     <div role="presentation" id={provider.id} ref={provider.ref} {...props}>
//       <Slot />
//     </div>
//   );
// });

// type ButtonProps = QwikIntrinsicElements['button'] & {
//   label?: string;
// };

// export const ButtonNext = component$(
//   ({ onClick$, label = 'Go to the next item', ...props }: ButtonProps) => {
//     useStylesScoped$(stylesButtons);
//     const { items, loop } = useContext(carouselContext);

//     return (
//       <button
//         {...props}
//         aria-label={label}
//         disabled={!loop ? items.active.isLast.value : false}
//         onClick$={[$(() => items.next()), onClick$]}
//       >
//         <Slot />
//       </button>
//     );
//   },
// );

// export const ButtonPrevious = component$(
//   ({ onClick$, label = 'Go to the previous item', ...props }: ButtonProps) => {
//     useStylesScoped$(stylesButtons);
//     const { items, loop } = useContext(carouselContext);
//     return (
//       <button
//         {...props}
//         aria-label={label}
//         disabled={!loop ? items.active.isFirst.value : false}
//         onClick$={[$(() => items.previous()), onClick$]}
//       >
//         <Slot />
//       </button>
//     );
//   },
// );

// type ItemsProps = QwikIntrinsicElements['ul'];

// export const Items = component$((props: ItemsProps) => {
//   useStylesScoped$(stylesItems);
//   return (
//     <div attr-data-qui="carousel-wapper">
//       <ul {...props} attr-data-qui="carousel">
//         <Slot />
//       </ul>
//     </div>
//   );
// });

// type ItemProps = QwikIntrinsicElements['li'] & {
//   label: string;
//   index: number;
// };

// export const Item = component$(({ index, label, ...props }: ItemProps) => {
//   useStylesScoped$(stylesItem);
//   const { id, items } = useContext(carouselContext);
//   return (
//     <li {...props} aria-current={items.active.current.value === index}>
//       <input
//         aria-label={label}
//         type="radio"
//         checked={items.active.current.value === index}
//         name={`item-${id}`}
//         onChange$={() => items.scrollAt(index)}
//       />
//       <Slot />
//     </li>
//   );
// });

// type ControlContext = {
//   id: string;
// };

// type ControlsProps = QwikIntrinsicElements['div'];

// export const controlContext = createContextId<ControlContext>('carousel-control-root');

// export const Controls = component$((props: ControlsProps) => {
//   const controlService = { id: props.id || useId() };
//   const { pages } = useContext(carouselContext);
//   useContextProvider(controlContext, controlService);

//   return <nav {...props}>{pages.ranges.value && <Slot />}</nav>;
// });

// type ControlProps = QwikIntrinsicElements['div'] & {
//   index: number;
//   label?: string;
// };

// export const Control = component$(
//   ({ index, onClick$, label, ...props }: ControlProps) => {
//     useStylesScoped$(stylesControl);
//     const ordinal = useOrdinal();
//     const { items } = useContext(carouselContext);
//     const { id } = useContext(controlContext);

//     return (
//       <div
//         {...props}
//         aria-current={items.active.current.value === index}
//         onClick$={[$(() => items.scrollAt(index)), onClick$]}
//       >
//         <input
//           aria-label={label || `Go to the ${ordinal?.(index + 1)} item`}
//           type="radio"
//           checked={items.active.current.value === index}
//           name={`control-${id}`}
//           onChange$={() => items.scrollAt(index)}
//         />
//         <Slot />
//       </div>
//     );
//   },
// );

// export const IconPrevious = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   >
//     <polyline points="15 18 9 12 15 6"></polyline>
//   </svg>
// );

// export const IconNext = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   >
//     <polyline points="9 18 15 12 9 6"></polyline>
//   </svg>
// );

// export const IconChevronLeft = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     class="lucide lucide-chevrons-left"
//   >
//     <polyline points="11 17 6 12 11 7"></polyline>
//     <polyline points="18 17 13 12 18 7"></polyline>
//   </svg>
// );

// export const IconChevronRight = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     class="lucide lucide-chevrons-right"
//   >
//     <polyline points="13 17 18 12 13 7"></polyline>
//     <polyline points="6 17 11 12 6 7"></polyline>
//   </svg>
// );
