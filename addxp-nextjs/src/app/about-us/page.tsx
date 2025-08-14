import BrandValues from "./Components/BrandValues";
import { BRAND_VALUES, DIRECTOR_MESSAGE, EMPOWERMENTS, INNOVATIONS, MISIONVISION } from "./Query/AboutUsQuery";
import strapi from "../../Configurations/Config.json";
import DirectorMessage from "./Components/DirectorMessage";
import Empowerments from "./Components/Empowerments";
import Misionvision from "./Components/Misionvision";
import Innovations from "./Components/Innovations";
import Banner from "@/Components/Banner/Banner";
import { BANNER_NAV_QUERY, BANNER_QUERY, CTA_QUERY } from "@/Configurations/CommonQuery";
import CTA from "@/Components/CTA/CTA";
import BannerNav from "@/Components/Banner/BannerNav";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

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
      const [
         seoRes,
         bannerRes,
         brandvalueRes,
         directorMessageRes,
         empowermentsRes,
         missionVisionRes,
         ctaRes,
         innovationsRes,
         bannernavRes,
      ] = await Promise.all([
         getServerSideProps(SEO("aboutUs")),
         getServerSideProps(BANNER_QUERY("aboutUs")),
         getServerSideProps(BRAND_VALUES),
         getServerSideProps(DIRECTOR_MESSAGE),
         getServerSideProps(EMPOWERMENTS),
         getServerSideProps(MISIONVISION),
         getServerSideProps(CTA_QUERY("aboutUs")),
         getServerSideProps(INNOVATIONS("aboutUs")),
         getServerSideProps(BANNER_NAV_QUERY("aboutUs")),
      ]);

      const seodata = seoRes.data.aboutUs;
      const banner = bannerRes.data.aboutUs;
      const brandvalue = brandvalueRes.data.aboutUs.data.attributes;
      const directormessage = directorMessageRes.data.aboutUs.data.attributes;
      const empowerments = empowermentsRes.data.aboutUs.data.attributes;
      const missionvision = missionVisionRes.data.missionVisions;
      const cta = ctaRes.data.aboutUs;
      const innovations = innovationsRes.data.aboutUs.data.attributes;
      const bannernav = bannernavRes.data.aboutUs;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <BannerNav data={bannernav} />
            <DirectorMessage data={directormessage} />
            <Empowerments data={empowerments} />
            <Misionvision data={missionvision} />
            <CTA data={cta} />
            <BrandValues data={brandvalue} />
            <Innovations data={innovations} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
