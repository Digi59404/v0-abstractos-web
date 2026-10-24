---
title: "Display and scaling"
description: "Change resolution, fractional scaling, night light and arrange multiple monitors."
updated: "2026-10-02"
order: 2
---

AbstractOS supports fractional scaling in 25% steps on every display. Each monitor keeps its own scale so a HiDPI laptop and a standard monitor both look sharp.

## Scaling

:::steps

### Open Display

Go to **Settings → Display**.

### Pick a monitor

Select the monitor in the arrangement preview.

### Choose a scale

Select 100%, 125%, 150%, 175% or 200%. The change applies immediately and reverts after 15 seconds unless you keep it.

:::

## Night light

Night light warms the display after sunset. Location is used only to calculate sunset and never leaves the device.

## Config file

Display settings are stored per user in `~/.config/abstract/displays.toml`:

```toml filename="~/.config/abstract/displays.toml"
[[output]]
name = "eDP-1"
scale = 1.5
refresh = 120

[[output]]
name = "DP-2"
scale = 1.0
position = { x = 2560, y = 0 }

[night_light]
enabled = true
temperature = 4000
```
