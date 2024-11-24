import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.linklum.in/"; // Update to production URL on deployment

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.linklum.in/</loc>
    <lastmod>2024-11-24T20:56:44.775Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.linklum.in/about</loc>
    <lastmod>2024-11-24T20:56:44.775Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.linklum.in/contact</loc>
    <lastmod>2024-11-24T20:56:44.775Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.linklum.in/login</loc>
    <lastmod>2024-11-24T20:56:44.775Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.linklum.in/collegeRegistration</loc>
    <lastmod>2024-11-24T20:56:44.775Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

  console.log("Sitemap route accessed"); // Debugging log

  return new NextResponse(sitemap.trim(), { // .trim() removes leading/trailing whitespace
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
