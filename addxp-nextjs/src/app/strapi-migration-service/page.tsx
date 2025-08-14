import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FAQ,
   FORM_TITLE_QUERY,
   LATEST_NEWS,
   SERVICES_DETILS_QUERY,
   SERVICE_CARD,
   STRAPI_EXPERT_RESOURCES,
   STRAPI_RELATED_SERVICES,
   STRAPI_SUBTITLE_QUERY,
   WORKFLOW,
} from "@/Configurations/CommonQuery";

import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
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
         SEO("strapiMig"),
         CTA_QUERY("strapiMig"),
         BANNER_QUERY("strapiMig"),
         CONTACT_FORM_TITLE_QUERY("strapiMig"),
         FORM_TITLE_QUERY("strapiMig"),
         STRAPI_EXPERT_RESOURCES("strapiMig"),
         STRAPI_SUBTITLE_QUERY("strapiConsultation"),
         SERVICES_DETILS_QUERY("strapiMig"),
         STRAPI_RELATED_SERVICES("strapiMig"),
         SERVICE_CARD("strapiMig"),
         LATEST_NEWS("strapiMig"),
         FAQ("strapiMig"),
      ];

      const responses = await Promise.all(queries.map(getServerSideProps));

      const [
         seoRes,
         ctaRes,
         bannerRes,
         contactformRes,
         emailRes,
         expoertresourceRes,
         strapititleRes,
         servicedetailsRes,
         strapirelatedservicesRes,
         strapiservicecardRes,
         latestnewsRes,
         faqRes,
      ] = responses;

      const seodata = seoRes.data.strapiMig;
      const faq = faqRes.data.strapiMig;
      const latestnews = latestnewsRes.data.strapiMig;
      const strapiservicecard = strapiservicecardRes.data.strapiMig;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiMig;
      const servicedetails = servicedetailsRes.data.strapiMig;
      const cta = ctaRes.data.strapiMig;
      const banner = bannerRes.data.strapiMig;
      const contactform = contactformRes.data.strapiMig;
      const emailform = emailRes.data.strapiMig;
      const expoertresource = expoertresourceRes.data.strapiMig;
      const strapititle = strapititleRes.data.strapiConsultation;

      return (
         <>
            {/* Render your components using the retrieved data */}
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <StrapiServiceCard data={strapiservicecard} />
            <ExpertResource data={expoertresource} />
            <CTA data={cta} />
            <ServicesDetails data={servicedetails} />
            <Email data={emailform} />
            <FAQS data={faq} />
            <StrapiRelatedServices data={strapirelatedservice} />
            <LatestNews data={latestnews} />
            <ContactForm data={contactform} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
