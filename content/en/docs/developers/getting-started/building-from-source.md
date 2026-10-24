---
title: "Building from source"
description: "Set up a development environment and build an AbstractOS image locally."
updated: "2026-10-05"
order: 2
---

Images are built in a container so the host distribution does not matter. You need Podman or Docker and about 40 GB of free disk space.

:::steps

### Clone the image repository

All build tooling lives in `abstract/image`.

### Pick a target

Targets are named `<arch>-<device>`, for example `amd64-generic` or `arm64-pinephone-pro`.

### Build

The first build downloads packages and takes a while; later builds are incremental.

:::

```bash
git clone https://gitlab.com/abstract/image.git
cd image
./abstract-image build --target amd64-generic
# output: out/abstractos-amd64-generic.iso
```

## Testing in a VM

```bash
./abstract-image run --target amd64-generic --form-factor tablet
```

:::tip
`--form-factor` sets the VM resolution and emulates touch input so you can test phone and tablet layouts on a PC.
:::
