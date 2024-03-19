import { component$, PropsOf, Slot, useComputed$, useContext } from '@builder.io/qwik';
import { checkboxContextId } from './context';

export type CheckboxLabelProps = PropsOf<'label'> & {};

export const CheckboxLabel = component$<CheckboxLabelProps>((props) => {
  const context = useContext(checkboxContextId);
  const { name, value } = context;
  const labelId = `${context.localId}-label`;
  const renderInput = name !== undefined && value !== undefined;
  return (
    <label id={labelId} {...props}>
      {renderInput && <input type="hidden" id="magic" value={`${value}`} name={name} />}
      <Slot />
    </label>
  );
});
