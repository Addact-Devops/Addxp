"use client";

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

import strapi from "../../Configurations/Config.json";

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
      throw new Error(`Failed fetch: ${response.status}`);
    }

    const repo = await response.json();

    if (!repo || !repo.data) {
      throw new Error(`Invalid data structure from API: ${JSON.stringify(repo)}`);
    }

    return repo;
  } catch (err) {
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
      contactformRes,
      emailRes,
      serviceprocessRes,
      servicevisualRes,
      strapirelatedservicesRes,
      serviceexperienceRes,
      latestnewsRes,
      faqRes,
      sliderverticalRes,
    ] = await Promise.all([
      getServerSideProps(SEO("userExperience")),
      getServerSideProps(VIDEOBANNER("userExperience")),
      getServerSideProps(SERVICEEXPERIENCEDETAILS("userExperience")),
      getServerSideProps(CTA_QUERY("userExperience")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("userExperience")),
      getServerSideProps(FORM_TITLE_QUERY("userExperience")),
      getServerSideProps(SERVICE_PROCESS("userExperience")),
      getServerSideProps(VISUALUX("userExperience")),
      getServerSideProps(STRAPI_RELATED_SERVICES("userExperience")),
      getServerSideProps(SERVICE_EXP_QUERY("userExperience")),
      getServerSideProps(LATEST_NEWS("userExperience")),
      getServerSideProps(FAQ("userExperience")),
      getServerSideProps(VERTICAL_SLIDER("userExperience")),
    ]);

    const extract = (res: any) => res?.data?.userExperience || null;

    const seodata = extract(seoRes);
    const videoBanner = extract(videoBannerRes);
    const servicedetailsex = extract(servicedetailsexRes);
    const cta = extract(ctaRes);
    const contactform = extract(contactformRes);
    const emailform = extract(emailRes);
    const serviceprocess = extract(serviceprocessRes);
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
    return <div>Error loading page: {JSON.stringify(error)}</div>;
  }
}
