import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FAQ,
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
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OurWorkflow from "../strapi-cms-development-service/Components/OurWorkflow";
import strapi from "../../Configurations/Config.json";
import GoStrapi from "./Components/GoStrapi";
import { CALENDER_QUERY, GO_STRAPI_QUERY } from "./Query/StrapiConsultationQuery";
import Calender from "./Components/Calender";

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
         expoertresourceRes,
         strapititleRes,
         servicedetailsRes,
         strapirelatedservicesRes,
         ourservicesRes,
         latestnewsRes,
         faqRes,
         ourworkflowRes,
         gostrapiRes,
         calenderRes,
      ] = await Promise.all([
         getServerSideProps(SEO("strapiConsultation")),
         getServerSideProps(CTA_QUERY("strapiConsultation")),
         getServerSideProps(BANNER_QUERY("strapiConsultation")),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("strapiConsultation")),
         getServerSideProps(STRAPI_EXPERT_RESOURCES("strapiConsultation")),
         getServerSideProps(STRAPI_SUBTITLE_QUERY("strapiConsultation")),
         getServerSideProps(SERVICES_DETILS_QUERY("strapiConsultation")),
         getServerSideProps(STRAPI_RELATED_SERVICES("strapiConsultation")),
         getServerSideProps(OUR_SERVICES_QUERY("strapiConsultation")),
         getServerSideProps(LATEST_NEWS("strapiConsultation")),
         getServerSideProps(FAQ("strapiConsultation")),
         getServerSideProps(WORKFLOW("strapiConsultation")),
         getServerSideProps(GO_STRAPI_QUERY),
         getServerSideProps(CALENDER_QUERY),
      ]);

      // Destructure response data
      const calender = calenderRes.data.strapiConsultation;
      const gostrapi = gostrapiRes.data.strapiConsultation;
      const seodata = seoRes.data.strapiConsultation;
      const ourworkflow = ourworkflowRes.data.strapiConsultation;
      const faq = faqRes.data.strapiConsultation;
      const latestnews = latestnewsRes.data.strapiConsultation;
      const ourservices = ourservicesRes.data.strapiConsultation;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiConsultation;
      const servicedetails = servicedetailsRes.data.strapiConsultation;
      const cta = ctaRes.data.strapiConsultation;
      const banner = bannerRes.data.strapiConsultation;
      const contactform = contactformRes.data.strapiConsultation;
      const expoertresource = expoertresourceRes.data.strapiConsultation;
      const strapititle = strapititleRes.data.strapiConsultation;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <GoStrapi data={gostrapi} />
            <OurServices data={ourservices} />
            <ExpertResource data={expoertresource} />
            <CTA data={cta} />
            <OurWorkflow data={ourworkflow} />
            <ServicesDetails data={servicedetails} />
            <Calender data={calender} />
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
