"use client";
import RichText from "@/Components/Common.jsx";
import { usePathname } from "next/navigation";

export default function OurServices(data: any) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/strapi-cms-development-service" ||
      pathname === "/strapi-cms-consultation-service" ||
      pathname === "/strapi-support-maintenance-service" ? (
        <section className="strapi-services-component">
          <div className="container">
            {data.data.data.attributes.our_service.data.attributes.ComponentInfo.Title == null ? null : (
              <span className="tag-line">
                {data.data.data.attributes.our_service.data.attributes.ComponentInfo.Title}
              </span>
            )}
            {data.data.data.attributes.our_service.data.attributes.ComponentInfo.SubTitle == null ? null : (
              <h2 className="sub_title_5">
                {data.data.data.attributes.our_service.data.attributes.ComponentInfo.SubTitle}
              </h2>
            )}
            {data.data.data.attributes.our_service.data.attributes.ServiceList == null ? null : (
              <div className="row">
                {data.data.data.attributes.our_service.data.attributes.ServiceList.map((item: any) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="strapi-service-box">
                      {item.Body == null ? null : <RichText htmlContent={item.Body}></RichText>}
                      {item.Summary == null ? null : <RichText htmlContent={item.Summary}></RichText>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="three-item-component">
          {data.data.data.attributes.our_service == null ? null : (
            <div className="container">
              {data.data.data.attributes.our_service.data.attributes.ComponentInfo.Title == null ? null : (
                <span className="tag-line">
                  {data.data.data.attributes.our_service.data.attributes.ComponentInfo.Title}
                </span>
              )}
              {data.data.data.attributes.our_service.data.attributes.ComponentInfo.SubTitle == null ? null : (
                <h2 className="sub_title_5">
                  {data.data.data.attributes.our_service.data.attributes.ComponentInfo.SubTitle}
                </h2>
              )}

              <div className="row">
                {data.data.data.attributes.our_service.data.attributes.ServiceList.map((item: any) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="three-item-box">
                      {item.Icons?.data?.attributes?.url && (
                        <img
                          src={item.Icons.data.attributes.url}
                          alt={item.Icons.data.attributes.alternativeText || "Service Icon"}
                          className="service-icon"
                        />
                      )}

                      <h3 className="large">
                        {item.Body == null ? null : <RichText htmlContent={item.Body}></RichText>}
                      </h3>
                      {item.Summary == null ? null : <RichText htmlContent={item.Summary}></RichText>}
                    </div>
                  </div>
                ))}
                {pathname === "/kontent-ai-development-service" ? <div></div> : null}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
