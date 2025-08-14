import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FAQ,
   FORM_TITLE_QUERY,
   LATEST_NEWS,
   OUR_SERVICES_QUERY,
   SERVICES_DETILS_QUERY,
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
import OurServices from "@/Components/Services/OurServices";
import SupportPlans from "./Components/SupportPlans";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OurWorkflow from "../strapi-cms-development-service/Components/OurWorkflow";

import strapi from "../../Configurations/Config.json";
import { SUPPORTS_PLANS } from "./Query/StrapiSupportQuery";

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
         ourservicesRes,
         latestnewsRes,
         faqRes,
         ourworkflowRes,
         supportsplanRes,
      ] = await Promise.all([
         getServerSideProps(SEO("strapiSupportAndMaintenance")),
         getServerSideProps(CTA_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(BANNER_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(FORM_TITLE_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(STRAPI_EXPERT_RESOURCES("strapiSupportAndMaintenance")),
         getServerSideProps(STRAPI_SUBTITLE_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(SERVICES_DETILS_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(STRAPI_RELATED_SERVICES("strapiSupportAndMaintenance")),
         getServerSideProps(OUR_SERVICES_QUERY("strapiSupportAndMaintenance")),
         getServerSideProps(LATEST_NEWS("strapiSupportAndMaintenance")),
         getServerSideProps(FAQ("strapiSupportAndMaintenance")),
         getServerSideProps(WORKFLOW("strapiSupportAndMaintenance")),
         getServerSideProps(SUPPORTS_PLANS),
      ]);

      const seodata = seoRes.data.strapiSupportAndMaintenance;
      const supportplan = supportsplanRes.data.strapiSupportAndMaintenance;
      const ourworkflow = ourworkflowRes.data.strapiSupportAndMaintenance;
      const faq = faqRes.data.strapiSupportAndMaintenance;
      const latestnews = latestnewsRes.data.strapiSupportAndMaintenance;
      const ourservices = ourservicesRes.data.strapiSupportAndMaintenance;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiSupportAndMaintenance;
      const servicedetails = servicedetailsRes.data.strapiSupportAndMaintenance;
      const cta = ctaRes.data.strapiSupportAndMaintenance;
      const banner = bannerRes.data.strapiSupportAndMaintenance;
      const contactform = contactformRes.data.strapiSupportAndMaintenance;
      const emailform = emailRes.data.strapiSupportAndMaintenance;
      const expoertresource = expoertresourceRes.data.strapiSupportAndMaintenance;
      const strapititle = strapititleRes.data.strapiSupportAndMaintenance;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <OurServices data={ourservices} />
            <ExpertResource data={expoertresource} />
            <CTA data={cta} />
            <OurWorkflow data={ourworkflow} />
            <ServicesDetails data={servicedetails} />
            <SupportPlans data={supportplan} />
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
