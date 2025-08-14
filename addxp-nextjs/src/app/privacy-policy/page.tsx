import SEOData from "@/Components/SEO/SEOData";
import PrivatePolicy from "./Components/PrivatePolicy";
import { SEO } from "@/Configurations/SEOQuery";
import strapi from "../../Configurations/Config.json";
import { PRIVATE_POLICY } from "./Query/PrivatePolicyQuery";

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

export default async function PrivatePolicyData() {
   try {
      const [seoRes, privacypolicyRes] = await Promise.all([
         getServerSideProps(SEO("privacyPolicy")),
         getServerSideProps(PRIVATE_POLICY),
      ]);

      const seodata = seoRes.data.privacyPolicy;
      const privacypolicy = privacypolicyRes.data.privacyPolicy;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <PrivatePolicy data={privacypolicy} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
