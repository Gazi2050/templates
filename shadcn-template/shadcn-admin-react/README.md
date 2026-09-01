# Admin Dashboard

React admin dashboard template — Vite + TanStack Router/Query + shadcn/ui (Tailwind v4), themed with the EduOS design system (gold accent on dark surfaces).

## Getting Started

```bash
pnpm install
pnpm run dev        # start dev server (http://localhost:5173)
```

## Scripts

| Command                  | What it does                       |
| ------------------------ | ---------------------------------- |
| `pnpm run dev`           | Dev server with HMR                |
| `pnpm run build`         | Type-check + production build      |
| `pnpm run preview`       | Preview the production build       |
| `pnpm run lint`          | ESLint                             |
| `pnpm run format`        | Prettier (write)                   |
| `pnpm run format:check`  | Prettier (check)                   |
| `pnpm run knip`          | Find unused files/exports          |
| `pnpm run test`          | Vitest (headless browser)          |
| `pnpm run test:watch`    | Vitest in watch mode               |
| `pnpm run test:coverage` | Vitest with coverage               |

Browser tests need Chromium once: `pnpm run test:browser:install`.

## Project Structure

```
src/
├── components/
│   ├── ui/         # shadcn/ui primitives (do not edit lightly)
│   ├── layout/     # sidebar, header, nav, authenticated layout
│   └── data-table/ # reusable table pieces (pagination, filters, columns)
├── features/       # page-level feature modules (dashboard, users, tasks, ...)
├── routes/         # TanStack Router file routes
├── stores/         # Zustand stores
├── context/        # React context providers
├── hooks/          # shared hooks
├── lib/            # utilities
├── config/         # app config (fonts, env)
├── styles/         # index.css + theme.css (design tokens)
└── test-utils/     # test helpers
```

## Theming

All design tokens live in `src/styles/theme.css`:

- Semantic tokens — `--background`, `--primary`, `--muted`, `--border`, `--sidebar-*`, etc. (light `:root` + `.dark`)
- Primitive scales — `--primary-50…900`, `--secondary-*`, `--tertiary-*`, `--neutral-*` → usable as `bg-primary-500`, `text-neutral-400`, ...
- Feedback — `--success`, `--warning`, `--info`
- Borders — `--border-subtle`, `--border-strong`, `--border-accent`
- Radius + letter-spacing tokens

Prefer semantic Tailwind classes (`bg-primary`, `text-muted-foreground`) over raw hex values. Dark mode is class-based (`.dark` on `html`).

## Adding a Page

1. Create the route file under `src/routes/` (TanStack Router file-based routing, `routeTree.gen.ts` is generated).
2. Build the feature under `src/features/<name>/`.
3. Add nav entries in `src/components/layout/data/sidebar-data.ts`.

## Notes

- `src/components/ui/` holds customized shadcn components (RTL + tweaks) — merge manually when updating via shadcn CLI.
- Fonts are loaded in `index.html` (Inter, Manrope). Set via `--font-inter` / `--font-manrope` / `--font-mono` tokens.
