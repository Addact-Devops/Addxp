import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   DEVELOPMENT_PROCESS,
   FORM_TITLE_QUERY,
   LATEST_NEWS,
   SERVICES_DETILS_QUERY,
   SERVICE_CARD,
   STRAPI_EXPERT_RESOURCES,
   STRAPI_RELATED_SERVICES,
   STRAPI_SUBTITLE_QUERY,
} from "@/Configurations/CommonQuery";

import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import DevelopmentProcess from "@/Components/Services/DevelopmentProcess";
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
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
      const queries = [
         SEO("strapiPluginDevelopment"),
         CTA_QUERY("strapiPluginDevelopment"),
         BANNER_QUERY("strapiPluginDevelopment"),
         CONTACT_FORM_TITLE_QUERY("strapiPluginDevelopment"),
         FORM_TITLE_QUERY("strapiPluginDevelopment"),
         STRAPI_EXPERT_RESOURCES("strapiPluginDevelopment"),
         STRAPI_SUBTITLE_QUERY("strapiPluginDevelopment"),
         DEVELOPMENT_PROCESS("strapiPluginDevelopment"),
         SERVICES_DETILS_QUERY("strapiPluginDevelopment"),
         STRAPI_RELATED_SERVICES("strapiPluginDevelopment"),
         SERVICE_CARD("strapiPluginDevelopment"),
         LATEST_NEWS("strapiPluginDevelopment"),
      ];

      const results = await Promise.all(queries.map(getServerSideProps));

      const [
         seoRes,
         ctaRes,
         bannerRes,
         contactformRes,
         emailRes,
         expoertresourceRes,
         strapititleRes,
         developmentprocessRes,
         servicedetailsRes,
         strapirelatedservicesRes,
         strapiservicecardRes,
         latestnewsRes,
      ] = results;

      const seodata = seoRes.data.strapiPluginDevelopment;
      const latestnews = latestnewsRes.data.strapiPluginDevelopment;
      const strapiservicecard = strapiservicecardRes.data.strapiPluginDevelopment;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiPluginDevelopment;
      const servicedetails = servicedetailsRes.data.strapiPluginDevelopment;
      const cta = ctaRes.data.strapiPluginDevelopment;
      const banner = bannerRes.data.strapiPluginDevelopment;
      const contactform = contactformRes.data.strapiPluginDevelopment;
      const emailform = emailRes.data.strapiPluginDevelopment;
      const expoertresource = expoertresourceRes.data.strapiPluginDevelopment;
      const strapititle = strapititleRes.data.strapiPluginDevelopment;
      const developmentprocess = developmentprocessRes.data.strapiPluginDevelopment;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <StrapiServiceCard data={strapiservicecard} />
            <DevelopmentProcess data={developmentprocess} />
            <ExpertResource data={expoertresource} />
            <CTA data={cta} />
            <ServicesDetails data={servicedetails} />
            <Email data={emailform} />
            <StrapiRelatedServices data={strapirelatedservice} />
            <LatestNews data={latestnews} />
            <ContactForm data={contactform} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
