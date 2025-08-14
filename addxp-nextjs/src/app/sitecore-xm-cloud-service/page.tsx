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
import { usePathname } from "next/navigation";
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
      bannerRes,
      servicetitleRes,
      ourservicesRes,
      ctaRes,
      contactformRes,
      servicedetailsRes,
      latestnewsRes,
      partnersLogoRes,
      casestudiesSliderRes,
    ] = await Promise.all([
      getServerSideProps(SEO("sitecoreXmCloudService")),
      getServerSideProps(BANNER_QUERY("sitecoreXmCloudService")),
      getServerSideProps(TITIE_QUERY("sitecoreXmCloudService")),
      getServerSideProps(OUR_SERVICES_QUERY("sitecoreXmCloudService")),
      getServerSideProps(CTA_QUERY("sitecoreXmCloudService")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("sitecoreXmCloudService")),
      getServerSideProps(SERVICES_DETILS_QUERY("sitecoreXmCloudService")),
      getServerSideProps(LATEST_NEWS("sitecoreXmCloudService")),
      getServerSideProps(PARTNERS_LOGO_QUERY("partnersLogos")),
      getServerSideProps(CASESTUDIES_SLIDER_QUERY),
    ]);
    const seodata = seoRes.data.sitecoreXmCloudService;
    const banner = bannerRes.data.sitecoreXmCloudService;
    const servicetitle = servicetitleRes.data.sitecoreXmCloudService;
    const ourservices = ourservicesRes.data.sitecoreXmCloudService;
    const cta = ctaRes.data.sitecoreXmCloudService;
    const latestnews = latestnewsRes.data.sitecoreXmCloudService;
    const contactform = contactformRes.data.sitecoreXmCloudService;
    const servicedetails = servicedetailsRes.data.sitecoreXmCloudService;
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
        <CasestudiesSlider data={casestudiesSliderRes} />
        <ServicesDetails data={servicedetails} />
        <LatestNews data={latestnews} />
        <ContactForm data={contactform} />
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
