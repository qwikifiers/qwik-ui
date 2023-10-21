import { getHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter;
export async function getOrCreateHighlighter() {
  if (highlighter) {
    return highlighter;
  }
  highlighter = await getHighlighter({ theme: 'css-variables' });
  return highlighter;
}
