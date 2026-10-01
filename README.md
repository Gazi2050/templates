# Templates

📦 Collection of production-ready starter templates. Degit, install, build.

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

Uses [degit](https://github.com/Rich-Harris/degit) — copies the template without git history (no git binary needed; the repo must be public, or degit falls back to git).

### Next.js admin dashboard

```bash
npx degit Gazi2050/templates/next-admin my-dashboard
```

```bash
cd my-dashboard
```

```bash
pnpm install
```

```bash
pnpm run dev
```

### Expo mobile app

```bash
npx degit Gazi2050/templates/rn-app my-mobile-app
```

```bash
cd my-mobile-app
```

```bash
pnpm install
```

```bash
pnpm run dev
```

Prefer git? Clone the whole monorepo and work inside a subfolder:

```bash
git clone https://github.com/Gazi2050/templates.git
```

```bash
cd templates/next-admin
```

```bash
pnpm install
```

```bash
pnpm run dev
```

## Per-template docs

- [`next-admin` overview](./next-admin/docs/project-overview.md)
- [`rn-app` overview](./rn-app/docs/project-overview.md)
