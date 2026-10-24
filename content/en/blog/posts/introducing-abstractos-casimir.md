---
title: "Introducing AbstractOS 0.1 “Casimir”"
excerpt: "Our first public alpha is here. One Linux system that adapts to your phone, tablet and desktop, with a new shell, Files, Turbine and the installer."
date: "2026-10-14"
author: "ada-moreno"
topics: ["releases", "convergence"]
cover: "/blog/release-casimir.png"
coverAlt: "Abstract composition of a blue slash, coral circle and yellow triangle"
featured: true
---

Today we are releasing **AbstractOS 0.1, codenamed Casimir**, the first public alpha of an operating system designed from day one to run on phones, tablets and desktops from a single codebase.

Casimir is an alpha. It is rough in places and it will break. But it is also the first time the whole convergent stack — compositor, adaptive shell, core apps and installer — ships together as something you can boot.

## What is in this release

- **Adaptive shell** that switches between touch, tablet and windowed layouts as displays and input devices change.
- **Files**, a rewritten file manager with adaptive sidebars and a new search index.
- **Turbine**, our privacy-first browser built on a hardened engine.
- **Exposition**, the new overview for switching apps and workspaces.
- A guided **installer** with full-disk encryption on by default.

![Exposition overview showing open windows on a desktop](/screenshots/exposition.webp "Exposition gathers every open app and workspace into one calm overview."){width=1920 height=1080}

## Supported hardware

| Form factor | Architecture | Status |
| --- | --- | --- |
| Desktop and laptop | x86_64 | Supported |
| Desktop and laptop | aarch64 | Preview |
| Tablets | aarch64 | Preview |
| Phones (PinePhone Pro, Librem 5) | aarch64 | Experimental |

:::warning Alpha software
Casimir is not ready to be your daily driver. Back up your data, and try it in a virtual machine or on a spare device first. See [the install guide](/docs/users/getting-started/installing).
:::

## Try it today

Images for every supported architecture are on the [download page](/download). Verify your download before flashing:

```bash
sha256sum -c abstractos-0.1-casimir-x86_64.iso.sha256
# abstractos-0.1-casimir-x86_64.iso: OK
```

## What comes next

The next milestone focuses on phone stability, the settings app, and our app SDK. Follow the roadmap on the [Ethos page](/ethos) and tell us what breaks on the [forums](https://discourse.abstractos.org).

> An operating system should get out of your way, whatever screen you are holding.
>
> — From the AbstractOS mission statement
