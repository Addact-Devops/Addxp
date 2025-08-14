"use client";
import RichText from "@/Components/Common.jsx";

export default function ServiceExperience(data: any) {
  return (
    <>
      <section className="feature-component">
        <div className="container">
          <div className="feature-bg">
            {data.data.data.attributes.experience.data.attributes.ServiceTitle.Title == null ? null : (
              <h2 className="sub_title_5">{data.data.data.attributes.experience.data.attributes.ServiceTitle.Title}</h2>
            )}
            {data.data.data.attributes.experience.data.attributes.ServiceTitle.SubTitle == null ? null : (
              <p>{data.data.data.attributes.experience.data.attributes.ServiceTitle.SubTitle}</p>
            )}
            {data.data.data.attributes.experience.data.attributes.Experience == null ? null : (
              <div className="row">
                {data.data.data.attributes.experience.data.attributes.Experience.map((item: any) => (
                  <div className="col-md-6" key={item.id}>
                    <div className="feature-list">
                      {item.Images.data == null ? (
                        <img
                          src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                          alt="Addxp_Place_holder_4333d94906.png"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={item.Images.data[0].attributes.url}
                          alt={item.Images.data[0].attributes.alternativeText}
                          loading="lazy"
                        />
                      )}
                      <div className="feature-desc">
                        {item.Title == null ? null : <div className="type2">{item.Title}</div>}
                        {item.Description == null ? null : <RichText htmlContent={item.Description}></RichText>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
