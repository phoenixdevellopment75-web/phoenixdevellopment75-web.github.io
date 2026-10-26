# Phoenix Portfolio Website

This archive contains the complete editable Vite/React source, public portrait and brand assets, pinned pnpm lockfile, and a prebuilt production site in `dist/`.

## Run locally

Requirements: Node.js and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local Vite URL shown in the terminal (the configured project port is 3000).

## Build / serve the production site

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

The publish-ready static files are written to `dist/`. The included `dist/` is already built and can also be served by any static web host.
