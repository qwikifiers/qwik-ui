import {
	$,
	Fragment,
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useStore,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik"
import { disableAnimation, getSystemTheme, getTheme } from "./helper"
import { ThemeScript } from "./theme-script"
import type { Theme, ThemeProviderProps, UseThemeProps } from "./types"

const ThemeContext = createContextId<UseThemeProps>("theme-context")

export const useTheme = () => useContext(ThemeContext)

const defaultThemes = ["light", "dark"]

export const ThemeProvider = component$<ThemeProviderProps>(
	({
		forcedTheme,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = "theme",
		themes = defaultThemes,
		defaultTheme = enableSystem ? "system" : "light",
		attribute = "data-theme",
		value,
		nonce,
	}) => {
		const attrs = !value ? themes.flat() : Object.values(value)

		const applyTheme = $((theme: Theme) => {
			let resolved = theme
			if (!resolved) return

			// If theme is system, resolve it before setting theme
			if (theme === "system" && enableSystem) {
				resolved = getSystemTheme()
			}

			// Join the array of attr if the theme is an array
			const computedResolved = Array.isArray(resolved)
				? resolved.join(attribute === "class" ? " " : "-")
				: resolved

			const name = value ? value[computedResolved] : computedResolved

			disableTransitionOnChange ? disableAnimation() : null
			const d = document.documentElement

			if (attribute === "class") {
				d.classList.remove(...attrs)

				if (name) d.classList.add(...name.split(" "))
			} else {
				if (name) {
					d.setAttribute(attribute, name)
				} else {
					d.removeAttribute(attribute)
				}
			}
		})

		const resolvedThemeStore = useStore({
			value: getTheme(storageKey),
			setResolvedTheme: $(function (this: any, theme: string) {
				this.value = theme
			}),
		})

		const themeStore = useStore<UseThemeProps>({
			theme: getTheme(storageKey, defaultTheme),
			setTheme: $(function (this: UseThemeProps, theme) {
				this.theme = theme

				try {
					localStorage.setItem(storageKey, Array.isArray(theme) ? theme.join(" ") : (theme as string))
				} catch (e) {
					// Unsupported
				}
			}),
			forcedTheme,
			themes: enableSystem
				? Array.isArray(themes[0])
					? [...(themes as string[][]), ["system"]]
					: [...(themes as string[]), "system"]
				: themes,
			systemTheme: (enableSystem ? resolvedThemeStore.value : undefined) as "light" | "dark" | undefined,
		})

		useVisibleTask$(({ cleanup }) => {
			themeStore.setTheme(getTheme(storageKey, defaultTheme))

			const media = window.matchMedia("(prefers-color-scheme: dark)")

			const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
				const resolved = getSystemTheme(e)
				resolvedThemeStore.setResolvedTheme(resolved)

				if (themeStore.theme === "system" && enableSystem && !forcedTheme) {
					applyTheme("system")
				}
			}

			media.addEventListener("change", handleMediaQuery)

			handleMediaQuery(media)

			cleanup(() => media.removeEventListener("change", handleMediaQuery))
		})

		// localStorage event handling
		useVisibleTask$(({ cleanup }) => {
			const handleStorage = (e: StorageEvent) => {
				if (e.key !== storageKey) {
					return
				}

				// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
				const theme = e.newValue || defaultTheme
				themeStore.setTheme(theme)
			}

			window.addEventListener("storage", handleStorage)
			cleanup(() => window.removeEventListener("storage", handleStorage))
		})

		// Whenever theme or forcedTheme changes, apply it
		useTask$(({ track }) => {
			track(() => themeStore.theme || forcedTheme)

			if (themeStore.theme !== "system") {
				resolvedThemeStore.setResolvedTheme(themeStore.theme as string)
			}

			applyTheme(forcedTheme ?? themeStore.theme)
		})

		useContextProvider(ThemeContext, themeStore)

		return (
			<Fragment>
				<ThemeScript
					{...{
						forcedTheme,
						disableTransitionOnChange,
						enableSystem,
						enableColorScheme,
						storageKey,
						themes,
						defaultTheme,
						attribute,
						value,
						attrs,
						nonce,
					}}
				/>
				<Slot />
			</Fragment>
		)
	},
)
