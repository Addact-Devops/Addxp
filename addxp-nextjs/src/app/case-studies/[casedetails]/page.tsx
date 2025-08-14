import RichText from "@/Components/Common";
import { CASE_DETAILS } from "@/Configurations/CommonQuery";
import Link from "next/link";
import moment from "moment";
import { getServerProps } from "../globalserverprops";
import React, { useEffect } from "react";
import { SEO, SEO_CASE_DETAILS } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";
import NotFound from "@/app/not-found";
import dynamic from "next/dynamic";
import DownloadForm from "./Components/CasestudyForm";
import strapi from "../../../Configurations/Config.json";
import CaseDetail from "./Components/CaseDetails";
import CasestudyForm from "./Components/CasestudyForm";
import DetailsData from "./Components/detailsData";

const DynamicBackToTopButton = dynamic(() => import("../../../Components/BackToTop/BackToTop"), {
   ssr: false,
});

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
export default async function SlugPage(data: any) {
   const datavalue = await getServerProps(CASE_DETAILS(data.params.casedetails));
   const detailsdata = datavalue.props.data;
 
   const seodatavalue = await getServerProps(SEO_CASE_DETAILS(data.params.casedetails));
   const seocasedetailsdata = seodatavalue.props.data;

   return (
      <>
         {detailsdata.data[0] == undefined ? (
            <NotFound />
         ) : (
            <>
               <SEOData data={seocasedetailsdata} name={data.params.casedetails} />
               {/* <DynamicProgressBar /> */}
               <div className='header-spacer'></div>
               <DetailsData props={detailsdata.data}/>
               <DynamicBackToTopButton />
            </>
         )}
      </>
   );
}
