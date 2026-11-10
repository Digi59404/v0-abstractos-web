---
title: "Reading system settings"
description: "Read appearance, accent and locale settings and react to changes over D-Bus."
updated: "2026-09-15"
order: 1
---

System settings are exposed through the `org.abstractos.Settings1` D-Bus interface and the standard Settings portal for sandboxed apps.

## Keys

| Key | Type | Example |
| --- | --- | --- |
| `appearance.color-scheme` | string | `"light"` |
| `appearance.accent` | string | `"blue"` |
| `display.text-scale` | double | `1.25` |
| `shell.form-factor` | string | `"tablet"` |

:::code-tabs

```rust title="Rust"
let settings = abstract_kit::Settings::default();
let scheme = settings.string("appearance.color-scheme");
settings.connect_changed(Some("appearance.color-scheme"), |s, key| {
    println!("changed: {}", s.string(key));
});
```

```bash title="Shell"
busctl --user call org.abstractos.Settings1 \
  /org/abstractos/Settings1 org.abstractos.Settings1 \
  Get s "appearance.color-scheme"
```

:::
