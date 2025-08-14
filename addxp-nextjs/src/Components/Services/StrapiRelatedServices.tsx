"use client";
import RichText from "@/Components/Common.jsx";

export default function StrapiRelatedServices(data: any) {
  return (
    <>
      <section className="two-service-component">
        <div className="container">
          {data.data.data.attributes.service_title?.data?.attributes.StrapiTitle[0].Title == null ? null : (
            <h2 className="sub_title_5">
              {data.data.data.attributes.service_title.data?.attributes.StrapiTitle[0].Title}
            </h2>
          )}
          {data.data.data.attributes.service_title?.data?.attributes.StrapiTitle[0].Description == null ? null : (
            <RichText
              htmlContent={data.data.data.attributes.service_title.data.attributes.StrapiTitle[0].Description}
            ></RichText>
          )}

          <div className="row">
            {data.data.data.attributes.related_services.data.map((item: any) => (
              // eslint-disable-next-line react/jsx-key
              <div className="col-md-6" key={item.id}>
                <div className="two-service-bg">
                  {item.attributes.ServiceDetails.Body == null ? null : (
                    <RichText htmlContent={item.attributes.ServiceDetails.Body}></RichText>
                  )}
                  {item.attributes.ServiceDetails.Summary == null ? null : (
                    <RichText htmlContent={item.attributes.ServiceDetails.Summary}></RichText>
                  )}
                  {item.attributes.ServiceDetails.Links == null ? null : (
                    <a href={`${item.attributes.ServiceDetails.Links.href}`} className="btn-defualt">
                      {item.attributes.ServiceDetails.Links.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
