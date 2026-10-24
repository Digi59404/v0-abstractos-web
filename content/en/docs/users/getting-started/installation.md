---
title: "Installing AbstractOS"
description: "Download an image, write it to a USB drive and install AbstractOS on a PC, tablet or phone."
updated: "2026-10-14"
order: 1
---

AbstractOS ships as a single image per architecture. The installer detects the device it is running on and configures the shell for that form factor automatically.

:::warning Back up first
Installing with **Erase disk** removes everything on the target drive. Back up your files before you begin.
:::

## Before you begin

:::specs Minimum requirements
- CPU: 64-bit x86_64 or ARMv8
- Memory: 4 GB RAM
- Storage: 32 GB
- Graphics: OpenGL ES 3.0 / Vulkan 1.1
:::

## Install on a desktop or laptop

:::steps

### Download the image

Get the latest `.iso` from the [download page](/download).

### Create a USB installer

Use [Disk Utility](/docs/users/disk-utility/usb-installer) or any image writer to flash the image to a USB drive of 8 GB or more.

### Boot from USB

Restart and choose the USB drive from your firmware boot menu, usually **F12**, **F10** or **Esc**.

### Choose an installation type

Pick **Erase disk**, **Install alongside** or **Manual partitioning**, then follow the prompts.

:::

![The AbstractOS installer showing the installation type options](/screenshots/installer.webp "The installer’s installation type step."){width=1920 height=1200}

## Install on a phone or tablet

Mobile devices are flashed over USB from another computer. Check [Devices supported](/devices) first, then install the flashing tool:

:::code-tabs

```bash title="Linux"
sudo apt install abstract-flash
abstract-flash --device auto abstractos-0.1-arm64.img
```

```bash title="macOS"
brew install abstractos/tap/abstract-flash
abstract-flash --device auto abstractos-0.1-arm64.img
```

```powershell title="Windows"
winget install AbstractOS.Flash
abstract-flash.exe --device auto abstractos-0.1-arm64.img
```

:::

:::tip
`--device auto` reads the connected device’s codename over fastboot and picks the right partition layout.
:::
