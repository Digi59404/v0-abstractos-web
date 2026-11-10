import {
  AppWindowIcon,
  BookOpenIcon,
  DownloadIcon,
  CodeIcon,
  CpuIcon,
  FolderIcon,
  GlobeIcon,
  HardDriveIcon,
  LayersIcon,
  RocketIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  StoreIcon,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  rocket: RocketIcon,
  download: DownloadIcon,
  'app-window': AppWindowIcon,
  settings: SettingsIcon,
  folder: FolderIcon,
  globe: GlobeIcon,
  store: StoreIcon,
  'hard-drive': HardDriveIcon,
  layers: LayersIcon,
  code: CodeIcon,
  sliders: SlidersHorizontalIcon,
  cpu: CpuIcon,
}

export function DocIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? BookOpenIcon
  return <Icon className={className} aria-hidden="true" />
}
