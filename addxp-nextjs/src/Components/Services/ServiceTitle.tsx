"use client";
import RichText from "@/Components/Common.jsx";
import KenticoBronze from "@/app/kentico-development-service/Components/KenticoBronze";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";

const DynamicImage = dynamic(() => import("../../utils/DynamicImage"), {
  ssr: false,
});

export default function ServiceTitle(data: any, datakentico: any) {
  const pathname = usePathname();
  if (pathname == "/kentico-development-service") {
    return (
      <section className="strapi-half-image">
        {/* {data.data.data.attributes.service_title.data.attributes.ServiceTitle ==
        null ? null : (
         
        )} */}
        <div className="container">
          {data.data.data.attributes.service_title.data != null ? (
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="strapi-left">
                  {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Title == null ? null : (
                    <span className="tag-line">
                      {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Title}
                    </span>
                  )}
                  {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Description == null ? null : (
                    <h2 className="sub_title_5">
                      <RichText
                        htmlContent={data.data.data.attributes.service_title.data.attributes.ServiceTitle.Description}
                      ></RichText>
                    </h2>
                  )}
                  {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Body == null ? null : (
                    <RichText
                      htmlContent={data.data.data.attributes.service_title.data.attributes.ServiceTitle.Body}
                    ></RichText>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0] == null ? (
                  <img
                    src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                    alt="Addxp_Place_holder_4333d94906.png"
                    loading="lazy"
                  />
                ) : (
                  <div className="strapi-right">
                    <DynamicImage
                      imageSrc={
                        data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0].attributes
                          .url
                      }
                      imageAlt={
                        data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0].attributes
                          .alternativeText
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {data.datakentico != null ? <KenticoBronze data={data.datakentico} /> : null}
        </div>
      </section>
    );
  } else {
    return (
      <section className="strapi-half-image">
        {/* {data.data.data.attributes.service_title.data.attributes.ServiceTitle ==
      null ? null : (
       
      )} */}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="strapi-left">
                {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Title == null ? null : (
                  <span className="tag-line">
                    {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Title}
                  </span>
                )}
                {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Description == null ? null : (
                  <h2 className="sub_title_5">
                    <RichText
                      htmlContent={data.data.data.attributes.service_title.data.attributes.ServiceTitle.Description}
                    ></RichText>
                  </h2>
                )}
                {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Body == null ? null : (
                  <RichText
                    htmlContent={data.data.data.attributes.service_title.data.attributes.ServiceTitle.Body}
                  ></RichText>
                )}
              </div>
            </div>
            <div className="col-md-6">
              {data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0] == null ? (
                <img
                  src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                  alt="Addxp_Place_holder_4333d94906.png"
                  loading="lazy"
                />
              ) : (
                <div className="strapi-right">
                  <DynamicImage
                    imageSrc={
                      data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0].attributes.url
                    }
                    imageAlt={
                      data.data.data.attributes.service_title.data.attributes.ServiceTitle.Images.data[0].attributes
                        .alternativeText
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
