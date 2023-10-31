/** @type {import('next').NextConfig} */


const nextConfig = {
    productionBrowserSourceMaps: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    }
}
module.exports = nextConfig
