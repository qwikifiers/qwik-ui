import { createContextId } from '@builder.io/qwik';
import { type CollapsibleContext } from './collapsible-context.type';

export const collapsibleContextId = createContextId<CollapsibleContext>('collapsible');
