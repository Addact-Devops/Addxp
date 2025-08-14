"use client";
import RichText from "@/Components/Common.jsx";

export default function DevelopmentProcess(data: any) {
  return (
    <>
      <section className="development-process-component strapi-up-process">
        {data.data.data.attributes.process_title == null ? null : (
          <div className="container">
            {data.data.data.attributes.process_title.data.attributes.ProcessTitle.Title == null ? null : (
              <span className="tag-line">
                {data.data.data.attributes.process_title.data.attributes.ProcessTitle.Title}
              </span>
            )}
            {data.data.data.attributes.process_title.data.attributes.ProcessTitle.Subtitle == null ? null : (
              <h2 className="sub_title_5">
                {data.data.data.attributes.process_title.data.attributes.ProcessTitle.Subtitle}
              </h2>
            )}
            {data.data.data.attributes.process_title.data.attributes.ProcessTitle.Description == null ? null : (
              <RichText
                htmlContent={data.data.data.attributes.process_title.data.attributes.ProcessTitle.Description}
              ></RichText>
            )}

            <div className="development-box">
              {data.data.data.attributes.process_title.data.attributes.development_process.data.attributes.Details ==
              null ? null : (
                <ul>
                  {data.data.data.attributes.process_title.data.attributes.development_process.data.attributes.Details.map(
                    (item: any) => (
                      <li key={item.id}>
                        <span>
                          <RichText htmlContent={item.Description}></RichText>
                        </span>
                        {item.Images.data == null ? (
                          <img
                            src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                            alt="Addxp_Place_holder_4333d94906.png"
                            loading="lazy"
                          />
                        ) : (
                          <img src={item.Images.data.attributes.url} alt="list-number1" loading="lazy" />
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
