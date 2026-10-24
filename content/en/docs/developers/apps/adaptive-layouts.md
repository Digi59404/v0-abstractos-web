---
title: "Adaptive layouts"
description: "Use breakpoints and adaptive containers so one UI works on every screen."
updated: "2026-09-30"
order: 2
---

AbstractKit containers reflow at the same breakpoints the shell uses. Prefer them over checking the form factor directly.

| Breakpoint | Width | Typical layout |
| --- | --- | --- |
| `compact` | under 600 px | Single column, bottom navigation |
| `medium` | 600–1200 px | Sidebar collapses to an overlay |
| `expanded` | over 1200 px | Persistent sidebar and detail pane |

```mermaid caption="A SplitView collapsing on compact screens"
flowchart LR
  subgraph Expanded
    S1[Sidebar] --- D1[Content]
  end
  subgraph Compact
    S2[Sidebar] -->|tap item| D2[Content]
  end
  Expanded -->|width under 600px| Compact
```

```xml filename="window.ui"
<object class="AkSplitView">
  <property name="collapse-below">compact</property>
  <child type="sidebar">
    <object class="AkNavList" id="nav"/>
  </child>
  <child type="content">
    <object class="AkStack" id="pages"/>
  </child>
</object>
```
