import { INFOGRAPHICS_DETAILS_QUERY } from "@/Configurations/CommonQuery";
import strapi from "@/Configurations/Config.json";
import NotFound from "@/app/not-found";
import { Metadata } from "next";

async function getInfographicData(slug: string) {
  const res = await fetch(strapi.strapigraphql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: INFOGRAPHICS_DETAILS_QUERY(slug),
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json?.data?.infographics?.data?.[0]?.attributes || null;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug;
  const item = await getInfographicData(slug);

  if (!item) return {};

  const title = item.SEO_Title || item.Title;
  const keywords = item.SEO_Keywords || "";
  const imageUrl = item.SEO_Image?.data?.attributes?.url || "";

  return {
    title,
    keywords,
    openGraph: {
      title,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function InfographicDetail({ params }: any) {
  const slug = params.slug;
  const item = await getInfographicData(slug);

  if (!item) {
    return <NotFound />;
  }

  return (
    <section className="infographic-detail">
      <div className="container">
        <h1 className="sub_title_5">{item.Title}</h1>

        {item.Description?.split("\n\n").map((paragraph: string, index: number) => (
          <p key={index}>{paragraph.trim()}</p>
        ))}

        {item.InfographicImage?.data?.map((img: any, index: number) => (
          <img
            key={index}
            src={img.attributes.url}
            alt={img.attributes.alternativeText || "Infographic"}
            loading="lazy"
            className="infographic-detail-img"
          />
        ))}
      </div>
    </section>
  );
}
