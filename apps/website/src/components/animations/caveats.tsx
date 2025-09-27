import { component$ } from '@builder.io/qwik';
import { Note, NoteStatus } from '../note/note'; // Adjust the import path based on your structure

export const TopLayerAnimationsCaveats = component$(() => {
  return (
    <Note status={NoteStatus.Warning}>
      <strong>Important Caveats for Animating Discrete Properties</strong>

      <ul class="mt-4 list-disc bg-linear-to-b pl-4">
        <li>
          <strong>
            Animating <code>display</code> and <code>overlay</code>:
          </strong>
          <p>
            The <code>display</code> property must be included in the transitions list to
            ensure the element remains visible throughout the animation. The value flips
            from <code>none</code> to <code>block</code> at 0% of the animation, ensuring
            visibility for the entire duration. The&nbsp;
            <code>overlay</code> ensures the element stays in the top layer until the
            animation completes.
          </p>
        </li>
        <li>
          <strong>
            Using <code>transition-behavior: allow-discrete</code>:
          </strong>
          <p>
            This property is essential when animating discrete properties like{' '}
            <code>display</code> and <code>overlay</code>, which are not typically
            animatable. It ensures smooth transitions for these discrete properties.
          </p>
        </li>
        <li>
          <strong>
            Setting Starting Styles with <code>@starting-style</code>:
          </strong>
          <p>
            CSS transitions are only triggered when a property changes on a visible
            element. The&nbsp;
            <code>@starting-style</code> at-rule allows you to set initial styles (e.g.,{' '}
            <code>opacity</code> and
            <code>transform</code>) when the element first appears, ensuring that the
            animation behaves predictably.
          </p>
        </li>
      </ul>
    </Note>
  );
});
