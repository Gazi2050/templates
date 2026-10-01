# next-admin — Project Overview

A responsive admin dashboard starter built with **Next.js 16 (App Router)**, **React 19**, **TypeScript (strict)**, **Tailwind CSS v4**, and **shadcn/ui** on the `base-nova` style (**Base UI** primitives). State is managed with **Zustand**, validation with **Zod**, forms with **React Hook Form**, and the codebase is linted/formatted by **Biome** with **Husky + lint-staged** on pre-commit.

This document is the full feature, component, and capability reference. For day-to-day agent rules, read [`AGENTS.md`](../AGENTS.md).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack dev), React 19 |
| Language | TypeScript (strict mode, `@/` path alias) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`, `tailwind-merge` via `cn()` |
| UI primitives | shadcn/ui (`base-nova` style) wrapping **Base UI** (`@base-ui/react`) — inspect `src/components/ui/` before use; individual wrappers may differ |
| State | Zustand 5 (vanilla store + React provider) |
| Forms / validation | React Hook Form + `@hookform/resolvers` + Zod 4 |
| Tables | TanStack Table 9 |
| Charts | Recharts 3 |
| Calendar | FullCalendar 7 (`@fullcalendar/react`) + shared views in `src/components/calendar/` |
| Drag & drop | `@dnd-kit/react` + `@dnd-kit/helpers` + `@dnd-kit/abstract` |
| Misc | `cmdk` (command palette), `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `simple-icons` (brand icons), `d3-geo` + `topojson-client` (map), `temporal-polyfill` (dates) |
| Tooling | Biome 2 (lint/format/organize imports), Husky, lint-staged, ts-node (preset generation) |

Package manager: **pnpm** (see `pnpm-lock.yaml`). There is no test runner configured.

---

## Routing map

All application routes live under `src/app/`. The root `layout.tsx` renders `<html>` with the seven preference `data-*` attributes, loads `ThemeBootScript` in `<head>` (pre-hydration preference application), and wraps the tree in `TooltipProvider` → `PreferencesStoreProvider` (+ `Toaster`).

```
src/app/
├── layout.tsx                      # root layout; applies preference data-* attrs to <html>
├── not-found.tsx
├── (external)/page.tsx             # standalone external page
└── (main)/                         # main shell
    ├── dashboard/
    │   ├── layout.tsx              # dashboard shell: SidebarProvider + AppSidebar + header
    │   ├── page.tsx                # redirect → /dashboard/default
    │   ├── [...not-found]/page.tsx # dashboard-scoped 404 catch-all
    │   ├── <screen>/page.tsx       # one folder per dashboard screen (19 screens)
    │   ├── <screen>/_components/   # screen-specific components + mock data (data.ts)
    │   ├── (legacy)/               # legacy v1 screens: default-v1, crm-v1, finance-v1, analytics-v1
    │   └── _components/            # shared dashboard components: header/ + sidebar/
    ├── auth/
    │   ├── v1/{login,register}/    # auth layout variant 1
    │   └── v2/{login,register}/    # auth layout variant 2 (v2 has its own layout.tsx)
    ├── chat/                       # standalone chat app — has its own layout + sidebar
    ├── mail/                       # standalone mail app — has its own layout + sidebar
    └── unauthorized/page.tsx
```

Notes:

- Dashboard screens never own chrome; they render inside `dashboard/layout.tsx` and opt out of content padding with `data-content-padding="false"` on a wrapper element (used by full-bleed apps like chat/mail previews).
- `/dashboard/chat` and `/dashboard/mail` are **preview screens** (iframes of the standalone apps); the real apps live at `/chat` and `/mail` with their own layouts.

---

## Dashboard shell (`src/app/(main)/dashboard/layout.tsx`)

Server Component. Reads the `sidebar_state` cookie for the sidebar's default open state and `sidebar_variant` / `sidebar_collapsible` preferences through `getPreference` (server action), then composes:

- `SidebarProvider` — sets `--sidebar-width: calc(var(--spacing) * 68)`; persists `sidebar_state` cookie.
- `AppSidebar` — client wrapper that overlays the user's live `sidebar_variant` / `sidebar_collapsible` preference values once the preference store hydrates (`isSynced`), falling back to the SSR props before that (no layout flash).
- `SidebarInset` — content column. In `centered` content layout its direct children are capped to `max-w-screen-2xl` and centered via `html[data-content-layout=centered]` selectors; in `full-width` no cap applies.
- `header` — `h-12` bar: `SidebarTrigger`, separator, `SearchDialog` on the left; `LayoutControls` (preferences popover), `ThemeSwitcher`, `AccountSwitcher` on the right. With `data-navbar-style=sticky` it becomes sticky with `bg-background/50` + `backdrop-blur-md`. The header intentionally has **no width/height transition** (removed to avoid per-frame layout + blur thrash while the sidebar animates in full-width layout).
- Content wrapper — `p-4 md:p-6`, suppressed by `data-content-padding="false"`.

