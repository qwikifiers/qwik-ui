import { component$ } from '@builder.io/qwik';
import { Note, NoteStatus } from '../note/note'; // Adjust the import path based on your structure
import { Badge } from '~/components/ui';

export const BrowserAnimationsCompatability = component$(() => {
  return (
    <Note status={NoteStatus.Info}>
      <div class="flex flex-col gap-2">
        <h4>
          <strong>Browser Compatability</strong>
        </h4>
        Browser versions that do not support the popover API natively have known issues
        when trying to use animations or transitions. If you need to support legacy
        versions of browsers, please be sure to test this functionality independently.
        <table class="w-full min-w-[540px] text-left sm:min-w-full">
          <thead>
            <tr>
              <th>Browser</th>
              <th>Minimum Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Internet Explorer</td>
              <td>
                <Badge look="alert" class="w-12 justify-center">
                  N/A
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Firefox</td>
              <td>
                <Badge look="primary" class="w-12 justify-center">
                  125
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Chrome</td>
              <td>
                <Badge look="primary" class="w-12 justify-center">
                  114
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Safari</td>
              <td>
                <Badge look="primary" class="w-12 justify-center">
                  17
                </Badge>
              </td>
            </tr>
            <tr>
              <td>Edge</td>
              <td>
                <Badge look="primary" class="w-12 justify-center">
                  114
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Note>
  );
});
