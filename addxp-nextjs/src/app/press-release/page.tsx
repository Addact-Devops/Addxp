import { BANNER_QUERY } from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

import strapi from "../../Configurations/Config.json";

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
   return repo;
}
export default async function Page() {
   try {
      const [seoRes, bannerRes] = await Promise.all([
         getServerSideProps(SEO("pressRelease")),
         getServerSideProps(BANNER_QUERY("pressRelease")),
      ]);

      const seodata = seoRes.data.pressRelease;
      const banner = bannerRes.data.pressRelease;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
