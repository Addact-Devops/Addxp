import TabMenu from "./Components/TabMenu";
import Banner from "@/Components/Banner/Banner";
import { BANNER_QUERY, BLOG_LISTING } from "@/Configurations/CommonQuery";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";
import strapi from "../../Configurations/Config.json";

async function getServerSideProps(q: any) {
  const query = q;
  const response = await fetch(strapi.strapigraphql, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const repo = await response.json();
  return repo;
}

export default async function Page() {
  try {
    const [seoRes, bannerRes, blogtabRes] = await Promise.all([
      getServerSideProps(SEO("blogsInsight")),
      getServerSideProps(BANNER_QUERY("blogsInsight")),
      getServerSideProps(BLOG_LISTING),
    ]);

    const seodata = seoRes.data.blogsInsight;
    const banner = bannerRes.data.blogsInsight;
    const blogtab = blogtabRes.data.blogListings;

    return (
      <>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <TabMenu data={blogtab} />
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
