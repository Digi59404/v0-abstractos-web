---
title: "Privacy and security"
description: "Control which apps can use your camera, microphone, location and files."
updated: "2026-09-28"
order: 3
---

Apps in AbstractOS run sandboxed. They ask for access the first time they need a sensitive resource, and you can change your answer at any time.

```mermaid caption="How a permission request is handled"
sequenceDiagram
  participant App
  participant Portal as Permission portal
  participant You
  App->>Portal: Request camera
  Portal->>You: Allow Scriblr to use the camera?
  You-->>Portal: Allow
  Portal-->>App: Access granted
  Note over Portal: Choice is saved in Settings
```

## Reviewing permissions

Open **Settings → Privacy & Security** to see every app that has requested a permission. Toggle access per app, or use **Reset all** to be asked again.

:::note Indicators
A dot appears in the status area whenever the camera, microphone or location is in use.
:::
