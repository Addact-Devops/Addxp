import RichText from "@/Components/Common.jsx";

export default function EngagementModel(data: any) {
  return (
    <section className="our-engagement-section">
      <div className="container">
        <div className="our-engagement-bg">
          <div className="engagement-top">
            <h2 className="sub_title_5">
              {data.data.data.attributes.engagement_model.data.attributes.MainTitle.Title}
            </h2>
            <RichText
              htmlContent={data.data.data.attributes.engagement_model.data.attributes.MainTitle.Description}
            ></RichText>
          </div>
          <div className="row">
            {data.data.data.attributes.engagement_model.data.attributes.MultilistData.map((item: any) => (
              <div className="col-md-6" key={item.id}>
                <div className="enegagement-box">
                  <h2 className="sub_title_5">{item.Title}</h2>
                  <RichText htmlContent={item.Description}></RichText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
