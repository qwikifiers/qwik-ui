---
'@qwik-ui/headless': patch
---

fix: combobox item labels that come from a reactive expression (for example `<Combobox.ItemLabel>{user.label}</Combobox.ItemLabel>` where `user` comes from a store) are now resolved to their text, instead of putting `[object Object]` in the input
