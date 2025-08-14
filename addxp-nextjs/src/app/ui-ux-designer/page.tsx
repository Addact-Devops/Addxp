import { BANNER_QUERY, UI_UX_DETAILS, UPLOAD_FORM_TITLE } from "@/Configurations/CommonQuery";
import Banner from "@/Components/Banner/Banner";
import RichText from "@/Components/Common";
import strapi from "../../Configurations/Config.json";
import UploadForm from "./Component/UploadForm";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import Breadcrumbs from "./Component/Breadcrumbs";

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
      const [seoRes, bannerRes, descriptionRes, uploadFormTitleRes] = await Promise.all([
         getServerSideProps(SEO("uiUxDesigner")),
         getServerSideProps(BANNER_QUERY("uiUxDesigner")),
         getServerSideProps(UI_UX_DETAILS),
         getServerSideProps(UPLOAD_FORM_TITLE("uiUxDesigner")),
      ]);

      const seodata = seoRes.data.uiUxDesigner;
      const banner = bannerRes.data.uiUxDesigner;
      const description = descriptionRes.data.uiUxDesigner;
      const uploadformtitle = uploadFormTitleRes.data.uiUxDesigner;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <Banner data={banner} />
            <Breadcrumbs />
            <RichText htmlContent={description.data.attributes.Details.Description}></RichText>
            <UploadForm data={uploadformtitle} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
