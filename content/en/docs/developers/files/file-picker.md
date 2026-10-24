---
title: "File picker and previews"
description: "Open and save files through the portal and add Quick Preview support for your file type."
updated: "2026-08-30"
order: 1
---

Sandboxed apps cannot read the file system directly. Use the file chooser portal; the user’s selection grants access to just that file.

```python
dialog = ak.FileDialog(title="Open drawing")
dialog.set_filters([ak.FileFilter(name="Scriblr", mime_types=["application/x-scriblr"])])
file = await dialog.open(window)
```

## Quick Preview

Register a thumbnailer in your manifest so Files can show previews of your documents:

```toml filename="app.toml"
[[thumbnailer]]
mime_types = ["application/x-scriblr"]
exec = "scriblr-thumbnail %i %o %s"
```
