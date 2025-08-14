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
import { INNOVATIONS } from "../about-us/Query/AboutUsQuery";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";
import StrapiResources from "../hire-strapi-developer/Components/StrapiResources";
import {
  AVAILABILITY,
  ENGAGE_MODEL,
  HIRE_TAB_QUERY,
} from "../hire-strapi-developer/Query/HireQuery";
import EngagementModel from "../hire-strapi-developer/Components/EngagementModel";
import Availability from "../hire-strapi-developer/Components/Availability";
import OwlTabSlider from "../hire-strapi-developer/Components/OwlTabSlider";

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
      getServerSideProps(SEO("hireXmcDeveloper")),
      getServerSideProps(CTA_QUERY("hireXmcDeveloper")),
      getServerSideProps(BANNER_QUERY("hireXmcDeveloper")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("hireXmcDeveloper")),
      getServerSideProps(SERVICES_DETILS_QUERY("hireXmcDeveloper")),
      getServerSideProps(FORM_TITLE_QUERY("hireXmcDeveloper")),
      getServerSideProps(STRAPI_RELATED_SERVICES("hireXmcDeveloper")),
      getServerSideProps(LATEST_NEWS("hireXmcDeveloper")),
      getServerSideProps(FAQ("hireXmcDeveloper")),
      getServerSideProps(VERTICAL_SLIDER("hireXmcDeveloper")),
      getServerSideProps(INNOVATIONS("hireXmcDeveloper")),
      getServerSideProps(ENGAGE_MODEL("hireXmcDeveloper")),
      getServerSideProps(AVAILABILITY("hireXmcDeveloper")),
      getServerSideProps(HIRE_TAB_QUERY("hireXmcDeveloper")),
    ]);

    // Destructure response data
    const seodata = seoRes.data.hireXmcDeveloper;
    const owltabslider = owltabsliderRes.data.hireXmcDeveloper;
    const availability = availabilityRes.data.hireXmcDeveloper;
    const engementmodel = engementmodelRes.data.hireXmcDeveloper;
    const strapiresource = strapiresourceRes.data.hireXmcDeveloper;
    const slidervertical = sliderverticalRes.data.hireXmcDeveloper;
    const faq = faqRes.data.hireXmcDeveloper;
    const latestnews = latestnewsRes.data.hireXmcDeveloper;
    const strapirelatedservice = strapirelatedservicesRes.data.hireXmcDeveloper;
    const servicedetails = servicedetailsRes.data.hireXmcDeveloper;
    const cta = ctaRes.data.hireXmcDeveloper;
    const banner = bannerRes.data.hireXmcDeveloper;
    const contactform = contactformRes.data.hireXmcDeveloper;
    const emailform = emailRes.data.hireXmcDeveloper;

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
