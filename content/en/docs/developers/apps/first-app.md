---
title: "Your first app"
description: "Create, run and package an adaptive AbstractOS app with the abstract CLI."
updated: "2026-10-01"
order: 1
---

Apps are written with **AbstractKit**, a set of adaptive widgets on top of GTK 4. You can use Rust, Python, Vala or JavaScript.

## Create a project

```bash
abstract new hello --lang rust
cd hello
abstract run --form-factor phone
```

## The app window

:::code-tabs

```rust title="Rust"
use abstract_kit::prelude::*;

fn main() -> glib::ExitCode {
    let app = Application::new("org.example.Hello");
    app.connect_activate(|app| {
        let window = AdaptiveWindow::builder()
            .application(app)
            .title("Hello")
            .content(&Label::new(Some("Hello, AbstractOS")))
            .build();
        window.present();
    });
    app.run()
}
```

```python title="Python"
import abstract_kit as ak

def on_activate(app):
    window = ak.AdaptiveWindow(application=app, title="Hello")
    window.set_content(ak.Label(label="Hello, AbstractOS"))
    window.present()

app = ak.Application(application_id="org.example.Hello")
app.connect("activate", on_activate)
app.run()
```

:::

## App manifest

```toml filename="app.toml"
[app]
id = "org.example.Hello"
name = "Hello"
version = "0.1.0"
form_factors = ["phone", "tablet", "desktop"]

[permissions]
network = false
files = "portal"
```

:::note
Request only the permissions you need. Exposition shows them to users before install.
:::
