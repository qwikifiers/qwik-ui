type Tags = 'LI';
export function findParentNode(child: HTMLElement, parentTag: Tags) {
  let parent = child.parentElement;
  while (parent !== undefined) {
    console.log(parent?.tagName);

    if (parent?.tagName === parentTag) {
      break;
    }
    parent = parent!.parentNode;
  }
  return parent;
}
