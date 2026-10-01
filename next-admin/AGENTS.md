# AGENTS.md

## Project overview

**next-admin** is a responsive admin dashboard built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. The app is `next-admin`.

For the full feature, screen, and component catalog, read **`docs/project-overview.md`**.

This repository uses the shadcn `base-nova` style. When the shadcn CLI reports `base: "base"`, it refers to Base UI. Always inspect the local components in `src/components/ui/` because individual wrappers may use different primitives.

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Package manager

This project uses **pnpm**. Do not use npm or yarn.

```bash
pnpm install
pnpm run dev
```

Available commands:

```bash
pnpm run dev        # start the dev server (http://localhost:3000)
pnpm run build      # production build
pnpm run start      # start the production server
pnpm run check      # biome check (lint + format + import sorting)
pnpm run check:fix  # biome check --write
pnpm run typecheck  # tsc --noEmit
```

There is currently no automated test command. Run build, lint, check, or other validation commands only when the user explicitly requests that validation.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                    # root layout; applies preference <html> data-* attrs
│   ├── not-found.tsx
│   ├── (external)/page.tsx
│   └── (main)/
│       ├── dashboard/
│       │   ├── layout.tsx            # sidebar + header shell (SidebarProvider, AppSidebar, LayoutControls, ThemeSwitcher, AccountSwitcher, SearchDialog)
│       │   ├── page.tsx              # redirect to /dashboard/default
│       │   ├── <screen>/page.tsx     # one folder per dashboard screen
│       │   ├── <screen>/_components/ # screen-specific components (mock data in _components/data.ts)
│       │   ├── (legacy)/             # legacy v1 screens (default-v1, crm-v1, finance-v1, analytics-v1)
│       │   └── _components/          # shared dashboard components (header/, sidebar/)
│       ├── auth/                     # auth screens: v1/login, v1/register, v2/login, v2/register
│       ├── chat/                     # standalone chat app (own layout + sidebar)
│       ├── mail/                     # standalone mail app (own layout + sidebar)
│       └── unauthorized/page.tsx
├── components/
│   ├── ui/                           # shadcn/ui primitives — DO NOT MODIFY
│   ├── calendar/                     # shared event calendar views — DO NOT MODIFY
│   ├── simple-icon.tsx               # renders simple-icons brand icons
│   └── date-range-picker.tsx
├── config/
│   └── app-config.ts                 # app name ("next-admin"), version, copyright, meta title
├── data/
│   └── users.ts                      # seed users for the navbar AccountSwitcher
├── hooks/                            # use-mobile, use-lg
├── lib/
│   ├── preferences/                  # preference registry, defaults, theme logic & boot helpers
│   ├── fonts/                        # next/font registry (18 fonts; default: Inter)
│   ├── local-storage.client.ts       # client localStorage helper
│   ├── cookie.client.ts              # client cookie helper
│   ├── data-table-features.ts
│   └── utils.ts                      # cn() + helpers (shared, cross-cutting only)
├── navigation/
│   └── sidebar/sidebar-items.ts      # sidebar nav definition (groups, items, sub-items)
├── scripts/                          # theme-boot.tsx (pre-hydration preference boot script)
├── server/
│   └── server-actions.ts             # "use server": getPreference / getValueFromCookie / setValueToCookie
├── stores/
│   └── preferences/                  # Zustand preference store + provider
└── styles/
    ├── presets/                      # theme presets (Brutalist, Soft Pop, Tangerine; Default lives in globals.css)
    └── flag-icons/
