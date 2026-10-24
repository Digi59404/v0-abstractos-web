---
title: "Designing Exposition, a calmer way to switch apps"
excerpt: "From a whiteboard sketch to the shipped overview: the principles, false starts and details behind Exposition."
date: "2026-09-12"
author: "priya-raman"
topics: ["design"]
cover: "/screenshots/exposition.webp"
coverAlt: "Exposition overview with open windows arranged on a desktop"
---

Every operating system has an app switcher. Most of them are noisy. With Exposition, we wanted an overview that felt like stepping back from your desk rather than rummaging through a drawer.

## Principles

1. **Spatial memory first.** Windows keep their relative positions so you can find them by where they were.
2. **One gesture, every device.** Three-finger swipe, the Super key and a long press on the home bar all open Exposition.
3. **Quiet chrome.** Labels appear on hover or focus, not all at once.

![Exposition with windows arranged by their original position](/screenshots/exposition.webp "The final Exposition design keeps windows close to where you left them."){width=1920 height=1080}

## What we threw away

Our first prototype used a carousel. It tested well on phones and poorly everywhere else: on a desktop with twelve windows, nobody could find anything. Spatial layout won.

> If it only works on one screen size, it is not done yet.
>
> — Priya Raman, design review notes

## Try it

Exposition ships in Casimir. Learn every gesture in the [Exposition guide](/docs/users/exposition/overview).
