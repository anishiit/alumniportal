export async function getServerSideProps({ res }) {
    const baseUrl = "https://linklum.in";
  
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/about</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/contact</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${baseUrl}/login</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/collegeRegistration</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      </urlset>
    `;
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  
    return { props: {} };
  }
  
  export default function Sitemap() {
    return null;
  }
  