import { usePathname } from "next/navigation";
import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   DEVELOPMENT_PROCESS,
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
import FAQS from "@/Components/FAQ/FAQS";
import DevelopmentProcess from "@/Components/Services/DevelopmentProcess";
import StrapiServiceCard from "@/Components/Services/StrapiServiceCard";
import StrapiVersions from "./Components/StrapiVersions";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

import strapi from "../../Configurations/Config.json";
import { STRAPI_VERSIONS } from "./Query/StrapiUpgradeQuery";

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
         SEO("strapiUpgrade"),
         CTA_QUERY("strapiUpgrade"),
         BANNER_QUERY("strapiUpgrade"),
         CONTACT_FORM_TITLE_QUERY("strapiUpgrade"),
         FORM_TITLE_QUERY("strapiUpgrade"),
         STRAPI_EXPERT_RESOURCES("strapiUpgrade"),
         STRAPI_SUBTITLE_QUERY("strapiUpgrade"),
         DEVELOPMENT_PROCESS("strapiUpgrade"),
         SERVICES_DETILS_QUERY("strapiUpgrade"),
         STRAPI_RELATED_SERVICES("strapiUpgrade"),
         SERVICE_CARD("strapiUpgrade"),
         LATEST_NEWS("strapiUpgrade"),
         FAQ("strapiUpgrade"),
         STRAPI_VERSIONS,
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
         faqRes,
         strapiversionRes,
      ] = results;

      const seodata = seoRes.data.strapiUpgrade;
      const strapiversion = strapiversionRes.data.strapiUpgrade;
      const faq = faqRes.data.strapiUpgrade;
      const latestnews = latestnewsRes.data.strapiUpgrade;
      const strapiservicecard = strapiservicecardRes.data.strapiUpgrade;
      const strapirelatedservice = strapirelatedservicesRes.data.strapiUpgrade;
      const servicedetails = servicedetailsRes.data.strapiUpgrade;
      const developmentprocess = developmentprocessRes.data.strapiUpgrade;
      const cta = ctaRes.data.strapiUpgrade;
      const banner = bannerRes.data.strapiUpgrade;
      const contactform = contactformRes.data.strapiUpgrade;
      const emailform = emailRes.data.strapiUpgrade;
      const expoertresource = expoertresourceRes.data.strapiUpgrade;
      const strapititle = strapititleRes.data.strapiUpgrade;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiTitles query={strapititle} />
            <StrapiServiceCard data={strapiservicecard} />
            <DevelopmentProcess data={developmentprocess} />
            <ExpertResource data={expoertresource} />
            <StrapiVersions data={strapiversion} />
            <CTA data={cta} />
            <ServicesDetails data={servicedetails} />
            <Email data={emailform} />
            <FAQS data={faq} />
            <StrapiRelatedServices data={strapirelatedservice} />
            <LatestNews data={latestnews} />
            <ContactForm data={contactform} />

            <script async src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'></script>
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
