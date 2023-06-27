import { createContextId } from '@builder.io/qwik';
import { AutocompleteContext } from './autocomplete-context.type';

const AutocompleteContextId =
  createContextId<AutocompleteContext>('autocomplete-root');

export default AutocompleteContextId;
