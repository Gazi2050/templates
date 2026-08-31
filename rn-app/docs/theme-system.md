# Theme System

This project uses a token-first theme model with light and dark mode support.
The goal is to style UI with semantic tokens instead of hardcoded color values.

## Source Of Truth

- Typed token definitions live in `lib/design-tokens/tokens.ts`.
- Token type contracts live in `lib/design-tokens/types.ts`.
- Tailwind token wiring lives in `tailwind.config.js`.
- Runtime mode values are defined with CSS variables in `app/global.css`.

## Token Layers

### 1) Primitive Tokens

Primitive tokens hold raw palette values:

- `primitive.primary.*`
- `primitive.secondary.*`
- `primitive.tertiary.*`
- `primitive.neutral.*`

Use primitives for system authoring and mapping only. Avoid direct usage in screen code.

### 2) Semantic Tokens

Semantic tokens express intent and should be used by app UI:

- Backgrounds: `bg-canvas`, `bg-surface`, `bg-elevated`, `bg-muted`
- Text: `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-accent`
- Borders: `border-border-subtle`, `border-border`, `border-border-strong`, `border-border-accent`
- Actions: `bg-action-primary-bg`, `text-action-primary-text`, `border-action-primary-border` (and `secondary` / `inverted`)
- Feedback: `text-feedback-success`, `bg-feedback-warning`, etc.

## Typography Tokens

Typography intent tokens are exposed in Tailwind:

- `font-headline`, `text-headline`
- `font-body`, `text-body`
- `font-label`, `text-label`

These encode a consistent type scale for headline/body/label usage.

## Light And Dark Behavior

- `app/global.css` defines light CSS variables under `:root`.
- Dark values are applied through `.dark:root` using NativeWind class-based mode.
- Semantic class names remain unchanged across modes.

## Usage Rules

- Prefer semantic tokens in feature/screen code.
- Do not introduce new raw hex colors in UI files.
- If a new design value is needed, add it to tokens first, then consume semantically.
- Keep semantic naming stable even if primitive values change later.
