import ServiceTitle from "../../Components/Services/ServiceTitle";
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
  PARTNERS_LOGO_QUERY,
  CASESTUDIES_SLIDER_QUERY,
} from "@/Configurations/CommonQuery";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";

import OurServices from "@/Components/Services/OurServices";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import ContactForm from "../contact-us/Components/ContactForm";
import OurPartners from "@/Components/Partners/OurPartners";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";
import CasestudiesSlider from "@/Components/CasestudiesSlider/CasestudiesSlider";

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
      servicetitleRes,
      contactformRes,
      servicedetailsRes,
      ourservicesRes,
      serviceexperienceRes,
      latestnewsRes,
      faqRes,
      partnersLogoRes,
      casestudiesSliderRes,
    ] = await Promise.all([
      getServerSideProps(SEO("contentfulCmsService")),
      getServerSideProps(CTA_QUERY("contentfulCmsService")),
      getServerSideProps(BANNER_QUERY("contentfulCmsService")),
      getServerSideProps(TITIE_QUERY("contentfulCmsService")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("contentfulCmsService")),
      getServerSideProps(SERVICES_DETILS_QUERY("contentfulCmsService")),
      getServerSideProps(OUR_SERVICES_QUERY("contentfulCmsService")),
      getServerSideProps(SERVICE_EXP_QUERY("contentfulCmsService")),
      getServerSideProps(LATEST_NEWS("contentfulCmsService")),
      getServerSideProps(FAQ("contentfulCmsService")),
      getServerSideProps(PARTNERS_LOGO_QUERY("partnersLogos")),
      getServerSideProps(CASESTUDIES_SLIDER_QUERY),
    ]);

    const seodata = seoRes.data.contentfulCmsService;
    const faq = faqRes.data.contentfulCmsService;
    const latestnews = latestnewsRes.data.contentfulCmsService;
    const ourservices = ourservicesRes.data.contentfulCmsService;
    const cta = ctaRes.data.contentfulCmsService;
    const contactform = contactformRes.data.contentfulCmsService;
    const banner = bannerRes.data.contentfulCmsService;
    const servicetitle = servicetitleRes.data.contentfulCmsService;
    const servicedetails = servicedetailsRes.data.contentfulCmsService;
    const serviceexperience = serviceexperienceRes.data.contentfulCmsService;
    const partnersLogo = partnersLogoRes.data.partnersLogos;
    CasestudiesSlider;

    return (
      <>
        <div className="header-spacer"></div>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <OurPartners data={partnersLogo} />
        {servicetitle.data.attributes.service_title.data != null ? <ServiceTitle data={servicetitle} /> : null}
        <OurServices data={ourservices} />
        <CTA data={cta} />
        <ServiceExperience data={serviceexperience} />
        <CasestudiesSlider data={casestudiesSliderRes} />
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
