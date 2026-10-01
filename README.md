# Templates

A collection of production-ready starter templates: a Next.js admin dashboard and an Expo mobile app.

## Requirements

- [Node.js](https://nodejs.org/) ≥ 20.19
- [pnpm](https://pnpm.io/) 9+
- [Expo Go](https://expo.dev/go) (latest) on your device — for `rn-app` only

## Templates

| Template | Stack | Docs |
|---|---|---|
| [`next-admin`](./next-admin) | Next.js 16 · React 19 · Tailwind CSS v4 · shadcn/ui (Base UI) | [README](./next-admin/README.md) · [Overview](./next-admin/docs/project-overview.md) |
| [`rn-app`](./rn-app) | Expo SDK 57 · React Native 0.86 · NativeWind 4 · Expo Router | [README](./rn-app/README.md) · [Overview](./rn-app/docs/project-overview.md) |

## Scaffold a template

Uses [degit](https://github.com/Rich-Harris/degit) — copies the template without git history (no git binary needed; the repo must be public, or degit falls back to git):

### Next.js admin dashboard

```bash
npx degit Gazi2050/templates/next-admin my-dashboard
cd my-dashboard
pnpm install
pnpm run dev          # → http://localhost:3000
```

### Expo mobile app

```bash
npx degit Gazi2050/templates/rn-app my-mobile-app
cd my-mobile-app
pnpm install
pnpm run dev          # → scan the QR with Expo Go, or press w for web
```

Prefer git? Clone the whole monorepo and work inside a subfolder:

```bash
git clone https://github.com/Gazi2050/templates.git
cd templates/next-admin && pnpm install && pnpm run dev
```

For per-template architecture, conventions, and build/deploy commands, read each template's README and `docs/project-overview.md`.
