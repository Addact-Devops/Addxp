import Banner from "@/Components/Banner/Banner";
import { BANNER_QUERY } from "@/Configurations/CommonQuery";
import strapi from "../../Configurations/Config.json";
import Sitemap from "./Components/Sitemap";
import { SITEMAP } from "./Query/SitemapQuery";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

async function getServerSideProps(q: any) {
   const query = q;
   const response = await fetch(strapi.strapigraphql, {
      next: { revalidate: 3600 },
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
   });
   const repo = await response.json();
   return repo.data;
}

export default async function Page() {
   try {
      const [seoRes, bannerRes, sitemapRes] = await Promise.all([
         getServerSideProps(SEO("sitemap")),
         getServerSideProps(BANNER_QUERY("sitemap")),
         getServerSideProps(SITEMAP),
      ]);

      const seodata = seoRes.sitemap;
      const banner = bannerRes.sitemap;
      const sitemap = sitemapRes.sitemap;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <Sitemap data={sitemap} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
