import { getHighlighterCore } from 'shiki/index.mjs';
import getWasm from 'shiki/wasm';
import poimandres from 'shiki/themes/poimandres.mjs';
import html from 'shiki/langs/html.mjs';
import css from 'shiki/langs/css.mjs';
import ts from 'shiki/langs/typescript.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import js from 'shiki/langs/javascript.mjs';

export const highlighter = await getHighlighterCore({
  themes: [
    // or a dynamic import if you want to do chunk splitting
    poimandres,
  ],
  langs: [html, css, js, ts, tsx],
  loadWasm: getWasm,
});
