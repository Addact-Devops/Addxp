"use client";
import RichText from "@/Components/Common.jsx";

export default function GoStrapi(data: any) {
  return (
    <section className="why-go-strapi-component">
      <div className="container">
        <div className="go-strapi-cms">
          <p className="tag-line">{data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.Title}</p>
          <div className="strapi-img-text">
            <div className="strapi-content">
              <h2 className="sub_title_5">{data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.SubTitle}</h2>
              <RichText
                htmlContent={data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.Description}
              ></RichText>
            </div>
            {data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.Images.data == null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <img
                src={data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.Images.data[0].attributes.url}
                loading="lazy"
                alt={
                  data.data.data.attributes.go_strapi.data.attributes.StrapiDesc.Images.data[0].attributes
                    .alternativeText
                }
              />
            )}
          </div>
          <div className="strapi-numbering-points">
            {data.data.data.attributes.go_strapi.data.attributes.Details.map((item: any) => (
              <div className="points-text-box" key={item.id}>
                <div className="point-title">
                  <p>{item.Title}</p>
                  <p className="number-big">{item.Number}</p>
                </div>
                <RichText htmlContent={item.Description}></RichText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
