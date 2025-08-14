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
      getServerSideProps(SEO("hireAspNetDeveloper")),
      getServerSideProps(CTA_QUERY("hireAspNetDeveloper")),
      getServerSideProps(BANNER_QUERY("hireAspNetDeveloper")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("hireAspNetDeveloper")),
      getServerSideProps(SERVICES_DETILS_QUERY("hireAspNetDeveloper")),
      getServerSideProps(FORM_TITLE_QUERY("hireAspNetDeveloper")),
      getServerSideProps(STRAPI_RELATED_SERVICES("hireAspNetDeveloper")),
      getServerSideProps(LATEST_NEWS("hireAspNetDeveloper")),
      getServerSideProps(FAQ("hireAspNetDeveloper")),
      getServerSideProps(VERTICAL_SLIDER("hireAspNetDeveloper")),
      getServerSideProps(INNOVATIONS("hireAspNetDeveloper")),
      getServerSideProps(ENGAGE_MODEL("hireAspNetDeveloper")),
      getServerSideProps(AVAILABILITY("hireAspNetDeveloper")),
      getServerSideProps(HIRE_TAB_QUERY("hireAspNetDeveloper")),
    ]);

    // Destructure response data
    const seodata = seoRes.data.hireAspNetDeveloper;
    const owltabslider = owltabsliderRes.data.hireAspNetDeveloper;
    const availability = availabilityRes.data.hireAspNetDeveloper;
    const engementmodel = engementmodelRes.data.hireAspNetDeveloper;
    const strapiresource = strapiresourceRes.data.hireAspNetDeveloper;
    const slidervertical = sliderverticalRes.data.hireAspNetDeveloper;
    const faq = faqRes.data.hireAspNetDeveloper;
    const latestnews = latestnewsRes.data.hireAspNetDeveloper;
    const strapirelatedservice =
      strapirelatedservicesRes.data.hireAspNetDeveloper;
    const servicedetails = servicedetailsRes.data.hireAspNetDeveloper;
    const cta = ctaRes.data.hireAspNetDeveloper;
    const banner = bannerRes.data.hireAspNetDeveloper;
    const contactform = contactformRes.data.hireAspNetDeveloper;
    const emailform = emailRes.data.hireAspNetDeveloper;

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
