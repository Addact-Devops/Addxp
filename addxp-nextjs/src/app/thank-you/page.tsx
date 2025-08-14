import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { THANKS_QUERY } from "../../Configurations/CommonQuery.js";
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

export default async function Thankyou() {
  try {
    const [seoRes, thankyouRes] = await Promise.all([
      getServerSideProps(SEO("thankYou")),
      getServerSideProps(THANKS_QUERY),
    ]);

    const seodata = seoRes.data.thankYou;
    const thankyou = thankyouRes.data.thankYou;

    return (
      <>
        <SEOData data={seodata} name={""} />
        <section className="thank-you-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="thank-you-wrapper-content">
                  <h2 className="sub_title_5">{thankyou.data.attributes.ThankYou.Title}</h2>
                  <RichText htmlContent={thankyou.data.attributes.ThankYou.Description} />
                </div>
              </div>

              <div className="col-md-5">
                <img
                  src={thankyou.data.attributes.ThankYou.Images.data[0].attributes.url}
                  alt={thankyou.data.attributes.ThankYou.Images.data[0].attributes.alternativeText}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}
