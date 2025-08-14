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
} from "@/Configurations/CommonQuery";

import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
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
      ] = await Promise.all([
         getServerSideProps(SEO("strapiUiUxDesign")),
         getServerSideProps(CTA_QUERY("strapiUiUxDesign")),
         getServerSideProps(BANNER_QUERY("strapiUiUxDesign")),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("strapiUiUxDesign")),
         getServerSideProps(FORM_TITLE_QUERY("strapiUiUxDesign")),
         getServerSideProps(STRAPI_EXPERT_RESOURCES("strapiUiUxDesign")),
         getServerSideProps(STRAPI_SUBTITLE_QUERY("strapiUiUxDesign")),
         getServerSideProps(SERVICES_DETILS_QUERY("strapiUiUxDesign")),
         getServerSideProps(STRAPI_RELATED_SERVICES("strapiUiUxDesign")),
         getServerSideProps(SERVICE_CARD("strapiUiUxDesign")),
         getServerSideProps(LATEST_NEWS("strapiUiUxDesign")),
      ]);

      const seodata = seoRes.data.strapiUiUxDesign;
      const latestnews = latestnewsRes.data.strapiUiUxDesign;
      const strapiservicecard = strapiservicecardRes.data.strapiUiUxDesign;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiUiUxDesign;
      const servicedetails = servicedetailsRes.data.strapiUiUxDesign;
      const cta = ctaRes.data.strapiUiUxDesign;
      const banner = bannerRes.data.strapiUiUxDesign;
      const contactform = contactformRes.data.strapiUiUxDesign;
      const emailform = emailRes.data.strapiUiUxDesign;
      const expoertresource = expoertresourceRes.data.strapiUiUxDesign;
      const strapititle = strapititleRes.data.strapiUiUxDesign;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <StrapiServiceCard data={strapiservicecard} />
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
