/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml', // Redirect to the dynamic sitemap page
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'www.google.com'], // Add allowed external domains here
  },
};

export default nextConfig;
