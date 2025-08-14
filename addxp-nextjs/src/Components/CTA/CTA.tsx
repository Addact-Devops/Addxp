"use client";

import RichText from "@/Components/Common.jsx";

export default function ServiceTitle(data: any) {
  return (
    <section
      className="cta-component"
      style={
        data.data.data.attributes.cta.data.attributes.CTAInfo.Images.data === null
          ? {
              backgroundImage: `url(https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png) no-repeat  !important`,
              backgroundSize: "cover",
            }
          : {
              backgroundImage: `url(${data.data.data.attributes.cta.data.attributes.CTAInfo.Images.data[0].attributes.url}) `,
              width: "100%",
            }
      }
    >
      <div className="container">
        <div className="banner-desc">
          {data.data.data.attributes.cta.data.attributes.CTAInfo.Title == null ? null : (
            <h2 className="sub_title_5 xl">{data.data.data.attributes.cta.data.attributes.CTAInfo.Title}</h2>
          )}
          {data.data.data.attributes.cta.data.attributes.CTAInfo.Description == null ? null : (
            <RichText htmlContent={data.data.data.attributes.cta.data.attributes.CTAInfo.Description}></RichText>
          )}
          {data.data.data.attributes.cta.data.attributes.CTALinks.href == null ? null : (
            <a href={data.data.data.attributes.cta.data.attributes.CTALinks.href} className="btn-defualt">
              {data.data.data.attributes.cta.data.attributes.CTALinks.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
