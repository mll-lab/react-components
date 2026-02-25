# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@mll-lab/react-components` — shared React component library built on Ant Design 4, styled-components 6, and TypeScript 5.
Published to npm with dual ESM/CJS output via Rollup.

Repository: https://github.com/mll-lab/react-components

## Commands

Run `yarn` before other commands to install dependencies and ensure they are up to date.

```bash
yarn run test                              # Run all tests (Jest)
yarn run test src/DatePicker/index.test.tsx  # Run a single test file
yarn run test --testPathPattern=DatePicker  # Run tests matching a pattern
yarn run lint                              # ESLint
yarn run fix                               # ESLint with --fix
yarn run typecheck                         # TypeScript check (no emit)
yarn run build                             # Full build: clean + Rollup + TS declarations
yarn run storybook                         # Dev server on port 6006
yarn run validate                          # lint + typecheck + test + test:storybook
```

## Architecture

### Component Pattern

Each component lives in `src/<ComponentName>/` with an `index.tsx` entry.
Many components are thin wrappers around Ant Design, re-exporting with consistent types:

```tsx
export const Alert: typeof AntdAlert = AntdAlert;
export type AlertProps = AntdAlertProps;
```

All public exports go through `src/index.ts` — named exports only, no default exports.

### Styling

- **`src/theme.ts`** defines `PALETTE` (raw colors) and `THEME` (semantic mapping like `successColor`, `errorColor`)
- `<Provider>` wraps apps with ThemeProvider; components access theme via `useTheme()`
- Ant Design Less overrides in `src/antd.less`

### Storybook

`yarn run storybook` starts the dev server on port 6006.
`yarn run test:storybook` runs visual tests via Playwright against the running Storybook dev server.
Playwright browsers must be installed first via `yarn playwright install`.

### Testing

- Test ID attribute is `id` (not `data-testid`)

## Releases and Pre-releases

Releases are fully automated via semantic-release.
The release workflow is triggered by pushes to `master`, `alpha`, and `beta` branches.

- **`master`** — stable releases (e.g. `20.4.0`)
- **`alpha`** — alpha pre-releases (e.g. `19.16.0-alpha.1`), published on the `alpha` npm dist-tag
- **`beta`** — beta pre-releases, published on the `beta` npm dist-tag

### Pre-release workflow

To test breaking or experimental changes before a stable release:

1. Create/update the `alpha` branch (branch off `master` or merge into existing `alpha`)
2. Push commits with conventional commit messages to `alpha`
3. semantic-release automatically publishes a version like `X.Y.Z-alpha.N` to npm
4. Consumers install with `yarn add @mll-lab/react-components@alpha`
5. When ready, merge `alpha` into `master` for a stable release

The `alpha` and `beta` branches are **long-lived** — do not delete them after merging.
Conventional commits determine the version bump (feat = minor, fix = patch, BREAKING CHANGE = major) on all branches equally.

## Conventions

- Component types follow the pattern `ComponentNameProps` and `ComponentNameRef`
