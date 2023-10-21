import { getHighlighter, type Highlighter } from 'shikiji';

let highlighter: Highlighter;
export async function getOrCreateHighlighter() {
  if (highlighter) {
    return highlighter;
  }
  highlighter = await getHighlighter({ themes: ['nord'], langs: ['tsx', 'css', 'html'] });
  return highlighter;
}
