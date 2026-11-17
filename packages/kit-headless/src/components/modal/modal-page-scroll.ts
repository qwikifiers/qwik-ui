import { createNoScroll } from '@fluejs/noscroll';
import { initTouchHandler, resetTouchHandler } from '@fluejs/noscroll/touch';

export const pageScroll = createNoScroll({
  onInitScrollDisable: initTouchHandler,
  onResetScrollDisable: resetTouchHandler,
});
