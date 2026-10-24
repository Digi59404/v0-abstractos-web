---
title: "Architecture overview"
description: "The layers that make up AbstractOS, from the Linux kernel to the adaptive shell."
updated: "2026-10-12"
order: 1
---

AbstractOS is a Linux distribution with a single userspace for every form factor. The same packages run on phones, tablets and PCs; only the kernel and device configuration differ.

```mermaid caption="The AbstractOS stack"
flowchart TB
  subgraph Apps
    A1[Files] --- A2[Turbine] --- A3[Third-party apps]
  end
  subgraph Platform
    K[AbstractKit toolkit] --- P[Portals and D-Bus services]
  end
  subgraph Shell
    S[Adaptive shell] --- C[Wayland compositor]
  end
  subgraph Base
    SD[systemd] --- PW[PipeWire] --- NM[NetworkManager]
  end
  L[Linux kernel and device config]
  Apps --> Platform --> Shell --> Base --> L
```

## Components

| Layer | Component | Repository |
| --- | --- | --- |
| Shell | Compositor and shell | `abstract/shell` |
| Toolkit | AbstractKit adaptive widgets | `abstract/kit` |
| Services | Settings, notifications, portals | `abstract/services` |
| Images | Image builder and device configs | `abstract/image` |

## Design principles

- **One codebase** — no separate mobile and desktop builds.
- **Upstream first** — we contribute fixes to the kernel, Wayland and GNOME libraries rather than fork.
- **Sandboxed apps** — all apps run through portals and Flatpak.
