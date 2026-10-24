---
title: "One codebase, every screen: how the adaptive shell works"
excerpt: "A tour of the compositor, the form-factor service and the breakpoint system that lets AbstractOS reshape itself when you dock a phone."
date: "2026-09-30"
author: "kenji-watanabe"
topics: ["engineering", "convergence"]
cover: "/blog/convergence.png"
coverAlt: "Overlapping translucent rounded rectangles in phone, tablet and desktop sizes"
---

Convergence is easy to promise and hard to ship. This post walks through how the AbstractOS shell decides what it should look like, and how apps follow along.

## The big picture

Three services cooperate: the **compositor** owns outputs and input devices, the **form-factor service** turns that hardware state into a single mode, and the **shell** renders the layout for that mode.

```mermaid caption="Hardware events flow through the form-factor service before the shell and apps adapt."
flowchart LR
  HW[Displays and input devices] --> C[Compositor]
  C -->|outputs, seats| FF[Form-factor service]
  FF -->|mode: phone, tablet, desktop| S[Adaptive shell]
  FF -->|D-Bus signal| A[Apps via Abstract SDK]
  S --> U[User]
  A --> U
```

## Choosing a mode

The form-factor service scores the current hardware. A keyboard and pointer push toward desktop; a single touch display under 7 inches pushes toward phone. The highest score wins, with hysteresis so the UI does not flicker when you bump a dock.

```rust filename="form_factor/src/score.rs"
pub fn resolve_mode(state: &HardwareState) -> Mode {
    let mut score = Scores::default();

    if state.has_keyboard() && state.has_pointer() {
        score.desktop += 3;
    }
    if let Some(display) = state.primary_display() {
        match display.diagonal_inches() {
            d if d < 7.0 => score.phone += 4,
            d if d < 13.0 => score.tablet += 3,
            _ => score.desktop += 2,
        }
    }

    score.winner_with_hysteresis(state.previous_mode())
}
```

## Following along in apps

Apps never ask “am I on a phone?”. They subscribe to breakpoints based on the space they actually have. This keeps a narrow window on a desktop behaving just like a phone.

:::code-tabs

```ts title="TypeScript"
import { useBreakpoint } from '@abstract/sdk'

export function Sidebar() {
  const bp = useBreakpoint() // 'compact' | 'medium' | 'expanded'
  return bp === 'compact' ? <BottomSheet /> : <SidePanel />
}
```

```rust title="Rust"
use abstract_sdk::Breakpoint;

window.on_breakpoint(|bp| match bp {
    Breakpoint::Compact => sidebar.collapse(),
    _ => sidebar.expand(),
});
```

:::

:::tip
You can force a mode while developing with `abstract-ctl form-factor set tablet`. See the [SDK docs](/docs/developers/sdk/adaptive-layouts).
:::

## What we learned

- Base layouts on available space, never on device type.
- Hysteresis matters more than precision. Users notice flicker immediately.
- Keep transitions under 250 ms so a mode switch feels like a single gesture.
