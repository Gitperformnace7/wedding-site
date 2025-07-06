/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Раскомментировать для статического экспорта:
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }
}

module.exports = nextConfig 