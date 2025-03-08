export function extractBetweenComments(
  content: string,
  startComment: string,
  endComment: string,
): string {
  const startIndex = content.indexOf(startComment) + startComment.length;
  const endIndex = content.indexOf(endComment);
  return content.substring(startIndex, endIndex).trim();
}
