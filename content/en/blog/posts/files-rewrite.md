---
title: "Rewriting Files for every form factor"
excerpt: "How we rebuilt the file manager with an adaptive sidebar, instant search and light and dark themes."
date: "2026-07-22"
author: "kenji-watanabe"
topics: ["engineering", "design", "convergence"]
cover: "/screenshots/files-light.webp"
coverAlt: "Files app in light theme"
---

Files is the app people open most. The rewrite focused on three things: adaptive layout, instant search and calmer visuals.

![Files app in dark theme](/screenshots/files-dark.webp "Files in the dark theme."){width=1920 height=1080}

## Instant search

A background indexer keeps an SQLite FTS5 index of file names and metadata. Queries return in under 20 ms on a 500,000 file home directory.

:::specs Indexer at a glance
- Storage: SQLite FTS5
- Watcher: fanotify
- p95 query: 18 ms
- Idle CPU: < 0.5%
:::
