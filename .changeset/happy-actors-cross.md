---
'@qwik-ui/headless': patch
'@qwik-ui/styled': patch
'@qwik-ui/themes': patch
'@qwik-ui/utils': patch
---

FIX: all @qwik-ui packages are now side effect free. This cleans up the consumers bundle-graphs of unnecessary static imports, preventing any likelyhood of over-preloading.
