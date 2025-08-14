import ServiceTitle from "../../Components/Services/ServiceTitle";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FAQ,
   LATEST_NEWS,
   OUR_SERVICES_QUERY,
   SERVICES_DETILS_QUERY,
   SERVICE_EXP_QUERY,
   TITIE_QUERY,
} from "@/Configurations/CommonQuery";
import OurServices from "@/Components/Services/OurServices";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
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
   return repo.data;
}

export default async function Page() {
   try {
      const queries = [
         SEO("virtoCommerceService"),
         CTA_QUERY("virtoCommerceService"),
         BANNER_QUERY("virtoCommerceService"),
         CONTACT_FORM_TITLE_QUERY("virtoCommerceService"),
         TITIE_QUERY("virtoCommerceService"),
         SERVICES_DETILS_QUERY("virtoCommerceService"),
         OUR_SERVICES_QUERY("virtoCommerceService"),
         SERVICE_EXP_QUERY("virtoCommerceService"),
         LATEST_NEWS("virtoCommerceService"),
         FAQ("virtoCommerceService"),
      ];

      const results = await Promise.all(queries.map((query) => getServerSideProps(query)));

      const [
         seoRes,
         ctaRes,
         bannerRes,
         contactformRes,
         servicetitleRes,
         servicedetailsRes,
         ourservicesRes,
         serviceexperienceRes,
         latestnewsRes,
         faqRes,
      ] = results;

      const seodata = seoRes.virtoCommerceService;
      const faq = faqRes.virtoCommerceService;
      const latestnews = latestnewsRes.virtoCommerceService;
      const ourservices = ourservicesRes.virtoCommerceService;
      const servicedetails = servicedetailsRes.virtoCommerceService;
      const cta = ctaRes.virtoCommerceService;
      const banner = bannerRes.virtoCommerceService;
      const servicetitle = servicetitleRes.virtoCommerceService;
      const contactform = contactformRes.virtoCommerceService;
      const serviceexperience = serviceexperienceRes.virtoCommerceService;

      return (
         <>
            <div className='header-spacer'></div>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <ServiceTitle data={servicetitle} />
            <OurServices data={ourservices} />
            <CTA data={cta} />
            <ServiceExperience data={serviceexperience} />
            <ServicesDetails data={servicedetails} />
            <FAQS data={faq} />
            <LatestNews data={latestnews} />
            <ContactForm data={contactform} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
