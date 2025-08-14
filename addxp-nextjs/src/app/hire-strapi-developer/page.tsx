import CTA from "@/Components/CTA/CTA";
import {
   BANNER_QUERY,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FAQ,
   FORM_TITLE_QUERY,
   LATEST_NEWS,
   SERVICES_DETILS_QUERY,
   STRAPI_RELATED_SERVICES,
   VERTICAL_SLIDER,
} from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import EngagementModel from "./Components/EngagementModel";
import Availability from "./Components/Availability";
import StrapiResources from "./Components/StrapiResources";
import { INNOVATIONS } from "../about-us/Query/AboutUsQuery";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import OwlTabSlider from "./Components/OwlTabSlider";
import strapi from "../../Configurations/Config.json";
import { AVAILABILITY, ENGAGE_MODEL, HIRE_TAB_QUERY } from "./Query/HireQuery";

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
         servicedetailsRes,
         emailRes,
         strapirelatedservicesRes,
         latestnewsRes,
         faqRes,
         sliderverticalRes,
         strapiresourceRes,
         engementmodelRes,
         availabilityRes,
         owltabsliderRes,
      ] = await Promise.all([
         getServerSideProps(SEO("hireStrapiDeveloper")),
         getServerSideProps(CTA_QUERY("hireStrapiDeveloper")),
         getServerSideProps(BANNER_QUERY("hireStrapiDeveloper")),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("hireStrapiDeveloper")),
         getServerSideProps(SERVICES_DETILS_QUERY("hireStrapiDeveloper")),
         getServerSideProps(FORM_TITLE_QUERY("hireStrapiDeveloper")),
         getServerSideProps(STRAPI_RELATED_SERVICES("hireStrapiDeveloper")),
         getServerSideProps(LATEST_NEWS("hireStrapiDeveloper")),
         getServerSideProps(FAQ("hireStrapiDeveloper")),
         getServerSideProps(VERTICAL_SLIDER("hireStrapiDeveloper")),
         getServerSideProps(INNOVATIONS("hireStrapiDeveloper")),
         getServerSideProps(ENGAGE_MODEL("hireStrapiDeveloper")),
         getServerSideProps(AVAILABILITY("hireStrapiDeveloper")),
         getServerSideProps(HIRE_TAB_QUERY("hireStrapiDeveloper")),
      ]);

      // Destructure response data
      const seodata = seoRes.data.hireStrapiDeveloper;
      const owltabslider = owltabsliderRes.data.hireStrapiDeveloper;
      const availability = availabilityRes.data.hireStrapiDeveloper;
      const engementmodel = engementmodelRes.data.hireStrapiDeveloper;
      const strapiresource = strapiresourceRes.data.hireStrapiDeveloper;
      const slidervertical = sliderverticalRes.data.hireStrapiDeveloper;
      const faq = faqRes.data.hireStrapiDeveloper;
      const latestnews = latestnewsRes.data.hireStrapiDeveloper;
      const strapirelatedservice = strapirelatedservicesRes.data.hireStrapiDeveloper;
      const servicedetails = servicedetailsRes.data.hireStrapiDeveloper;
      const cta = ctaRes.data.hireStrapiDeveloper;
      const banner = bannerRes.data.hireStrapiDeveloper;
      const contactform = contactformRes.data.hireStrapiDeveloper;
      const emailform = emailRes.data.hireStrapiDeveloper;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <StrapiResources data={strapiresource} />
            <OwlTabSlider data={owltabslider} />
            <CTA data={cta} />
            <EngagementModel data={engementmodel} />
            <Availability data={availability} />
            <SliderVertical data={slidervertical} />
            <Email data={emailform} />
            <ServicesDetails data={servicedetails} />
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
