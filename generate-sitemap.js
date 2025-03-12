import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://api.riyaartsandgifts.in";
const API_URL = `${BASE_URL}/product/`;

async function generateSitemap() {
  try {
    console.log("📡 Fetching product data...");
    const response = await axios.get(API_URL);
    const products = response.data.data;
    
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticPages = [
      "/",
      "/cart",
      "/login",
      "/wishlist",
      "/profile",
      "/terms-conditions",
      "/privacy-policy",
      "/review-rating",
    ];

    staticPages.forEach((page) => {
      sitemapContent += `  <url>\n    <loc>${BASE_URL}${page}</loc>\n  </url>\n`;
    });

    products?.forEach((product) => {
      sitemapContent += `  <url>\n    <loc>${BASE_URL}/product-details/${product.id}</loc>\n  </url>\n`;
    });

    sitemapContent += `</urlset>`;

    fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapContent);
    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("❌ Error fetching product data:", error.message);
  }
}

generateSitemap();
