"use client";
import RichText from "@/Components/Common.jsx";
import BusinessGuidelines from "@/app/brand-guidelines/Components/BusinessGuidelines";
import { usePathname } from "next/navigation";

export default function StrapiTitles(query: any) {
  const pathname = usePathname();
  return (
    <>
      {pathname == "/brand-guidelines" ? (
        <section className="brand-component">
          {query.query.data.attributes.strapi_title.data == null ? null : (
            <div className="container">
              <div className="brand-main">
                <div className="brand-left">
                  <div className="brand-top">
                    {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Title == null ? null : (
                      <h2 className="sub_title_5">
                        {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Title}
                      </h2>
                    )}
                    {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Description ==
                    null ? null : (
                      <RichText
                        htmlContent={
                          query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Description
                        }
                      ></RichText>
                    )}
                  </div>
                  <BusinessGuidelines data={query} />
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="strapi-quote-component">
          <div className="container">
            {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Title == null ? null : (
              <h2 className="sub_title_5">
                {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Title}
              </h2>
            )}
            {query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Description == null ? null : (
              <RichText
                htmlContent={query.query.data.attributes.strapi_title.data.attributes.StrapiTitle[0].Description}
              ></RichText>
            )}
          </div>
        </section>
      )}
    </>
  );
}
