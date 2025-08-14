import RichText from "@/Components/Common.jsx";

export default function ServiceProcess(data: any) {
  return (
    <section className="services-process-wrapper">
      {data.data.data.attributes.services_process == null ? null : (
        <div className="container">
          <span className="tag-line">
            {data.data.data.attributes.services_process.data.attributes.ServiceTitle.Title}
          </span>
          <h2 className="sub_title_5">
            {data.data.data.attributes.services_process.data.attributes.ServiceTitle.SubTitle}
          </h2>
          <div className="services-process-wrapper_list">
            {data.data.data.attributes.services_process.data.attributes.ServiceList.map((item: any) => (
              <div className="list_item" key={item.id}>
                <div className="list_item_title">
                  {item.Image.data == null ? (
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                      alt="Addxp_Place_holder_4333d94906.png"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={item.Image.data.attributes.url}
                      alt={item.Image.data.attributes.alternativeText}
                      loading="lazy"
                    />
                  )}

                  <span>{item.Title}</span>
                </div>
                <RichText htmlContent={item.Description}></RichText>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
