# rn-app — Project Overview

A React Native starter built with **Expo SDK 57** (**React Native 0.86.3**, **React 19.2.3**), **Expo Router** (~57.0.24, file-based routing), **NativeWind 4** (Tailwind CSS classes in RN), and the **React Compiler** (enabled via `app.json` experiments). State primitives and UI are shadcn/ui-style on `@rn-primitives`. The codebase is linted by **ESLint** (`eslint-config-expo`) and formatted by **Prettier** (+ `prettier-plugin-tailwindcss` for class sorting). Type checking is `tsc --noEmit` (strict mode).

This document is the full feature, component, and capability reference. For day-to-day agent rules, read [`AGENTS.md`](../AGENTS.md). The design-system rules live in [`theme-system.md`](theme-system.md).

---

## Tech stack

| Layer         | Choice                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Expo SDK 57 (managed/CNG workflow — no `android/`/`ios/` dirs), Metro bundler                                                         |
| Language      | TypeScript ~6.0 (strict mode, `@/*` path alias → project root)                                                                        |
| Navigation    | Expo Router ~57 (`Stack`, typed routes experiment)                                                                                    |
| Styling       | NativeWind 4 + Tailwind CSS 3.4 (`nativewind/preset`, `withNativeWind` Metro hook, `nativewind/babel` + `jsxImportSource`)            |
| Animations    | react-native-reanimated 4.5 + react-native-worklets 0.10 (SDK 57 matrix)                                                              |
| UI primitives | `@rn-primitives/portal` + `@rn-primitives/slot`; shadcn/ui-style components with `class-variance-authority`, `clsx`, `tailwind-merge` |
| Tooling       | ESLint 9 (`eslint-config-expo`), Prettier + `prettier-plugin-tailwindcss`, pnpm                                                       |

Package manager: **pnpm** (see `pnpm-lock.yaml`). There is no test runner configured.

---

## Routing map

Routing is Expo Router — every file in `app/` is a route. The app entry is `expo-router/entry` (`package.json` → `main`).

```
app/
├── _layout.tsx     # root layout: ThemeProvider + StatusBar + Stack + PortalHost
├── index.tsx       # "/" — home screen (theme-toggle demo)
└── global.css      # imported by the layout; NativeWind entry + token CSS variables
```

- `/dashboard`-style nested routes would be `app/<name>.tsx` or `app/<name>/index.tsx`; no registration step — the file system is the route map.
- `typedRoutes` is enabled, so `href` strings are type-checked (types generate into `.expo/types/`).

---

## Root layout (`app/_layout.tsx`)

Client component composing, in order:

1. NativeWind's `useColorScheme` — latches `dark` as the default on first mount when no scheme is set.
2. `ThemeProvider` (from **`expo-router/react-navigation`** — never `@react-navigation/*`; Expo Router forked React Navigation in SDK 56 and direct imports are unsupported in app code) with `NAV_THEME[scheme]` from `lib/theme.ts`.
3. `StatusBar` from `expo-status-bar` (style follows the active scheme).
4. `Stack` with `headerShown: false` — screens render chrome-less.
5. `PortalHost` from `@rn-primitives/portal` — required by rn-primitives overlays (dialogs, dropdowns).

---

## Theme system

Token-first, with light + dark support. **The authoritative rules live in [`theme-system.md`](theme-system.md)** — read it before styling. Summary:

- **Primitive tokens** (`lib/design-tokens/tokens.ts`, mirrored into `tailwind.config.js`): `primitive.primary|secondary|tertiary|neutral.<50–900>` — raw palette values, for authoring/mapping only, never in screen code.
- **Semantic tokens** (CSS variables in `app/global.css`, consumed as Tailwind utilities): `bg-canvas|surface|elevated|muted`, `text-text-*`, `border-border-*`, `bg-action-*` / `text-action-*` / `border-action-*`, `feedback-*`. Light and dark values swap via NativeWind class-based dark mode.
- **Typography:** `font-headline` / `font-body` / `font-label` + `text-headline` / `text-body` / `text-label` scale (Manrope / Inter declared in `tailwind.config.js`).
- **Navigation theming:** `lib/theme.ts` derives `NAV_THEME.light|dark` from React Navigation's default themes with token colors; consumed by `ThemeProvider` in the root layout.
- **Mode control:** `useColorScheme()` from `nativewind` returns `{ colorScheme, setColorScheme }` — used by the home screen's toggle.

### Fonts — not loaded (intentional gap)

`font-headline`/`font-body`/`font-label` declare `Manrope` / `Inter`, but **no font files are loaded** (no `expo-font`/`useFonts` usage). Text currently renders with system fonts. To activate: add font assets + `expo-font` loading in the root layout (`expo-font` is already in `app.json` plugins). Semantic `font-*` classes need no changes after that.

