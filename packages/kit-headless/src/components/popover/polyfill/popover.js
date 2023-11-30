// src/events.ts
var ToggleEvent = class extends Event {
  oldState;
  newState;
  constructor(type, { oldState = '', newState = '', ...init } = {}) {
    super(type, init);
    this.oldState = String(oldState || '');
    this.newState = String(newState || '');
  }
};
var popoverToggleTaskQueue = /* @__PURE__ */ new WeakMap();
function queuePopoverToggleEventTask(element, oldState, newState) {
  popoverToggleTaskQueue.set(
    element,
    setTimeout(() => {
      if (!popoverToggleTaskQueue.has(element)) return;
      element.dispatchEvent(
        new ToggleEvent('toggle', {
          cancelable: false,
          oldState,
          newState,
        }),
      );
    }, 0),
  );
}

// src/popover-helpers.ts
var ShadowRoot = globalThis.ShadowRoot || function () {};
var HTMLDialogElement = globalThis.HTMLDialogElement || function () {};
var topLayerElements = /* @__PURE__ */ new WeakMap();
var autoPopoverList = /* @__PURE__ */ new WeakMap();
var visibilityState = /* @__PURE__ */ new WeakMap();
function getPopoverVisibilityState(popover) {
  return visibilityState.get(popover) || 'hidden';
}
var popoverInvoker = /* @__PURE__ */ new WeakMap();
function popoverTargetAttributeActivationBehavior(element) {
  const popover = element.popoverTargetElement;
  if (!(popover instanceof HTMLElement)) {
    return;
  }
  const visibility = getPopoverVisibilityState(popover);
  if (element.popoverTargetAction === 'show' && visibility === 'showing') {
    return;
  }
  if (element.popoverTargetAction === 'hide' && visibility === 'hidden') return;
  if (visibility === 'showing') {
    hidePopover(popover, true, true);
  } else if (checkPopoverValidity(popover, false)) {
    popoverInvoker.set(popover, element);
    showPopover(popover);
  }
}
function checkPopoverValidity(element, expectedToBeShowing) {
  if (element.popover !== 'auto' && element.popover !== 'manual') {
    return false;
  }
  if (!element.isConnected) return false;
  if (expectedToBeShowing && getPopoverVisibilityState(element) !== 'showing') {
    return false;
  }
  if (!expectedToBeShowing && getPopoverVisibilityState(element) !== 'hidden') {
    return false;
  }
  if (element instanceof HTMLDialogElement && element.hasAttribute('open')) {
    return false;
  }
  if (document.fullscreenElement === element) return false;
  return true;
}
function getStackPosition(popover) {
  if (!popover) return 0;
  return (
    Array.from(autoPopoverList.get(popover.ownerDocument) || []).indexOf(popover) + 1
  );
}
function topMostClickedPopover(target) {
  const clickedPopover = nearestInclusiveOpenPopover(target);
  const invokerPopover = nearestInclusiveTargetPopoverForInvoker(target);
  if (getStackPosition(clickedPopover) > getStackPosition(invokerPopover)) {
    return clickedPopover;
  }
  return invokerPopover;
}
function topMostAutoPopover(document2) {
  const documentPopovers = autoPopoverList.get(document2);
  for (const popover of documentPopovers || []) {
    if (!popover.isConnected) {
      documentPopovers.delete(popover);
    } else {
      return popover;
    }
  }
  return null;
}
function getRootNode(node) {
  if (typeof node.getRootNode === 'function') {
    return node.getRootNode();
  }
  if (node.parentNode) return getRootNode(node.parentNode);
  return node;
}
function nearestInclusiveOpenPopover(node) {
  while (node) {
    if (
      node instanceof HTMLElement &&
      node.popover === 'auto' &&
      visibilityState.get(node) === 'showing'
    ) {
      return node;
    }
    node = node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function nearestInclusiveTargetPopoverForInvoker(node) {
  while (node) {
    const nodePopover = node.popoverTargetElement;
    if (nodePopover instanceof HTMLElement) return nodePopover;
    node = node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function topMostPopoverAncestor(newPopover) {
  const popoverPositions = /* @__PURE__ */ new Map();
  let i = 0;
  const document2 = newPopover.ownerDocument;
  for (const popover of autoPopoverList.get(document2) || []) {
    popoverPositions.set(popover, i);
    i += 1;
  }
  popoverPositions.set(newPopover, i);
  i += 1;
  let topMostPopoverAncestor2 = null;
  function checkAncestor(candidate) {
    const candidateAncestor = nearestInclusiveOpenPopover(candidate);
    if (candidateAncestor === null) return null;
    const candidatePosition = popoverPositions.get(candidateAncestor);
    if (
      topMostPopoverAncestor2 === null ||
      popoverPositions.get(topMostPopoverAncestor2) < candidatePosition
    ) {
      topMostPopoverAncestor2 = candidateAncestor;
    }
  }
  checkAncestor(newPopover?.parentElement);
  return topMostPopoverAncestor2;
}
function isFocusable(focusTarget) {
  if (focusTarget.hidden || focusTarget instanceof ShadowRoot) return false;
  if (
    focusTarget instanceof HTMLButtonElement ||
    focusTarget instanceof HTMLInputElement ||
    focusTarget instanceof HTMLSelectElement ||
    focusTarget instanceof HTMLTextAreaElement ||
    focusTarget instanceof HTMLOptGroupElement ||
    focusTarget instanceof HTMLOptionElement ||
    focusTarget instanceof HTMLFieldSetElement
  ) {
    if (focusTarget.disabled) return false;
  }
  if (focusTarget instanceof HTMLInputElement && focusTarget.type === 'hidden') {
    return false;
  }
  if (focusTarget instanceof HTMLAnchorElement && focusTarget.href === '') {
    return false;
  }
  return typeof focusTarget.tabIndex === 'number' && focusTarget.tabIndex !== -1;
}
function focusDelegate(focusTarget) {
  if (focusTarget.shadowRoot && focusTarget.shadowRoot.delegatesFocus !== true) {
    return null;
  }
  let whereToLook = focusTarget;
  if (whereToLook.shadowRoot) {
    whereToLook = whereToLook.shadowRoot;
  }
  let autoFocusDelegate = whereToLook.querySelector('[autofocus]');
  if (autoFocusDelegate) {
    return autoFocusDelegate;
  } else {
    const slots = whereToLook.querySelectorAll('slot');
    for (const slot of slots) {
      const assignedElements = slot.assignedElements({ flatten: true });
      for (const el of assignedElements) {
        if (el.hasAttribute('autofocus')) {
          return el;
        } else {
          autoFocusDelegate = el.querySelector('[autofocus]');
          if (autoFocusDelegate) {
            return autoFocusDelegate;
          }
        }
      }
    }
  }
  const walker = focusTarget.ownerDocument.createTreeWalker(
    whereToLook,
    NodeFilter.SHOW_ELEMENT,
  );
  let descendant = walker.currentNode;
  while (descendant) {
    if (isFocusable(descendant)) {
      return descendant;
    }
    descendant = walker.nextNode();
  }
}
function popoverFocusingSteps(subject) {
  focusDelegate(subject)?.focus();
}
var previouslyFocusedElements = /* @__PURE__ */ new WeakMap();
function showPopover(element) {
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (
    !element.dispatchEvent(
      new ToggleEvent('beforetoggle', {
        cancelable: true,
        oldState: 'closed',
        newState: 'open',
      }),
    )
  ) {
    return;
  }
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  let shouldRestoreFocus = false;
  if (element.popover === 'auto') {
    const originalType = element.getAttribute('popover');
    const ancestor = topMostPopoverAncestor(element) || document2;
    hideAllPopoversUntil(ancestor, false, true);
    if (
      originalType !== element.getAttribute('popover') ||
      !checkPopoverValidity(element, false)
    ) {
      return;
    }
  }
  if (!topMostAutoPopover(document2)) {
    shouldRestoreFocus = true;
  }
  previouslyFocusedElements.delete(element);
  const originallyFocusedElement = document2.activeElement;
  element.classList.add(':popover-open');
  visibilityState.set(element, 'showing');
  if (!topLayerElements.has(document2)) {
    topLayerElements.set(document2, /* @__PURE__ */ new Set());
  }
  topLayerElements.get(document2).add(element);
  popoverFocusingSteps(element);
  if (element.popover === 'auto') {
    if (!autoPopoverList.has(document2)) {
      autoPopoverList.set(document2, /* @__PURE__ */ new Set());
    }
    autoPopoverList.get(document2).add(element);
    setInvokerAriaExpanded(popoverInvoker.get(element), true);
  }
  if (shouldRestoreFocus && originallyFocusedElement && element.popover === 'auto') {
    previouslyFocusedElements.set(element, originallyFocusedElement);
  }
  queuePopoverToggleEventTask(element, 'closed', 'open');
}
function hidePopover(element, focusPreviousElement = false, fireEvents = false) {
  if (!checkPopoverValidity(element, true)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (element.popover === 'auto') {
    hideAllPopoversUntil(element, focusPreviousElement, fireEvents);
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  setInvokerAriaExpanded(popoverInvoker.get(element), false);
  popoverInvoker.delete(element);
  if (fireEvents) {
    element.dispatchEvent(
      new ToggleEvent('beforetoggle', {
        oldState: 'open',
        newState: 'closed',
      }),
    );
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  topLayerElements.get(document2)?.delete(element);
  autoPopoverList.get(document2)?.delete(element);
  element.classList.remove(':popover-open');
  visibilityState.set(element, 'hidden');
  if (fireEvents) {
    queuePopoverToggleEventTask(element, 'open', 'closed');
  }
  const previouslyFocusedElement = previouslyFocusedElements.get(element);
  if (previouslyFocusedElement) {
    previouslyFocusedElements.delete(element);
    if (focusPreviousElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function closeAllOpenPopovers(
  document2,
  focusPreviousElement = false,
  fireEvents = false,
) {
  let popover = topMostAutoPopover(document2);
  while (popover) {
    hidePopover(popover, focusPreviousElement, fireEvents);
    popover = topMostAutoPopover(document2);
  }
}
function hideAllPopoversUntil(endpoint, focusPreviousElement, fireEvents) {
  const document2 = endpoint.ownerDocument || endpoint;
  if (endpoint instanceof Document) {
    return closeAllOpenPopovers(document2, focusPreviousElement, fireEvents);
  }
  let lastToHide = null;
  let foundEndpoint = false;
  for (const popover of autoPopoverList.get(document2) || []) {
    if (popover === endpoint) {
      foundEndpoint = true;
    } else if (foundEndpoint) {
      lastToHide = popover;
      break;
    }
  }
  if (!foundEndpoint) {
    return closeAllOpenPopovers(document2, focusPreviousElement, fireEvents);
  }
  while (
    lastToHide &&
    getPopoverVisibilityState(lastToHide) === 'showing' &&
    autoPopoverList.get(document2)?.size
  ) {
    hidePopover(lastToHide, focusPreviousElement, fireEvents);
  }
}
var popoverPointerDownTargets = /* @__PURE__ */ new WeakMap();
function lightDismissOpenPopovers(event) {
  if (!event.isTrusted) return;
  const target = event.composedPath()[0];
  if (!target) return;
  const document2 = target.ownerDocument;
  const topMostPopover = topMostAutoPopover(document2);
  if (!topMostPopover) return;
  const ancestor = topMostClickedPopover(target);
  if (ancestor && event.type === 'pointerdown') {
    popoverPointerDownTargets.set(document2, ancestor);
  } else if (event.type === 'pointerup') {
    const sameTarget = popoverPointerDownTargets.get(document2) === ancestor;
    popoverPointerDownTargets.delete(document2);
    if (sameTarget) {
      hideAllPopoversUntil(ancestor || document2, false, true);
    }
  }
}
var initialAriaExpandedValue = /* @__PURE__ */ new WeakMap();
function setInvokerAriaExpanded(el, force = false) {
  if (!el) return;
  if (!initialAriaExpandedValue.has(el)) {
    initialAriaExpandedValue.set(el, el.getAttribute('aria-expanded'));
  }
  const popover = el.popoverTargetElement;
  if (popover instanceof HTMLElement && popover.popover === 'auto') {
    el.setAttribute('aria-expanded', String(force));
  } else {
    const initialValue = initialAriaExpandedValue.get(el);
    if (!initialValue) {
      el.removeAttribute('aria-expanded');
    } else {
      el.setAttribute('aria-expanded', initialValue);
    }
  }
}

// src/popover.ts
var ShadowRoot2 = globalThis.ShadowRoot || function () {};
function isSupported() {
  return (
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  );
}
function patchSelectorFn(object, name, mapper) {
  const original = object[name];
  Object.defineProperty(object, name, {
    value(selector) {
      return original.call(this, mapper(selector));
    },
  });
}
var nonEscapedPopoverSelector = /(^|[^\\]):popover-open\b/g;
var styles = `
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }
`;
var popoverStyleSheet = null;
function injectStyles(root) {
  if (popoverStyleSheet === null) {
    try {
      popoverStyleSheet = new CSSStyleSheet();
      popoverStyleSheet.replaceSync(styles);
    } catch {
      popoverStyleSheet = false;
    }
  }
  if (popoverStyleSheet === false) {
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    if (root instanceof Document) {
      root.head.prepend(sheet);
    } else {
      root.prepend(sheet);
    }
  } else {
    root.adoptedStyleSheets = [popoverStyleSheet, ...root.adoptedStyleSheets];
  }
}
function apply() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  window.ToggleEvent = window.ToggleEvent || ToggleEvent;
  function rewriteSelector(selector) {
    if (selector?.includes(':popover-open')) {
      selector = selector.replace(nonEscapedPopoverSelector, '$1.\\:popover-open');
    }
    return selector;
  }
  patchSelectorFn(Document.prototype, 'querySelector', rewriteSelector);
  patchSelectorFn(Document.prototype, 'querySelectorAll', rewriteSelector);
  patchSelectorFn(Element.prototype, 'querySelector', rewriteSelector);
  patchSelectorFn(Element.prototype, 'querySelectorAll', rewriteSelector);
  patchSelectorFn(Element.prototype, 'matches', rewriteSelector);
  patchSelectorFn(Element.prototype, 'closest', rewriteSelector);
  patchSelectorFn(DocumentFragment.prototype, 'querySelectorAll', rewriteSelector);
  patchSelectorFn(DocumentFragment.prototype, 'querySelectorAll', rewriteSelector);
  Object.defineProperties(HTMLElement.prototype, {
    popover: {
      enumerable: true,
      configurable: true,
      get() {
        if (!this.hasAttribute('popover')) return null;
        const value = (this.getAttribute('popover') || '').toLowerCase();
        if (value === '' || value == 'auto') return 'auto';
        return 'manual';
      },
      set(value) {
        this.setAttribute('popover', value);
      },
    },
    showPopover: {
      enumerable: true,
      configurable: true,
      value() {
        showPopover(this);
      },
    },
    hidePopover: {
      enumerable: true,
      configurable: true,
      value() {
        hidePopover(this, true, true);
      },
    },
    togglePopover: {
      enumerable: true,
      configurable: true,
      value(force) {
        if (
          (visibilityState.get(this) === 'showing' && force === void 0) ||
          force === false
        ) {
          hidePopover(this, true, true);
        } else if (force === void 0 || force === true) {
          showPopover(this);
        }
      },
    },
  });
  const originalAttachShadow = Element.prototype.attachShadow;
  if (originalAttachShadow) {
    Object.defineProperties(Element.prototype, {
      attachShadow: {
        enumerable: true,
        configurable: true,
        writable: true,
        value(options) {
          const shadowRoot = originalAttachShadow.call(this, options);
          injectStyles(shadowRoot);
          return shadowRoot;
        },
      },
    });
  }
  const originalAttachInternals = HTMLElement.prototype.attachInternals;
  if (originalAttachInternals) {
    Object.defineProperties(HTMLElement.prototype, {
      attachInternals: {
        enumerable: true,
        configurable: true,
        writable: true,
        value() {
          const internals = originalAttachInternals.call(this);
          if (internals.shadowRoot) {
            injectStyles(internals.shadowRoot);
          }
          return internals;
        },
      },
    });
  }
  const popoverTargetAssociatedElements = /* @__PURE__ */ new WeakMap();
  function applyPopoverInvokerElementMixin(ElementClass) {
    Object.defineProperties(ElementClass.prototype, {
      popoverTargetElement: {
        enumerable: true,
        configurable: true,
        set(targetElement) {
          if (targetElement === null) {
            this.removeAttribute('popovertarget');
            popoverTargetAssociatedElements.delete(this);
          } else if (!(targetElement instanceof Element)) {
            throw new TypeError(`popoverTargetElement must be an element or null`);
          } else {
            this.setAttribute('popovertarget', '');
            popoverTargetAssociatedElements.set(this, targetElement);
          }
        },
        get() {
          if (this.localName !== 'button' && this.localName !== 'input') {
            return null;
          }
          if (
            this.localName === 'input' &&
            this.type !== 'reset' &&
            this.type !== 'image' &&
            this.type !== 'button'
          ) {
            return null;
          }
          if (this.disabled) {
            return null;
          }
          if (this.form && this.type === 'submit') {
            return null;
          }
          const targetElement = popoverTargetAssociatedElements.get(this);
          if (targetElement && targetElement.isConnected) {
            return targetElement;
          } else if (targetElement && !targetElement.isConnected) {
            popoverTargetAssociatedElements.delete(this);
            return null;
          }
          const root = getRootNode(this);
          const idref = this.getAttribute('popovertarget');
          if ((root instanceof Document || root instanceof ShadowRoot2) && idref) {
            return root.getElementById(idref) || null;
          }
          return null;
        },
      },
      popoverTargetAction: {
        enumerable: true,
        configurable: true,
        get() {
          const value = (this.getAttribute('popovertargetaction') || '').toLowerCase();
          if (value === 'show' || value === 'hide') return value;
          return 'toggle';
        },
        set(value) {
          this.setAttribute('popovertargetaction', value);
        },
      },
    });
  }
  applyPopoverInvokerElementMixin(HTMLButtonElement);
  applyPopoverInvokerElementMixin(HTMLInputElement);
  const handleInvokerActivation = (event) => {
    if (!event.isTrusted) return;
    const target = event.composedPath()[0];
    if (!(target instanceof Element) || target?.shadowRoot) {
      return;
    }
    const root = getRootNode(target);
    if (!(root instanceof ShadowRoot2 || root instanceof Document)) {
      return;
    }
    const invoker = target.closest('[popovertargetaction],[popovertarget]');
    if (invoker) {
      popoverTargetAttributeActivationBehavior(invoker);
      return;
    }
  };
  const onKeydown = (event) => {
    const key = event.key;
    const target = event.target;
    if (target && (key === 'Escape' || key === 'Esc')) {
      hideAllPopoversUntil(target.ownerDocument, true, true);
    }
  };
  const addEventListeners = (root) => {
    root.addEventListener('click', handleInvokerActivation);
    root.addEventListener('keydown', onKeydown);
    root.addEventListener('pointerdown', lightDismissOpenPopovers);
    root.addEventListener('pointerup', lightDismissOpenPopovers);
  };
  addEventListeners(document);
  injectStyles(document);
}

// src/index.ts
if (!isSupported()) apply();
//# sourceMappingURL=popover.js.map
