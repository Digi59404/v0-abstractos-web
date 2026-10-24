export const featureKeys = ['screen', 'touchscreen', 'camera', 'gps', 'wifi', 'lte', 'gpu'] as const
export type FeatureKey = (typeof featureKeys)[number]

export type FormFactor = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'singleBoard'

export type SupportedDevice = {
  name: string
  vendor: string
  codename: string
  formFactor: FormFactor
  status: 'stable' | 'beta'
  features: Record<FeatureKey, boolean>
}

const all = (overrides: Partial<Record<FeatureKey, boolean>> = {}): Record<FeatureKey, boolean> => ({
  screen: true,
  touchscreen: true,
  camera: true,
  gps: true,
  wifi: true,
  lte: true,
  gpu: true,
  ...overrides,
})

export const supportedDevices: SupportedDevice[] = [
  { name: 'PinePhone Pro', vendor: 'Pine64', codename: 'pinephone-pro', formFactor: 'phone', status: 'stable', features: all({ camera: false }) },
  { name: 'Librem 5', vendor: 'Purism', codename: 'librem5', formFactor: 'phone', status: 'stable', features: all() },
  { name: 'Fairphone 5', vendor: 'Fairphone', codename: 'fp5', formFactor: 'phone', status: 'beta', features: all({ camera: false, gps: false }) },
  { name: 'OnePlus 6', vendor: 'OnePlus', codename: 'enchilada', formFactor: 'phone', status: 'beta', features: all({ camera: false }) },
  { name: 'PineTab 2', vendor: 'Pine64', codename: 'pinetab2', formFactor: 'tablet', status: 'stable', features: all({ gps: false, lte: false }) },
  { name: 'Surface Pro 7', vendor: 'Microsoft', codename: 'surface-pro7', formFactor: 'tablet', status: 'beta', features: all({ camera: false, gps: false, lte: false }) },
  { name: 'Framework Laptop 13', vendor: 'Framework', codename: 'framework-13', formFactor: 'laptop', status: 'stable', features: all({ touchscreen: false, gps: false, lte: false }) },
  { name: 'ThinkPad X13s', vendor: 'Lenovo', codename: 'x13s', formFactor: 'laptop', status: 'beta', features: all({ touchscreen: false, camera: false, gps: false }) },
  { name: 'Generic x86_64 PC', vendor: 'Any', codename: 'amd64-generic', formFactor: 'desktop', status: 'stable', features: all({ touchscreen: false, camera: false, gps: false, lte: false }) },
  { name: 'Raspberry Pi 5', vendor: 'Raspberry Pi', codename: 'rpi5', formFactor: 'singleBoard', status: 'beta', features: all({ touchscreen: false, camera: false, gps: false, lte: false }) },
]

export type FutureDevice = {
  name: string
  vendor: string
  formFactor: FormFactor
  stage: 'bringUp' | 'kernelBoots' | 'planned' | 'lookingForPorter'
  /** Release version, or null when not yet scheduled. */
  target: string | null
}

export const futureDevices: FutureDevice[] = [
  { name: 'Pixel 7a', vendor: 'Google', formFactor: 'phone', stage: 'bringUp', target: '0.2 Interferometer' },
  { name: 'Xiaomi Pad 6', vendor: 'Xiaomi', formFactor: 'tablet', stage: 'kernelBoots', target: '0.2 Interferometer' },
  { name: 'Steam Deck', vendor: 'Valve', formFactor: 'tablet', stage: 'bringUp', target: '0.2 Interferometer' },
  { name: 'Lenovo Tab P11', vendor: 'Lenovo', formFactor: 'tablet', stage: 'planned', target: '0.3' },
  { name: 'Framework Laptop 16', vendor: 'Framework', formFactor: 'laptop', stage: 'planned', target: '0.3' },
  { name: 'Galaxy Tab S6 Lite', vendor: 'Samsung', formFactor: 'tablet', stage: 'lookingForPorter', target: null },
  { name: 'Pixel 8', vendor: 'Google', formFactor: 'phone', stage: 'lookingForPorter', target: null },
]
