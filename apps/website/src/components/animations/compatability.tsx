import { component$ } from '@qwik.dev/core';
import { Note, NoteStatus } from '../note/note'; // Adjust the import path based on your structure

export const BrowserAnimationsCompatability = component$(() => {
  return (
    <Note status={NoteStatus.Info}>
      <div class="flex flex-col gap-2">
        <h4>
          <strong>Browser Compatability</strong>
        </h4>
        <p>
          <a href="https://caniuse.com/?search=popover%20API">
            Browser versions that do not support the popover API natively
          </a>{' '}
          have known issues when trying to use animations or transitions. If you need to
          support legacy versions of browsers, please be sure to test this functionality
          independently.
        </p>
      </div>
    </Note>
  );
});
