import { usePathname } from "next/navigation";
import ServiceTitle from "../../Components/Services/ServiceTitle";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  BRONZE_PARTNER_QUERY,
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
import CasestudiesSlider from "@/Components/CasestudiesSlider/CasestudiesSlider"; // ✅ Add this

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
    const queries = [
      SEO("kenticoDevelopmentService"),
      CTA_QUERY("kenticoDevelopmentService"),
      BANNER_QUERY("kenticoDevelopmentService"),
      CONTACT_FORM_TITLE_QUERY("kenticoDevelopmentService"),
      TITIE_QUERY("kenticoDevelopmentService"),
      SERVICES_DETILS_QUERY("kenticoDevelopmentService"),
      OUR_SERVICES_QUERY("kenticoDevelopmentService"),
      SERVICE_EXP_QUERY("kenticoDevelopmentService"),
      LATEST_NEWS("kenticoDevelopmentService"),
      FAQ("kenticoDevelopmentService"),
      BRONZE_PARTNER_QUERY("kenticoDevelopmentService"),
      PARTNERS_LOGO_QUERY("partnersLogos"),
      CASESTUDIES_SLIDER_QUERY,
    ];

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
      kenticobronzeRes,
      partnersLogoRes,
      casestudiesSliderRes,
    ] = await Promise.all(queries.map(getServerSideProps));

    const seodata = seoRes.data.kenticoDevelopmentService;
    const faq = faqRes.data.kenticoDevelopmentService;
    const latestnews = latestnewsRes.data.kenticoDevelopmentService;
    const ourservices = ourservicesRes.data.kenticoDevelopmentService;
    const servicedetails = servicedetailsRes.data.kenticoDevelopmentService;
    const cta = ctaRes.data.kenticoDevelopmentService;
    const banner = bannerRes.data.kenticoDevelopmentService;
    const servicetitle = servicetitleRes.data.kenticoDevelopmentService;
    const contactform = contactformRes.data.kenticoDevelopmentService;
    const serviceexperience = serviceexperienceRes.data.kenticoDevelopmentService;
    const kenticobronzes = kenticobronzeRes.data.kenticoDevelopmentService;
    const partnersLogo = partnersLogoRes.data.partnersLogos;

    return (
      <>
        <div className="header-spacer"></div>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <OurPartners data={partnersLogo} />
        {servicetitle.data.attributes.service_title.data !== null && (
          <ServiceTitle data={servicetitle} datakentico={kenticobronzes} />
        )}
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