```

## Key systems

### Navigation (`src/navigation/sidebar/sidebar-items.ts`)

The sidebar is config-driven. `sidebarItems` is a `NavGroup[]` array; the current nav has a single group with top-level items **Default, Chat, Email, Tasks, Kanban, Users, Roles, Invoice** and a **Pages** parent item whose `subItems` cover the remaining screens (CRM, Finance, Analytics, Productivity, E-commerce, Academy, Logistics, Infrastructure, File Manager, Patient Monitoring, Calendar, Coming Soon), the legacy V1 variants, and the auth screens (Login/Register v1/v2). Parent items cannot nest further. Add new screens here when they should appear in the dashboard navigation; the ⌘K search dialog indexes this file automatically. Parent items latch their initial expanded state from the route — do not make `defaultOpen` route-reactive (uncontrolled Collapsible; Base UI warns and ignores post-init changes).

### Preferences

Theme/layout preferences are registry-driven. Defaults (`theme_preset = "default"`, `theme_mode = "system"`, `font = "inter"`, `content_layout = "full-width"`, `navbar_style = "sticky"`, `sidebar_variant = "inset"`, `sidebar_collapsible = "icon"`) live in `src/lib/preferences/preferences-config.ts` and are applied to `<html>` data attributes by the root layout. `src/scripts/theme-boot.tsx` re-applies cookie values before hydration (including resolving `system` theme mode) to prevent flicker. The server reads preference values through `getPreference` in `src/server/server-actions.ts`; the client store/provider live in `src/stores/preferences/`. Persisted cookies always override code defaults; **Restore Defaults** in the preferences popover re-applies the registry defaults. The dashboard header surfaces the layout-controls popover, theme switcher, and account switcher only.

### Theme presets & fonts

Presets are CSS token sets: the **Default** preset lives in `src/app/globals.css`; Brutalist, Soft Pop, and Tangerine live in `src/styles/presets/`. The typed options block in `src/lib/preferences/theme.ts` is generated content — treat it as checked-in source and never hand-edit it (the generator script was removed in the cleanup; recover it from git history if a new preset is ever added). Fonts are `next/font` instances registered in `src/lib/fonts/registry.ts`; the registry exposes `fontKeys`, `fontOptions`, and `fontVars` (all variable classnames are applied to `<body>` once — switching fonts only flips the `data-font` attribute).

### App config (`src/config/app-config.ts`)

Single source of truth for the app name, version, copyright, and meta title. Consumed by the root layout and the sidebar brand. Do not hardcode the app name elsewhere.

### Mock data

Mock data lives beside the screens that use it (`<screen>/_components/data.ts`). `src/data/users.ts` seeds the navbar account switcher. There is no database or API layer in this template.

## shadcn skill

Use the shadcn skill for all work involving shadcn/ui components, styling, composition, registries, presets, or `components.json`.

If the skill is not available, install it with:

```bash
npx skills add shadcn/ui
```

The skill contains the component, styling, composition, accessibility, and CLI rules. Do not duplicate those rules here. Always inspect the local component source before using it.

Do not modify files inside `src/components/ui/` or `src/components/calendar/`. Keep these components intact and apply styling or customization where they are used.

## Co-location-based structure

Keep feature code close to the route that owns it.

- Dashboard routes: `src/app/(main)/dashboard/<screen>/page.tsx`
- Screen-specific components: `src/app/(main)/dashboard/<screen>/_components/`
- Screen-specific data and schemas: `src/app/(main)/dashboard/<screen>/_components/data.ts`
- Shared dashboard components: `src/app/(main)/dashboard/_components/`
- Shared application components: `src/components/`
- Local shadcn components: `src/components/ui/`
- Shared hooks and utilities: `src/hooks/` and `src/lib/`
- Theme presets: `src/styles/presets/`
- Seed data shared across the shell: `src/data/`

Keep a component inside its route until it is reused by another feature. Do not move screen-specific code into a shared directory preemptively.

## Creating or extending a screen

1. Inspect the closest current screen before writing code. Finance, Infrastructure, CRM, and Analytics are useful references. Do not use routes under `(legacy)` as references for new screens unless maintaining a legacy route.
2. When reproducing a UI from a screenshot or image, follow its visual direction closely, including layout, hierarchy, spacing, component structure, and important details. Implement it with the project's existing components and semantic theme tokens rather than copying raw color values. If the design needs a color that is not available through the existing theme tokens, or the user explicitly requests a non-theme color, use a named color from Tailwind's default palette. Do not use arbitrary hex, RGB, HSL, or OKLCH values.
3. Reuse the existing dashboard shell, local components, layout controls, and theme tokens.
4. Break each new page into focused components inside the route's `_components/` directory. Keep `page.tsx` small and focused on composing those pieces.
5. Never add `"use client"` to `page.tsx`. Move interactive or browser-dependent code into a dedicated Client Component.
6. Add the screen to `src/navigation/sidebar/sidebar-items.ts` when it should appear in the dashboard navigation.
7. Decide the information hierarchy before choosing widgets. Let the content determine the page structure.
8. Keep the established visual rhythm where it fits: compact spacing, clear typography hierarchy, responsive action rows, and grids that collapse cleanly on smaller screens.
9. Widget selection is not a fixed formula. Try different arrangements of cards, resource rows, meters, charts, tabs, empty states, and actions, then keep the version that communicates the content clearly and feels consistent with the project.
10. Match nearby screens in card density, borders, radius, spacing, content width, and responsive behavior.
11. Use semantic theme tokens so new screens work with light mode, dark mode, and the existing theme presets.
12. Handle relevant loading, empty, error, disabled, and overflow states.
13. Keep screens accessible with semantic HTML, keyboard support, visible focus states, labels, and appropriate ARIA attributes.

## Code conventions

- TypeScript strict mode is enabled. Use precise types and avoid `any`.
- Use the existing `@/` import aliases.
- Follow the Biome configuration: double quotes, semicolons, two-space indentation, sorted imports, and a 120-character line width.
- Avoid unnecessary dependencies.
- Keep changes focused and do not refactor unrelated files.
- Use conventional commit prefixes such as `feat:`, `fix:`, `refactor:`, `docs:`, and `chore:`.
