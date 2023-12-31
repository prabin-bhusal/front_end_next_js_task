const SitemapGenerator = require("sitemap-generator");
const fs = require("fs");

const generateProductUrls = async () => {
  try {
    const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );

    return products.map((product) => ({
      url: `https://front-end-next-js-task.vercel.app/${product.id}`,
      lastmod: "2023-12-31",
      changefreq: "daily",
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};

const generateSitemap = async () => {
  try {
    const productUrls = await generateProductUrls();

    let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXML += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add URLs to sitemap
    sitemapXML += `<url>
      <loc>https://front-end-next-js-task.vercel.app/</loc>
      <lastmod>2023-12-31</lastmod>
      <changefreq>daily</changefreq>
    </url>\n`;

    sitemapXML += `<url>
      <loc>https://front-end-next-js-task.vercel.app/products</loc>
      <lastmod>2023-12-31</lastmod>
      <changefreq>daily</changefreq>
    </url>\n`;

    // Add product URLs
    productUrls.forEach((product) => {
      sitemapXML += `<url>
        <loc>${product.url}</loc>
        <lastmod>${product.lastmod}</lastmod>
        <changefreq>${product.changefreq}</changefreq>
      </url>\n`;
    });

    sitemapXML += `</urlset>`;

    fs.writeFileSync("./public/sitemap.xml", sitemapXML);
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

generateSitemap();
