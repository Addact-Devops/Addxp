import RichText from "@/Components/Common.jsx";

export default function ExpertResource(data: any) {
  return (
    <>
      <section className="strapi-right-image">
        <div className="container">
          <div className="strapi-right-bg">
            <div className="strapi-image-left">
              <h2 className="sub_title_5">
                {data.data.data.attributes.expert_resource.data.attributes.ExpertResource[0].Title}
              </h2>
              <RichText
                htmlContent={data.data.data.attributes.expert_resource.data.attributes.ExpertResource[0].Description}
              ></RichText>
            </div>
            <div className="strapi-image-right">
              {data.data.data.attributes.expert_resource.data.attributes.ExpertResource[0].Image.data == null ? (
                <img
                  src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                  alt="Addxp_Place_holder_4333d94906.png"
                  loading="lazy"
                />
              ) : (
                <img
                  src={
                    data.data.data.attributes.expert_resource.data.attributes.ExpertResource[0].Image.data.attributes
                      .url
                  }
                  loading="lazy"
                  alt={
                    data.data.data.attributes.expert_resource.data.attributes.ExpertResource[0].Image.data.attributes
                      .alternativeText
                  }
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
