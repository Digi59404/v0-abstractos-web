const movedDocs = [
  ['users/getting-started/installation', 'users/installation/installation'],
  ['users/disk-utility/usb-installer', 'users/installation/usb-installer'],
  ['users/settings/overview', 'users/getting-started/settings'],
  ['users/settings/display', 'users/getting-started/display'],
  ['users/settings/privacy', 'users/getting-started/privacy'],
  ['users/files/overview', 'users/applications/files'],
  ['users/turbine/overview', 'users/applications/turbine'],
  ['users/exposition/installing-apps', 'users/applications/exposition'],
  ['developers/apps/first-app', 'developers/getting-started/first-app'],
  ['developers/apps/publishing', 'developers/getting-started/publishing'],
  ['developers/apps/adaptive-layouts', 'developers/abstract-ui/adaptive-layouts'],
  ['developers/files/file-picker', 'developers/abstract-ui/file-picker'],
  ['developers/settings/settings-api', 'developers/abstract-lib/settings-api'],
  ['developers/getting-started/building-from-source', 'developers/platform-porting/building-from-source'],
  ['developers/hardware/porting', 'developers/platform-porting/porting'],
  ['users/disk-utility', 'users/installation'],
  ['users/settings', 'users/getting-started'],
  ['users/files', 'users/applications'],
  ['users/turbine', 'users/applications'],
  ['users/exposition', 'users/applications'],
  ['developers/apps', 'developers/getting-started'],
  ['developers/files', 'developers/abstract-ui'],
  ['developers/settings', 'developers/abstract-lib'],
  ['developers/hardware', 'developers/platform-porting'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return movedDocs.map(([from, to]) => ({ source: `/docs/${from}`, destination: `/docs/${to}`, permanent: true }))
  },
  outputFileTracingIncludes: {
    '/**': ['./content/**/*', './messages/**/*'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
