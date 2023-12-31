const SitemapGenerator = require("sitemap-generator");
const fs = require("fs");

const generateProductUrls = async () => {
  try {
    const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );

    return products.map((product) => ({
      url: `https://yourwebsite.com/product/${product.id}`,
      lastmod: "2023-12-31",
      changefreq: "daily",
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};

const generateSitemap = async () => {
  const productUrls = await generateProductUrls();

  const sitemapData = {
    "@context": "http://www.sitemaps.org/schemas/sitemap/0.9",
    "@type": "UrlSet",
    url: [
      {
        loc: "https://yourwebsite.com/",
        lastmod: "2023-12-31",
        changefreq: "daily",
      },
      {
        loc: "https://yourwebsite.com/products",
        lastmod: "2023-12-31",
        changefreq: "daily",
      },
      ...productUrls,
    ],
  };

  fs.writeFileSync("./public/sitemap.xml", JSON.stringify(sitemapData));
};

generateSitemap();
