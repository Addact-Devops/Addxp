import { NextResponse } from "next/server";
const cheerio = require("cheerio");

const BLOG_API_URL = "https://cms.addxp.com/api/blog-listings/6?populate=blogs";

const getBlogImage = async (blogUrl: string): Promise<string | null> => {
  try {
    const response = await fetch(blogUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${blogUrl}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    const imageUrl = $(".blog-detail-right img").attr("src");

    return imageUrl ? imageUrl : null;
  } catch (error: any) {
    console.error(`Error fetching image for ${blogUrl}:`, error?.message);
    return null;
  }
};

export async function GET() {
  try {
    const response = await fetch(BLOG_API_URL);

    if (!response.ok) {
      console.error("Failed to fetch blog data:", response.status, response.statusText);
      throw new Error("Failed to fetch blog data");
    }

    const blogData = await response.json();
    if (!blogData?.data?.attributes?.blogs?.data?.length) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0">
          <channel>
            <title>Addxp Umbraco Blog RSS Feed</title>
            <description>No blog data available</description>
          </channel>
        </rss>`,
        { headers: { "Content-Type": "application/xml" } }
      );
    }

    let rssItems = "";
    for (const item of blogData.data.attributes.blogs.data) {
      const title = item.attributes?.RelationTitle || "No Title";
      const slug = item.attributes?.Slug || item.id;
      const pubDate = new Date(item.attributes?.publishedAt || new Date()).toUTCString();
      const blogUrl = `https://www.addxp.com/blogs-insights/${slug}`;

      const imageUrl = await getBlogImage(blogUrl);

      rssItems += `
        <item>
          <title><![CDATA[${title}]]></title>
          <link>${blogUrl}</link>
          <pubDate>${pubDate}</pubDate>
          ${imageUrl ? `<enclosure url="${imageUrl}" type="image/png" />` : ""}
        </item>
      `;
    }

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>Addxp Umbraco Blog RSS Feed</title>
          <link>https://www.addxp.com/rss/umbraco</link>
          <description>Latest Umbraco blog updates</description>
          ${rssItems}
        </channel>
      </rss>`;

    return new NextResponse(rssFeed, { headers: { "Content-Type": "application/xml" } });
  } catch (error) {
    console.error("Error fetching Umbraco blogs:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>Addxp Umbraco Blog RSS Feed</title>
          <description>Error fetching data</description>
        </channel>
      </rss>`,
      { headers: { "Content-Type": "application/xml" } }
    );
  }
}
