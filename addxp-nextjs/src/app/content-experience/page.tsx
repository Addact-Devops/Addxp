"use client";

import strapi from "../../Configurations/Config.json";
import CTA from "@/Components/CTA/CTA";
import ServiceExperience from "@/Components/Services/ServiceExperince";
import {
  CONTACT_FORM_TITLE_QUERY,
  CTA_QUERY,
  FAQ,
  FORM_TITLE_QUERY,
  LATEST_NEWS,
  SERVICEEXPERIENCEDETAILS,
  SERVICE_EXP_QUERY,
  SERVICE_PROCESS,
  STRAPI_RELATED_SERVICES,
  VERTICAL_SLIDER,
  VIDEOBANNER,
  VISUALUX,
} from "@/Configurations/CommonQuery";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import Email from "@/Components/Email/Email";
import FAQS from "@/Components/FAQ/FAQS";
import StrapiRelatedServices from "@/Components/Services/StrapiRelatedServices";
import LatestNews from "@/Components/LatestNews/LatestNews";
import ContactForm from "../contact-us/Components/ContactForm";
import ServiceProcess from "@/Components/Services/ServiceProcess";
import ServiceDetailsEx from "@/Components/ServicesDetailsComponents/ServiceDetailsEX";
import VideoBanner from "@/Components/VideoComponent/VideoBanner";
import ServicesVisualUx from "@/Components/services-visual-ux/ServicesVisualUx";

async function getServerSideProps(query: any) {
  try {
    const response = await fetch(strapi.strapigraphql, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const repo = await response.json();
    if (!repo || !repo.data) {
      throw new Error(`Invalid response structure: ${JSON.stringify(repo)}`);
    }

    return repo;
  } catch (error) {
    console.error("API Error:", error);
    return { data: null };
  }
}

export default async function Page() {
  try {
    const [
      seoRes,
      videoBannerRes,
      servicedetailsexRes,
      ctaRes,
      serviceprocessRes,
      contactformRes,
      emailRes,
      servicevisualRes,
      strapirelatedservicesRes,
      serviceexperienceRes,
      latestnewsRes,
      faqRes,
      sliderverticalRes,
    ] = await Promise.all([
      getServerSideProps(SEO("contentExperience")),
      getServerSideProps(VIDEOBANNER("contentExperience")),
      getServerSideProps(SERVICEEXPERIENCEDETAILS("contentExperience")),
      getServerSideProps(CTA_QUERY("contentExperience")),
      getServerSideProps(SERVICE_PROCESS("contentExperience")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("contentExperience")),
      getServerSideProps(FORM_TITLE_QUERY("contentExperience")),
      getServerSideProps(VISUALUX("contentExperience")),
      getServerSideProps(STRAPI_RELATED_SERVICES("contentExperience")),
      getServerSideProps(SERVICE_EXP_QUERY("contentExperience")),
      getServerSideProps(LATEST_NEWS("contentExperience")),
      getServerSideProps(FAQ("contentExperience")),
      getServerSideProps(VERTICAL_SLIDER("contentExperience")),
    ]);

    const extract = (res: any) => res?.data?.contentExperience || null;

    const seodata = extract(seoRes);
    const videoBanner = extract(videoBannerRes);
    const servicedetailsex = extract(servicedetailsexRes);
    const cta = extract(ctaRes);
    const serviceprocess = extract(serviceprocessRes);
    const contactform = extract(contactformRes);
    const emailform = extract(emailRes);
    const servicevisual = extract(servicevisualRes);
    const strapirelatedservice = extract(strapirelatedservicesRes);
    const serviceexperience = extract(serviceexperienceRes);
    const latestnews = extract(latestnewsRes);
    const faq = extract(faqRes);
    const slidervertical = extract(sliderverticalRes);

    return (
      <>
        {seodata && <SEOData data={seodata} name="" />}
        {videoBanner && <VideoBanner data={videoBanner} />}
        {servicedetailsex && <ServiceDetailsEx data={servicedetailsex} />}
        {slidervertical && <SliderVertical data={slidervertical} />}
        {cta && <CTA data={cta} />}
        {serviceexperience && <ServiceExperience data={serviceexperience} />}
        {serviceprocess && <ServiceProcess data={serviceprocess} />}
        {emailform && <Email data={emailform} />}
        {servicevisual && <ServicesVisualUx data={servicevisual} />}
        {faq && <FAQS data={faq} />}
        {strapirelatedservice && <StrapiRelatedServices data={strapirelatedservice} />}
        {latestnews && <LatestNews data={latestnews} />}
        {contactform && <ContactForm data={contactform} />}
      </>
    );
  } catch (error) {
    return <div>Error fetching page: {JSON.stringify(error)}</div>;
  }
}
