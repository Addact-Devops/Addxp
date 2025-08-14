import Banner from "@/Components/Banner/Banner";
import CareerComponent from "./Components/CareerComponent";
import Experience from "./Components/Experience";
import { BANNER_NAV_QUERY, BANNER_QUERY, CAREER_POSITION, IMAGE_GALLAEY } from "@/Configurations/CommonQuery";
import BannerNav from "@/Components/Banner/BannerNav";
import ActivityComponent from "./Components/ActivityComponent";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";
import { EXPERIENCE } from "./Query/CareerQuery";

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
    const [seoRes, bannerRes, bannernavRes, imagegalaryRes, careercomponentRes, experienceRes] = await Promise.all([
      getServerSideProps(SEO("career")),
      getServerSideProps(BANNER_QUERY("career")),
      getServerSideProps(BANNER_NAV_QUERY("career")),
      getServerSideProps(IMAGE_GALLAEY("career")),
      getServerSideProps(CAREER_POSITION("career")),
      getServerSideProps(EXPERIENCE),
    ]);

    const seodata = seoRes.data.career;
    const banner = bannerRes.data.career;
    const bannernav = bannernavRes.data.career;
    const imagegalary = imagegalaryRes.data.career;
    const careercomponent = careercomponentRes.data.career;
    const experience = experienceRes.data.career;

    return (
      <>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <BannerNav data={bannernav} />
        <Experience data={experience} />
        <CareerComponent query={careercomponent} />
        <ActivityComponent data={imagegalary} />
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
