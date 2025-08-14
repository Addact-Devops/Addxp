import ServiceTitle from "@/Components/Services/ServiceTitle";
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
import OurPartners from "@/Components/Partners/OurPartners";
import ContactForm from "@/app/contact-us/Components/ContactForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "@/Configurations/Config.json";
import CasestudiesSlider from "@/Components/CasestudiesSlider/CasestudiesSlider";

async function fetchData(query: any) {
  const res = await fetch(strapi.strapigraphql, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });
  return res.json();
}

export default async function UmbracoDevelopmentPage() {
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
    fetchData(SEO("umbracoDevelopmentService")),
    fetchData(CTA_QUERY("umbracoDevelopmentService")),
    fetchData(BANNER_QUERY("umbracoDevelopmentService")),
    fetchData(CONTACT_FORM_TITLE_QUERY("umbracoDevelopmentService")),
    fetchData(TITIE_QUERY("umbracoDevelopmentService")),
    fetchData(SERVICES_DETILS_QUERY("umbracoDevelopmentService")),
    fetchData(OUR_SERVICES_QUERY("umbracoDevelopmentService")),
    fetchData(SERVICE_EXP_QUERY("umbracoDevelopmentService")),
    fetchData(LATEST_NEWS("umbracoDevelopmentService")),
    fetchData(FAQ("umbracoDevelopmentService")),
    fetchData(PARTNERS_LOGO_QUERY("partnersLogos")),
    fetchData(CASESTUDIES_SLIDER_QUERY),
  ]);

  const seodata = seoRes.data.umbracoDevelopmentService;
  const faq = faqRes.data.umbracoDevelopmentService;
  const latestnews = latestnewsRes.data.umbracoDevelopmentService;
  const ourservices = ourservicesRes.data.umbracoDevelopmentService;
  const servicedetails = servicedetailsRes.data.umbracoDevelopmentService;
  const cta = ctaRes.data.umbracoDevelopmentService;
  const banner = bannerRes.data.umbracoDevelopmentService;
  const contactform = contactformRes.data.umbracoDevelopmentService;
  const servicetitle = servicetitleRes.data.umbracoDevelopmentService;
  const serviceexperience = serviceexperienceRes.data.umbracoDevelopmentService;
  const partnersLogo = partnersLogoRes.data.partnersLogos;
  CasestudiesSlider;

  return (
    <>
      <div className="header-spacer"></div>
      <SEOData data={seodata} name={""} />
      <Banner data={banner} />
      <OurPartners data={partnersLogo} />
      {servicetitle.data.attributes.service_title.data != null && <ServiceTitle data={servicetitle} />}
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
}
