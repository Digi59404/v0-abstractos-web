export const featureKeys = ['screen', 'touchscreen', 'camera', 'gps', 'wifi', 'lte', 'gpu'] as const
export type FeatureKey = (typeof featureKeys)[number]

export const featureLabels: Record<FeatureKey, string> = {
  screen: 'Screen',
  touchscreen: 'Touchscreen',
  camera: 'Camera',
  gps: 'GPS',
  wifi: 'Wi‑Fi',
  lte: 'LTE',
  gpu: 'GPU',
}

export type FormFactor = 'Phone' | 'Tablet' | 'Laptop' | 'Desktop' | 'Single-board'

export type SupportedDevice = {
  name: string
  vendor: string
  codename: string
  formFactor: FormFactor
  status: 'Stable' | 'Beta'
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
  { name: 'PinePhone Pro', vendor: 'Pine64', codename: 'pinephone-pro', formFactor: 'Phone', status: 'Stable', features: all({ camera: false }) },
  { name: 'Librem 5', vendor: 'Purism', codename: 'librem5', formFactor: 'Phone', status: 'Stable', features: all() },
  { name: 'Fairphone 5', vendor: 'Fairphone', codename: 'fp5', formFactor: 'Phone', status: 'Beta', features: all({ camera: false, gps: false }) },
  { name: 'OnePlus 6', vendor: 'OnePlus', codename: 'enchilada', formFactor: 'Phone', status: 'Beta', features: all({ camera: false }) },
  { name: 'PineTab 2', vendor: 'Pine64', codename: 'pinetab2', formFactor: 'Tablet', status: 'Stable', features: all({ gps: false, lte: false }) },
  { name: 'Surface Pro 7', vendor: 'Microsoft', codename: 'surface-pro7', formFactor: 'Tablet', status: 'Beta', features: all({ camera: false, gps: false, lte: false }) },
  { name: 'Framework Laptop 13', vendor: 'Framework', codename: 'framework-13', formFactor: 'Laptop', status: 'Stable', features: all({ touchscreen: false, gps: false, lte: false }) },
  { name: 'ThinkPad X13s', vendor: 'Lenovo', codename: 'x13s', formFactor: 'Laptop', status: 'Beta', features: all({ touchscreen: false, camera: false, gps: false }) },
  { name: 'Generic x86_64 PC', vendor: 'Any', codename: 'amd64-generic', formFactor: 'Desktop', status: 'Stable', features: all({ touchscreen: false, camera: false, gps: false, lte: false }) },
  { name: 'Raspberry Pi 5', vendor: 'Raspberry Pi', codename: 'rpi5', formFactor: 'Single-board', status: 'Beta', features: all({ touchscreen: false, camera: false, gps: false, lte: false }) },
]

export type FutureDevice = {
  name: string
  vendor: string
  formFactor: FormFactor
  stage: 'Bring-up' | 'Kernel boots' | 'Planned' | 'Looking for porter'
  target: string
}

export const futureDevices: FutureDevice[] = [
  { name: 'Pixel 7a', vendor: 'Google', formFactor: 'Phone', stage: 'Bring-up', target: '0.2 Interferometer' },
  { name: 'Xiaomi Pad 6', vendor: 'Xiaomi', formFactor: 'Tablet', stage: 'Kernel boots', target: '0.2 Interferometer' },
  { name: 'Steam Deck', vendor: 'Valve', formFactor: 'Tablet', stage: 'Bring-up', target: '0.2 Interferometer' },
  { name: 'Lenovo Tab P11', vendor: 'Lenovo', formFactor: 'Tablet', stage: 'Planned', target: '0.3' },
  { name: 'Framework Laptop 16', vendor: 'Framework', formFactor: 'Laptop', stage: 'Planned', target: '0.3' },
  { name: 'Galaxy Tab S6 Lite', vendor: 'Samsung', formFactor: 'Tablet', stage: 'Looking for porter', target: 'TBD' },
  { name: 'Pixel 8', vendor: 'Google', formFactor: 'Phone', stage: 'Looking for porter', target: 'TBD' },
]
