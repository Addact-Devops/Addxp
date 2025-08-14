import RichText from "@/Components/Common.jsx";

export default function KenticoBronze(data: any) {
  return (
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="strapi-left">
          {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Title == null ? (
            ""
          ) : (
            <span className="tag-line">
              {" "}
              {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Title}
            </span>
          )}
          {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Description ==
          null ? (
            ""
          ) : (
            <h2 className="sub_title_5">
              <RichText
                htmlContent={
                  data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Description
                }
              ></RichText>
            </h2>
          )}
          {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Images.data[0]
            .attributes.url == null ? (
            ""
          ) : (
            <img
              src={
                data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Images.data[0]
                  .attributes.url
              }
              alt={
                data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Images.data[0]
                  .attributes.alternativeText
              }
            />
          )}
          {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Body == null ? (
            ""
          ) : (
            <RichText
              htmlContent={data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.KenticoTemplate.Body}
            ></RichText>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="strapi-right">
          {data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.LeftImage.data.attributes.url ==
          null ? (
            ""
          ) : (
            <img
              src={data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.LeftImage.data.attributes.url}
              alt={
                data.data.data.attributes.bronze_partner.data.attributes.BronzeKentico.LeftImage.data.attributes
                  .alternativeText
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