---

## Navigation system

**Definition:** `src/navigation/sidebar/sidebar-items.ts` — the sidebar is fully config-driven. `sidebarItems` is a `NavGroup[]`:

```ts
NavGroup        { id, label?, items: NavMainItem[] }
NavMainLinkItem { id, title, url, icon?, badge?, disabled?, newTab? }        // leaf
NavMainParentItem { id, title, icon?, subItems: NavSubItem[] }              // collapsible/dropdown
NavSubItem      { id, title, url, icon?, badge?, disabled?, newTab? }
```

`badge` is `"new" | "soon"`. Parent items cannot nest (a `NavSubItem` has no `subItems`).

**Current nav** (single, unlabeled group):

1. Top-level links: **Default** (`/dashboard/default`), **Chat** (`/dashboard/chat`), **Email** (`/dashboard/mail`), **Tasks**, **Kanban**, **Users**, **Roles**, **Invoice**
2. **Pages** parent item whose `subItems` cover everything else: CRM, Finance, Analytics, Productivity, E-commerce, Academy, Logistics, Infrastructure, File Manager (`new`), Patient Monitoring (`new`), Calendar, Coming Soon (`soon`, disabled), the four Legacy V1 screens, and the four auth screens (Login/Register V1/V2, `newTab`).

**Rendering:** `src/app/(main)/dashboard/_components/sidebar/nav-main.tsx` picks one of three renderers per item — plain link, `Collapsible` (expanded parent on desktop/mobile), or `DropdownMenu` (parent while the sidebar is icon-collapsed). Active state derives from `usePathname`. The sidebar footer contains nothing (the account menu lives in the navbar's `AccountSwitcher`).

**Search:** `src/app/(main)/dashboard/_components/header/search-dialog.tsx` derives its command-palette index by flattening `sidebarItems` — new nav entries appear in ⌘K search automatically.

To add a screen to the nav, add an entry to `sidebarItems` (see "Adding a new screen" below).

---

## Preferences system

The core layout/theming system. Everything is **registry-driven** from `src/lib/preferences/preferences-config.ts`:

```ts
PREFERENCE_REGISTRY = {
  theme_mode:            { values, defaultValue: "system",     persistence: "client-cookie", attribute: "data-theme-mode" },
  theme_preset:          { values, defaultValue: "default",    persistence: "client-cookie", attribute: "data-theme-preset" },
  font:                  { values, defaultValue: "inter",      persistence: "client-cookie", attribute: "data-font" },
  content_layout:        { values, defaultValue: "full-width", persistence: "client-cookie", attribute: "data-content-layout" },
  navbar_style:          { values, defaultValue: "sticky",     persistence: "client-cookie", attribute: "data-navbar-style" },
  sidebar_variant:       { values, defaultValue: "inset",      persistence: "client-cookie", attribute: "data-sidebar-variant" },
  sidebar_collapsible:   { values, defaultValue: "icon",       persistence: "client-cookie", attribute: "data-sidebar-collapsible" },
}
```

- **Persistence modes:** `client-cookie` (default for all seven), `server-cookie` (via Server Action), `localStorage` (non-layout values only), `none`. Layout-critical prefs must stay cookie-backed so SSR matches the client.
- **SSR:** the root layout stamps `PREFERENCE_DEFAULTS` onto `<html data-*>`; the dashboard layout additionally server-reads `sidebar_variant` / `sidebar_collapsible` via `getPreference` to avoid first-paint sidebar mismatch.
- **Pre-hydration:** `src/scripts/theme-boot.tsx` runs in `<head>`, reads cookies, re-stamps every attribute, and resolves `theme_mode: system` against `prefers-color-scheme` (toggles the `dark` class + `color-scheme`) — no flicker, root layout stays static.
- **Client store:** `src/stores/preferences/preferences-store.ts` (Zustand vanilla store) + `preferences-provider.tsx`. `setPreference` applies the attribute immediately (`src/lib/preferences/preference-runtime.ts`), re-resolves theme mode when needed, and persists. The provider also subscribes to OS theme changes while in `system` mode. Components consume via `usePreferencesStore(useShallow(...))`.
- **Server reads:** `src/server/server-actions.ts` (`"use server"`) exposes `getPreference(key)` (cookie → validated via `parsePreference`, falls back to registry default), plus raw `getValueFromCookie` / `setValueToCookie` (7-day default max-age).
- **UI:** `LayoutControls` (header popover) edits all seven preferences and offers **Restore Defaults**; `ThemeSwitcher` cycles light → dark → system.

**Behavioral contract:** cookies always override code defaults once set. Fresh visitors get the registry defaults; **Restore Defaults** re-applies and re-persists the registry defaults.

---

## Fonts

`src/lib/fonts/registry.ts` defines 13 fonts as `next/font` instances (Geist, Inter, DM Sans, Public Sans, Outfit, Geist Mono, Geist Pixel Square, JetBrains Mono, Noto Serif, Roboto Slab, Merriweather, Lora, Playfair Display). Each entry exposes `label` + `font`; the registry derives:

- `fontKeys` — allowed values for the `font` preference
- `fontOptions` — `{ key, label }` for the picker UI
- `fontVars` — all CSS variable classnames, applied once on `<body>` so switching is instant (just a `data-font` attribute flip; `globals.css` maps `data-font` → `--font-sans`/`--font-mono`)

---

## Theme presets

Presets are pure CSS token sets, generated into typed options:

- `src/app/globals.css` — hosts the **default** preset tokens.
- `src/styles/presets/{brutalist,tangerine,soft-pop}.css` — additional presets, selected via `data-theme-preset`.
- `src/lib/preferences/theme.ts` contains a generated `THEME_PRESET_OPTIONS` block (labels + primary color swatches for light/dark) — regenerate with `pnpm run generate:presets` (`src/scripts/generate-theme-presets.ts`) after adding a preset CSS file. Don't hand-edit the generated block.
- `THEME_MODE` handling (light/dark/system resolution, `disable-transitions` guard, system subscription) lives in `src/lib/preferences/theme-utils.ts`.

---

## Server layer

`src/server/server-actions.ts` is the only server module: a `"use server"` file with cookie access (`getValueFromCookie`, `setValueToCookie`) and the validated `getPreference` used by the dashboard layout. There is no database, auth, or API layer in this template — data is mock data.

---

## Mock data conventions

- Screen-scoped mock data lives beside the screen: `src/app/(main)/dashboard/<screen>/_components/data.ts` (or `.tsx` when it holds icon references).
- `src/data/users.ts` seeds the navbar `AccountSwitcher`.
- The mail app's dataset (`src/app/(main)/mail/_components/data.tsx`) includes typed `Mail[]` and navigation structures.

---

## Styling rules

- Tailwind v4 with CSS-first config in `globals.css`; animations via `tw-animate-css`.
- Always style through **semantic theme tokens** (`background`, `foreground`, `muted-foreground`, `primary`, `sidebar-*`, chart tokens…) so every screen works in light, dark, and all presets. Arbitrary hex/oklch values are forbidden unless the user explicitly asks for a non-theme color (then use Tailwind's default palette).
- `cn()` (`src/lib/utils.ts`, clsx + tailwind-merge) for conditional classes.
- **Do not modify** `src/components/ui/` or `src/components/calendar/` — they are shadcn primitives / shared calendar views kept intact; customize where they are consumed.

---

## Screens catalog

**Dashboards (19):** Default, CRM, Finance, Analytics, Productivity, E-commerce, Academy, Logistics, Infrastructure, File Manager, Patient Monitoring, Chat (preview), Email (preview), Calendar, Kanban, Tasks, Invoice, Users, Roles — plus Coming Soon.

**Legacy V1 (4):** Default V1, CRM V1, Finance V1, Analytics V1 (route group `(legacy)` — don't use as references for new screens).

**Auth (4):** Login V1/V2, Register V1/V2 (two layout variants, open in new tabs from the nav).

**Standalone apps:** `/chat` and `/mail` — full-bleed apps with their own layouts and sidebars, embedded as previews inside the dashboard.

**Other:** unauthorized page, dashboard 404 catch-all, `(external)` page.

---

## Commands

```bash
pnpm install               # install (pnpm; lockfile: pnpm-lock.yaml)
pnpm run dev               # dev server → http://localhost:3000
pnpm run build             # production build
pnpm run start             # production server
pnpm run lint              # biome lint
pnpm run format            # biome format --write
pnpm run check             # biome check (lint + format + organize imports)
pnpm run check:fix         # biome check --write
pnpm run generate:presets  # regenerate THEME_PRESET_OPTIONS from styles/presets
```

There is no automated test command. Run build/lint/check only when explicitly requested.

---

## Adding a new screen

1. Copy the closest existing screen (Finance, Infrastructure, CRM, Analytics are good references; never `(legacy)`).
2. Create `src/app/(main)/dashboard/<screen>/page.tsx` (server component — **never** add `"use client"` to `page.tsx`) and break the UI into `page`-local `_components/`.
3. Put mock data in `<screen>/_components/data.ts`.
4. Register it in `src/navigation/sidebar/sidebar-items.ts` (top-level link or `Pages` sub-item).
5. Use semantic theme tokens; match nearby screens in density, radius, and spacing; handle loading/empty/error/disabled/overflow states; keep it accessible (semantic HTML, focus states, labels, ARIA).
6. Verify in light + dark, with the sidebar in all three variants and both collapse modes.
