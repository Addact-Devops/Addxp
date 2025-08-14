import Banner from "@/Components/Banner/Banner";
import {
  BANNER_QUERY,
  BRAND_TAGLINE,
  CONTACT_FORM_TITLE_QUERY,
  KEY_TAGLINE,
  STRAPI_SUBTITLE_QUERY,
} from "@/Configurations/CommonQuery";
import Tagline from "./Components/Tagline";
import StrapiTitles from "@/Components/Services/StrapiTitles";
import Keytagline from "./Components/Keytagline";
import { SEO } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";

import strapi from "../../Configurations/Config.json";

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
    const [seoRes, bannerRes, strapititleRes, keytaglineRes, taglineRes, downloadRes, businessRes] = await Promise.all([
      getServerSideProps(SEO("brandGuideline")),
      getServerSideProps(BANNER_QUERY("brandGuideline")),
      getServerSideProps(STRAPI_SUBTITLE_QUERY("brandGuideline")),
      getServerSideProps(KEY_TAGLINE("brandGuideline")),
      getServerSideProps(BRAND_TAGLINE("brand_taglines")),
      getServerSideProps(CONTACT_FORM_TITLE_QUERY("brandGuideline")),
      getServerSideProps(BRAND_TAGLINE("business")),
    ]);

    const seodata = seoRes.data.brandGuideline;
    const tagline = taglineRes.data.brandGuideline;
    const keytagline = keytaglineRes.data.brandGuideline;
    const banner = bannerRes.data.brandGuideline;
    const strapititle = strapititleRes.data.brandGuideline;
    const download = downloadRes.data.brandGuideline;
    const business = businessRes.data.brandGuideline;

    return (
      <>
        <SEOData data={seodata} name={""} />
        <Banner data={banner} />
        <StrapiTitles query={strapititle} businessdata={business} />
        <Keytagline data={keytagline} />
        <Tagline data={tagline} datadownload={download} />
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
