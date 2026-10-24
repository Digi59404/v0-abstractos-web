---
title: "Creating a USB installer"
description: "Write an AbstractOS image to a USB drive with Disk Utility."
updated: "2026-07-03"
order: 1
---

Disk Utility can write any `.iso` or `.img` file to a USB drive and verify it afterwards.

![Disk Utility writing an image to a USB drive](/screenshots/usb-utility.webp){width=1920 height=1200}

:::steps

### Insert a USB drive

Use a drive of 8 GB or more. Everything on it will be erased.

### Choose the image

Select **Restore image** and pick the downloaded AbstractOS image.

### Write and verify

Select **Write**. Disk Utility checks the SHA-256 checksum when finished.

:::

:::note
On another OS, any image writer such as `dd` works too:
:::

```bash
sudo dd if=abstractos-0.1-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync
```
