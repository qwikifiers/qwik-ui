import { component$, Slot, type PropsOf, useContext, sync$, $ } from '@builder.io/qwik';
import { useSelect } from './use-select';
import SelectContextId from './select-context';

type SelectTriggerProps = PropsOf<'button'>;
export type DisabledArr = Array<{ disabled: boolean }>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const {
    getNextEnabledOptionIndex,
    // getPrevEnabledOptionIndex,
    // getIntialIndexOnKey,
    // manageToggle,
    // setTriggerText,
    // singleCharSearch,
  } = useSelect();

  const context = useContext(SelectContextId);
  // const typedLettersSig = useSignal("");
  // const deltaIndexSig = useSignal(-1);

  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  const handleKeyDown$ = $(async (e: KeyboardEvent) => {
    // we migth want to consider making a ts type just for the strgs we care about
    // in the future, multiple keys need to open the popup
    // const openPopupKeys = ["ArrowDown", "ArrowUp"];
    const options = context.optionRefsArray.value.map((e) => e.value) as HTMLElement[];

    // const singleCharRegex = /^[a-z]$/;
    // const isSingleChar = singleCharRegex.test(e.key);

    if (e.key === 'ArrowDown') {
      context.isListboxOpenSig.value = true;

      const nextIndex = await getNextEnabledOptionIndex(
        context.highlightedIndexSig.value,
        options,
      );

      console.log(nextIndex);

      // const nextIndex = getNextEnabledOptionIndexFromDisabledArr(
      //   context.highlightedIndexSig.value,
      //   disabledOptions,
      // );
      // manageToggle(await nextIndex, context.highlightedIndexSig, options);
      // return;
    }

    // TODO: refactor each if statement with a function inside of it instead of the current pattern of:
    // if(true){lines of code}
    //to
    //if(true){fun(...)}

    // this whole section in the if statement could be refactored into a "closed behavior" fn
    // if (!context.isListboxOpenSig.value) {
    //   if (isSingleChar) {
    //     context.isListboxOpenSig.value = true;
    //     const posIndex = await singleCharSearch(e.key, deltaIndexSig, options);
    //     if (posIndex !== -1) {
    //       manageToggle(posIndex, context.highlightedIndexSig, options);
    //     }
    //     return;
    //   }

    //   if (e.key === "Home") {
    //     context.isListboxOpenSig.value = true;
    //     // const firstOpt = disabledOptions.findIndex((e) => e.disabled === false);
    //     // manageToggle(firstOpt, context.highlightedIndexSig, options);
    //     return;
    //   }
    //   if (e.key === "End") {
    //     context.isListboxOpenSig.value = true;
    //     // for (let index = disabledOptions.length - 1; index > -1; index--) {
    //     //   const elementStatus = disabledOptions[index];
    //     //   if (!elementStatus.disabled) {
    //     //     manageToggle(index, context.highlightedIndexSig, options);
    //     //     context.highlightedIndexSig.value = index;
    //     //     break;
    //     //   }
    //     // }
    //     return;
    //   }
    // }
    // if (!context.isListboxOpenSig.value && openPopupKeys.includes(e.key)) {
    //   context.isListboxOpenSig.value = true;
    //   if (context.highlightedIndexSig.value !== -1) {
    //     return;
    //   }
    //   const initalIndex = getIntialIndexOnKey(e.key);
    //   manageToggle(await initalIndex, context.highlightedIndexSig, options);
    //   return;
    // }
    // if (context.isListboxOpenSig.value) {
    //   // typedLettersSig.value = typedLettersSig.value + e.key;
    //   if (isSingleChar) {
    //     // const posIndex = await singleCharSearch(e.key, deltaIndexSig, options);
    //     // if (posIndex !== -1) {
    //     //   manageToggle(posIndex, context.highlightedIndexSig, options);
    //     //   return;
    //     // }
    //     // return;
    //   }
    //   if (e.key === "ArrowUp") {
    //     // if (context.highlightedIndexSig.value === -1) {
    //     //   const initalIndex = getIntialIndexOnKey(e.key);
    //     //   manageToggle(await initalIndex, context.highlightedIndexSig, options);
    //     //   return;
    //     // }
    //     // const nextIndex = getPrevEnabledOptionIndexFromDisabledArr(
    //     //   context.highlightedIndexSig.value,
    //     //   disabledOptions,
    //     // );
    //     // manageToggle(await nextIndex, context.highlightedIndexSig, options);
    //     // return;
    //   }
    //   if (e.key === "Enter") {
    //     // setTriggerText(context.highlightedIndexSig, options);
    //     // return;
    //   }
    //   if (e.key === "Home") {
    //     // const firstOpt = disabledOptions.findIndex((e) => e.disabled === false);
    //     // manageToggle(firstOpt, context.highlightedIndexSig, options);
    //     // return;
    //   }
    //   if (e.key === "End") {
    //     // the things we do when no lastIndex :(
    //     // for (let index = disabledOptions.length - 1; index > -1; index--) {
    //     //   const elementStatus = disabledOptions[index];
    //     //   if (!elementStatus.disabled) {
    //     //     manageToggle(index, context.highlightedIndexSig, options);
    //     //     context.highlightedIndexSig.value = index;
    //     //     break;
    //     //   }
    //     // }
    //     // return;
    //   }
    //   // if (e.key === "Tab") {
    //   //   const tabIndex =
    //   //     context.highlightedIndexSig.value === -1
    //   //       ? 0
    //   //       : context.highlightedIndexSig.value;
    //   //   setTriggerText({ value: tabIndex }, options);
    //   //   context.isListboxOpenSig.value = false;
    //   //   return;
    //   // }
    //   // if (e.key === "Escape") {
    //   //   context.isListboxOpenSig.value = false;
    //   // }
    // }
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageDown', 'PageUp'];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  return (
    <button
      {...props}
      ref={context.triggerRef}
      onClick$={[handleClick$, props.onClick$]}
      aria-expanded={context.isListboxOpenSig.value}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      class="bg-slate-800 p-2 text-white"
    >
      <Slot />
      {context.selectedOptionRef.value?.textContent}
    </button>
  );
});
