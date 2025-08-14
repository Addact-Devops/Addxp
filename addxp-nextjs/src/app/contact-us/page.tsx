import strapi from "../../Configurations/Config.json";
import Locations from "./Components/Locations";
import WeekDays from "./Components/WeekDays";
import ContactForm from "./Components/ContactForm";
import { LOCATIONS, WEEKDAYS } from "./Query/ContactusQuery";
import { BANNER_NAV_QUERY, BANNER_QUERY, CONTACT_FORM_TITLE_QUERY } from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import BannerNav from "@/Components/Banner/BannerNav";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

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
      const [seoRes, bannerRes, WeekdaysRes, locationsRes, contactformRes, bannernavRes] = await Promise.all([
         getServerSideProps(SEO("contactUs")),
         getServerSideProps(BANNER_QUERY("contactUs")),
         getServerSideProps(WEEKDAYS),
         getServerSideProps(LOCATIONS),
         getServerSideProps(CONTACT_FORM_TITLE_QUERY("contactUs")),
         getServerSideProps(BANNER_NAV_QUERY("contactUs")),
      ]);

      const seodata = seoRes.data.contactUs;
      const banner = bannerRes.data.contactUs;
      const weekday = WeekdaysRes.data;
      const locations = locationsRes.data;
      const contactform = contactformRes.data.contactUs;
      const bannernav = bannernavRes.data.contactUs;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <BannerNav data={bannernav} />
            <WeekDays data={weekday} />
            <Locations data={locations} />
            <ContactForm data={contactform} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
