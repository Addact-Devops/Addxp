import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { THANKS_CAREER_QUERY } from "../../Configurations/CommonQuery.js";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";

async function fetchData(query: any) {
  try {
    const response = await fetch(strapi.strapigraphql, {
      next: { revalidate: 3600 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return null;
  }
}

export default async function ThankYouCareer() {
  try {
    const [seoRes, thankyouRes] = await Promise.all([fetchData(SEO("thankYouCareer")), fetchData(THANKS_CAREER_QUERY)]);

    if (!thankyouRes?.data?.thankYouCareer?.data) {
      throw new Error("No data available for thankYouCareer");
    }

    const seodata = seoRes?.data?.thankYouCareer || null;
    const thankyou = thankyouRes.data.thankYouCareer.data.attributes.ThankYouCareer;

    return (
      <>
        <SEOData data={seodata} name={""} />
        <section className="thank-you-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="thank-you-wrapper-content">
                  <h2 className="sub_title_5">{thankyou?.Title || "Thank You!"}</h2>
                  {thankyou?.Description && <RichText htmlContent={thankyou.Description} />}
                </div>
              </div>

              {thankyou?.Images?.data?.length > 0 && (
                <div className="col-md-5">
                  <img
                    src={thankyou.Images.data[0].attributes.url}
                    alt={thankyou.Images.data[0].attributes.alternativeText || "Thank You Image"}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error in ThankYouCareer Component:", error);
    return <div className="error-message">Something went wrong. Please try again later.</div>;
  }
}
