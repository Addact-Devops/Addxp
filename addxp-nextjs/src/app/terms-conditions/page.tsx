import SEOData from "@/Components/SEO/SEOData";
import strapi from "../../Configurations/Config.json";
import TermsCondition from "../terms-conditions/Components/TermsCondition";
import { SEO } from "@/Configurations/SEOQuery";
import { TERMS_CONDITION } from "./Query/TermsConditionQuery";

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

export default async function Termsconditions() {
   try {
      const [seoRes, termsconditionRes] = await Promise.all([
         getServerSideProps(SEO("termsCondition")),
         getServerSideProps(TERMS_CONDITION),
      ]);

      const seodata = seoRes.data.termsCondition;
      const termscondition = termsconditionRes.data.termsCondition;

      return (
         <>
            <SEOData data={seodata} name={""} />
            <TermsCondition data={termscondition} />
         </>
      );
   } catch (error) {
      return <div>Error fetching: {JSON.stringify(error)}</div>;
   }
}
