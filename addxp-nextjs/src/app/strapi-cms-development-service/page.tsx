import CTA from "@/Components/CTA/CTA";
import {
  BANNER_QUERY,
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  DEVELOPMENT_PROCESS,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  OUR_SERVICES_QUERY,
  SERVICES_DETILS_QUERY,
  STRAPI_EXPERT_RESOURCES,
  STRAPI_RELATED_SERVICES,
  STRAPI_SUBTITLE_QUERY,
  WORKFLOW,
} from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import ServicesDetails from "@/Components/Services/ServicesDetails";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import ExpertResource from "@/Components/Services/ExpertResource";
import LatestNews from "@/Components/LatestNews/LatestNews";
import DevelopmentProcess from "@/Components/Services/DevelopmentProcess";
import OurServices from "@/Components/Services/OurServices";
import Email from "@/Components/Email/Email";
import ContactForm from "../contact-us/Components/ContactForm";
import OurWorkflow from "./Components/OurWorkflow";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";

async function getServerSideProps(queries: any) {
  const promises = queries.map(async (query: any) => {
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
  });

  return Promise.all(promises);
}

export default async function Page() {
  try {
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
      ourservicesRes,
      latestnewsRes,
      ourworkflowRes,
    ] = await getServerSideProps([
      SEO("strapiDevelopment"),
      CTA_QUERY("strapiDevelopment"),
      BANNER_QUERY("strapiDevelopment"),
      CONTACT_FORM_TITLE_QUERY("strapiDevelopment"),
      FORM_TITLE_QUERY("strapiDevelopment"),
      STRAPI_EXPERT_RESOURCES("strapiDevelopment"),
      STRAPI_SUBTITLE_QUERY("strapiDevelopment"),
      DEVELOPMENT_PROCESS("strapiDevelopment"),
      SERVICES_DETILS_QUERY("strapiDevelopment"),
      STRAPI_RELATED_SERVICES("strapiDevelopment"),
      OUR_SERVICES_QUERY("strapiDevelopment"),
      LATEST_NEWS("strapiDevelopment"),
      WORKFLOW("strapiDevelopment"),
    ]);

    const [
      seodata,
      ourworkflow,
      latestnews,
      ourservices,
      strapirelatedservice,
      servicedetails,
      cta,
      banner,
      contactform,
      emailform,
      expoertresource,
      strapititle,
      developmentprocess,
    ] = [
      seoRes.strapiDevelopment,
      ourworkflowRes.strapiDevelopment,
      latestnewsRes.strapiDevelopment,
      ourservicesRes.strapiDevelopment,
      strapirelatedservicesRes.strapiDevelopment,
      servicedetailsRes.strapiDevelopment,
      ctaRes.strapiDevelopment,
      bannerRes.strapiDevelopment,
      contactformRes.strapiDevelopment,
      emailRes.strapiDevelopment,
      expoertresourceRes.strapiDevelopment,
      strapititleRes.strapiDevelopment,
      developmentprocessRes.strapiDevelopment,
    ];

    return (
      <>
        <div className="header-spacer"></div>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <StrapiTitles query={strapititle} />
        <OurServices data={ourservices} />
        <DevelopmentProcess data={developmentprocess} />
        <ExpertResource data={expoertresource} />
        <CTA data={cta} />
        <OurWorkflow data={ourworkflow} />
        <ServicesDetails data={servicedetails} />
        <Email data={emailform} />
        <StrapiRelatedServices data={strapirelatedservice} />
        <LatestNews data={latestnews} />
        <ContactForm data={contactform} />
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
