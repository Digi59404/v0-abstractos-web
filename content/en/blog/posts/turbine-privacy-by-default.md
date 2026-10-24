---
title: "Turbine: a browser that keeps your data where it belongs"
excerpt: "Why we built our own browser shell, how tracking protection works, and the trade-offs we made for speed."
date: "2026-08-27"
author: "kenji-watanabe"
topics: ["engineering"]
cover: "/screenshots/turbine.webp"
coverAlt: "Turbine browser window with a clean start page"
---

Turbine is the default browser in AbstractOS. It is built on a hardened engine with an adaptive shell of our own, so it feels at home in phone, tablet and desktop modes.

## Privacy defaults

| Feature | Default | Notes |
| --- | --- | --- |
| Third-party cookies | Blocked | Partitioned per site when allowed |
| Known trackers | Blocked | Lists update weekly |
| Telemetry | Off | Opt-in crash reports only |
| HTTPS-only mode | On | Prompts before loading HTTP |

![Turbine browser start page](/screenshots/turbine.webp "Turbine in desktop mode."){width=1920 height=1080}

## Policy for administrators

Organizations can pin settings with a JSON policy file:

```json filename="/etc/turbine/policies.json"
{
  "HttpsOnlyMode": "force",
  "BlockThirdPartyCookies": true,
  "Homepage": "https://intranet.example.org"
}
```
