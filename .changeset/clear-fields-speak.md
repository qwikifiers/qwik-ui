---
'@qwik-ui/headless': minor
---

fix: the Select trigger now has the `combobox` role and tells screen readers when the Select is required or invalid. Tests that find the trigger by the `button` role need to look for `combobox`.
