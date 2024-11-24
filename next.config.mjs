// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


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
  };
  
  export default nextConfig;
  