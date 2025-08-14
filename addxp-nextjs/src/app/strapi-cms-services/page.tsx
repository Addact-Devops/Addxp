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
  PARTNERS_LOGO_QUERY,
  CASESTUDIES_SLIDER_QUERY,
} from "@/Configurations/CommonQuery";
import OurServices from "@/Components/Services/OurServices";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import LatestNews from "@/Components/LatestNews/LatestNews";
import FAQS from "@/Components/FAQ/FAQS";
import OurPartners from "@/Components/Partners/OurPartners";
import ContactForm from "../contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";
import CasestudiesSlider from "@/Components/CasestudiesSlider/CasestudiesSlider";

async function getServerSideProps(query: any) {
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
      servicetitleRes,
      servicedetailsRes,
      ourservicesRes,
      serviceexperienceRes,
      latestnewsRes,
      faqRes,
      partnersLogoRes,
      casestudiesSliderRes,
    ] = await Promise.all([
      getServerSideProps(SEO("strapiCmsService")),
      getServerSideProps(CTA_QUERY("strapiCmsService")),
      getServerSideProps(BANNER_QUERY("strapiCmsService")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("strapiCmsService")),
      getServerSideProps(TITIE_QUERY("strapiCmsService")),
      getServerSideProps(SERVICES_DETILS_QUERY("strapiCmsService")),
      getServerSideProps(OUR_SERVICES_QUERY("strapiCmsService")),
      getServerSideProps(SERVICE_EXP_QUERY("strapiCmsService")),
      getServerSideProps(LATEST_NEWS("strapiCmsService")),
      getServerSideProps(FAQ("strapiCmsService")),
      getServerSideProps(PARTNERS_LOGO_QUERY("partnersLogos")),
      getServerSideProps(CASESTUDIES_SLIDER_QUERY),
    ]);

    const seodata = seoRes.data.strapiCmsService;
    const faq = faqRes.data.strapiCmsService;
    const latestnews = latestnewsRes.data.strapiCmsService;
    const ourservices = ourservicesRes.data.strapiCmsService;
    const servicedetails = servicedetailsRes.data.strapiCmsService;
    const cta = ctaRes.data.strapiCmsService;
    const banner = bannerRes.data.strapiCmsService;
    const servicetitle = servicetitleRes.data.strapiCmsService;
    const contactform = contactformRes.data.strapiCmsService;
    const serviceexperience = serviceexperienceRes.data.strapiCmsService;
    const partnersLogo = partnersLogoRes.data.partnersLogos;

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
