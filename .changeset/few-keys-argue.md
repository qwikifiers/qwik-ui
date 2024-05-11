---
'@qwik-ui/headless': minor
---

### Modal API Changes

In a previous release, the following components have been deprecated:

- ModalHeader
- ModalContent
- ModalFooter

These components were native header, div, and footer elements and did nothing special under the hood. We are deprecating them in order to simplify the API and make it more consistent with the rest of the components.

The new components are:

#### <Modal.Root>

This is the main container of the modal, and now holds the major props and configuration. Examples include:

- 'bind:show'?: Signal<boolean>;
- closeOnBackdropClick?: boolean;
- alert?: boolean;
- onShow$?: QRL<() => void>;
- onClose$?: QRL<() => void>;

#### <Modal.Panel>

Previously `<Modal />` the modal panel is the dialog element that is rendered on top of the page. Its props have since been moved to the `<Modal.Root />` component, please refer to the docs for more information.

#### <Modal.Trigger>

The modal now comes with a default trigger, which will open the modal when clicked.

#### <Modal.Title>

This computes the accessible name from the string children of the modal.

### <Modal.Description>

This computes the accessible description from the string children of the modal.

### <Modal.Close>

This is a button that closes the modal when clicked.
