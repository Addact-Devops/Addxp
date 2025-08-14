import { BANNER_QUERY, CASE_LIST_QUERY } from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

import strapi from "../../Configurations/Config.json";
import CaseStudyList from "./Components/CaseStudyList";


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
      const [seoRes, bannerRes,caselistRes ] = await Promise.all([
         getServerSideProps(SEO("caseStudy")),
         getServerSideProps(BANNER_QUERY("caseStudy")),
         getServerSideProps(CASE_LIST_QUERY),
      ]);

     const seodata = seoRes.data.caseStudy;
     const banner = bannerRes.data.caseStudy;
     const caselist = caselistRes.data.casestudieListings;

      return (
         <>
    <SEOData data={seodata} name={""} />  
    <Banner data={banner} />  
    <CaseStudyList data={caselist}/>
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}