---

## UI components (`components/ui/`)

shadcn/ui-style primitives adapted for React Native:

- `Button` — `cva`-based variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) + sizes; renders `Pressable`, reads `TextClassContext` so nested `Text` inherits state styles.
- `Text` — typography primitive exposing `TextClassContext`; supports `asChild` via `@rn-primitives/slot`.

`components.json` configures the shadcn CLI (`npx shadcn add …`) with aliases (`@/components`, `@/lib/utils`) for adding more primitives. Web compatibility comes from `react-native-web` + NativeWind.

---

## Commands

```bash
pnpm install               # install (pnpm; lockfile: pnpm-lock.yaml)
pnpm run dev               # expo start — QR for Expo Go, web at localhost:8081
pnpm run android           # expo run:android (native dev build; needs prebuild)
pnpm run ios               # expo run:ios (native dev build; needs prebuild)
pnpm run web               # expo start --web
pnpm run lint              # expo lint (ESLint)
pnpm run lint:fix          # eslint . --fix
pnpm run format            # prettier --write .
pnpm run format:check      # prettier --check .
pnpm run typecheck         # tsc --noEmit
pnpm run doctor            # expo-doctor health checks
pnpm run prebuild          # expo prebuild — generates android/ + ios/
pnpm run prebuild:android  # expo prebuild --platform android
pnpm run prebuild:ios      # expo prebuild --platform ios
pnpm run build:apk         # android release APK (gradle assembleRelease)
pnpm run build:aab         # android release AAB (gradle bundleRelease)
pnpm run build:ios         # iOS release via EAS Build
```

`build:apk` / `build:aab` run `scripts/build-android-release.js` (gradle release build inside the generated `android/` directory — run `prebuild:android` first) and require `.env` to define `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` and `EXPO_PUBLIC_API_BASE_URL`. `build:ios` requires the EAS CLI and an Expo account.

There is no automated test command. Run typecheck/lint/build commands only when explicitly requested.

---

## Adding a new screen

1. Create `app/<name>.tsx` exporting a default component (or `app/<name>/index.tsx` for a folder screen). No registration — the file system is the route map; typed routes pick it up.
2. Style exclusively with **semantic tokens** (see [`theme-system.md`](theme-system.md)) — never raw `primitive.*` colors or hex values.
3. Compose UI from `components/ui/` primitives; keep screen-specific pieces in the same file until reused, then promote to `components/ui/`.
4. Handle both light and dark modes (`useColorScheme`), plus loading/empty/error states as the screen grows.
5. Verify on device (Expo Go) and web, in both modes.
6. Run `pnpm run typecheck` and `pnpm run format:check` when done.

---

## Expo Go & SDK policy

- **Expo Go only runs the latest SDK.** This project targets SDK 57 and loads in current Expo Go.
- **Upgrading:** `pnpm dlx expo install expo@^<next> --fix`, then `pnpm dlx expo-doctor@latest`, then read the release notes (`expo.dev/changelog/sdk-<n>`) for breaking changes. Validate with `pnpm run typecheck` and a boot.
- **Adding native/expo packages:** always `npx expo install <pkg>` — Expo pins the SDK-compatible version. Bare `pnpm add` risks breaking the native module matrix. `expo-doctor` verifies ("required peer dependencies must be installed directly" = install the named package).
- **CNG workflow:** `android/` and `ios/` directories are generated via `pnpm run prebuild` and not committed. Native dev builds (`android`/`ios` scripts) and release builds (`build:apk`/`build:aab`) require them. Expo Go works without them.
- **pnpm + Expo:** `pnpm-workspace.yaml` pins `nodeLinker: hoisted` for Metro compatibility — keep it. Agent skills for Expo/RN work live in `.agents/skills/` (21 skills; see AGENTS.md).
- Generated files (`expo-env.d.ts`, `nativewind-env.d.ts`, `.expo/`) are git-ignored or generated — never hand-edit.

---

## Template contents (post-cleanup)

Dead weight removed in the 2026-10 cleanup (recover from git history if ever needed):

- **Dependencies:** `@expo/vector-icons`, `expo-haptics`, `expo-symbols`, `expo-system-ui`, `expo-image`, `expo-web-browser`, `react-native-gesture-handler`, `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/elements` (expo-router forked React Navigation in SDK 56 — theming imports come from `expo-router/react-navigation`)
- **Kept with reasons:** `expo-constants` (required peer of expo-router — doctor-enforced), `expo-splash-screen` + `expo-font` + `expo-status-bar` (app.json plugins / layout usage), `lib/design-tokens/` (code-unreferenced but documented source of truth for the palette)
- **Config:** removed the dead `reset-project` script and the `expo-image`/`expo-web-browser` plugin entries
