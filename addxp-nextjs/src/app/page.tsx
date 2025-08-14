import { lazy } from "react";
import CTA from "@/Components/CTA/CTA";
import strapi from "../Configurations/Config.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
   BANNER_NAV_QUERY,
   CAROUSEL,
   CONTACT_FORM_TITLE_QUERY,
   CTA_QUERY,
   FORM_TITLE_QUERY,
   HOME_SLIDER,
   LATEST_NEWS,
   VERTICAL_SLIDER,
   XCOMPONENT,
} from "../Configurations/CommonQuery.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import LatestNews from "@/Components/LatestNews/LatestNews";
import XComponent from "@/Components/X-component/xComponent";

// const XComponent = lazy(() => import("@/Components/X-component/xComponent"));
import Email from "@/Components/Email/Email";
import ContactForm from "./contact-us/Components/ContactForm";
import SliderVertical from "@/Components/Sliders/SliderVertical";
import SliderComponent from "@/Components/Sliders/SliderComponent";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import HomeCarosual from "@/Components/carosual/HomeCarosual";
// import NavigateComponent from "@/Components/NavigateComponent/NavigateComponent";

const NavigateComponent = lazy(() => import("@/Components/NavigateComponent/NavigateComponent"));
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
async function getServerSideProps(q: any) {
   const query = q;
   const response = await fetch(strapi.strapigraphql, {
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
         homeSliderRes,
         xcomponentRes,
         contactformRes,
         emailRes,
         bannernavRes,
         latestnewsRes,
         sliderverticalRes,
         carouselRes,
      ] = await Promise.all([
         getServerSideProps(SEO("home")),
         getServerSideProps(CTA_QUERY("home")),
         getServerSideProps(HOME_SLIDER("home")),
         getServerSideProps(XCOMPONENT),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("home")),
         getServerSideProps(FORM_TITLE_QUERY("home")),
         getServerSideProps(BANNER_NAV_QUERY("home")),
         getServerSideProps(LATEST_NEWS("home")),
         getServerSideProps(VERTICAL_SLIDER("home")),
         getServerSideProps(CAROUSEL),
      ]);

      const seodata = seoRes.data.home;
      const carousel = carouselRes.data.home;
      const slidervertical = sliderverticalRes.data.home;
      const latestnews = latestnewsRes.data.home;
      const cta = ctaRes.data.home;
      const homeSlider = homeSliderRes.data.home;
      const xcomponent = xcomponentRes.data.home;
      const contactform = contactformRes.data.home;
      const emailform = emailRes.data.home;
      const bannernav = bannernavRes.data.home;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <HomeCarosual data={carousel} datavalue={bannernav} />
            <XComponent data={xcomponent} />
            <SliderVertical data={slidervertical} />
            <NavigateComponent />
            <CTA data={cta} />
            <SliderComponent data={homeSlider} />
            <Email data={emailform} />
            <LatestNews data={latestnews} />
            <ContactForm data={contactform} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
