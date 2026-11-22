---
'@qwik-ui/headless': patch
---

Select and Combobox now tell forms the value the user picked, so Modular Forms no longer stores an old or empty value. A form sent before any pick now sends the initial value.
