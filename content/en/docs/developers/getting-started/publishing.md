---
title: "Packaging and publishing"
description: "Build a Flatpak bundle and submit your app to Exposition."
updated: "2026-09-18"
order: 3
---

:::steps

### Build a bundle

Run `abstract build --release` to produce a `.flatpak` bundle.

### Add store metadata

Screenshots for each form factor, a description and an icon go in `store/`.

### Submit

Run `abstract publish`. Reviews usually take one to two days.

:::

```mermaid caption="Publishing pipeline"
flowchart LR
  A[abstract publish] --> B[Automated checks]
  B --> C{Permissions OK?}
  C -->|yes| D[Human review]
  C -->|no| E[Changes requested]
  D --> F[Live in Exposition]
```

```bash
abstract build --release
abstract publish --channel stable
```
